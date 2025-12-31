import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import {
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    type NodeChange,
    type EdgeChange,
    type Connection,
    type Viewport,
} from '@xyflow/react';
import type {
    WorkflowNode,
    WorkflowEdge,
    HistoryState,
    TextNodeData,
    ImageNodeData,
    LLMNodeData,
    GeminiModel,
    RunTask,
} from '@/types/workflow.types';
import api from '@/lib/api';

// ============================================================================
// Store Types
// ============================================================================

export interface WorkflowState {
    // Core state
    nodes: WorkflowNode[];
    edges: WorkflowEdge[];
    viewport: Viewport;
    workflowId: string | null;
    workflowName: string;
    isDirty: boolean;
    isSaving: boolean;
    isLoading: boolean;

    // Task tracking for running nodes
    runTasks: RunTask[];

    // History for undo/redo
    undoStack: HistoryState[];
    redoStack: HistoryState[];
    maxHistorySize: number;

    // Actions - React Flow handlers
    onNodesChange: (changes: NodeChange[]) => void;
    onEdgesChange: (changes: EdgeChange[]) => void;
    onConnect: (connection: Connection) => void;
    onViewportChange: (viewport: Viewport) => void;

    // Actions - Node operations
    addNode: (type: 'text' | 'image' | 'llm', position: { x: number; y: number }) => string;
    updateNodeData: <T extends WorkflowNode>(nodeId: string, data: Partial<T['data']>) => void;
    deleteNode: (nodeId: string) => void;
    deleteSelectedNodes: () => void;
    deleteSelectedEdges: () => void;
    duplicateNode: (nodeId: string) => string | null;

    // Actions - Task tracking
    addTask: (nodeId: string, nodeName: string) => string;
    updateTask: (taskId: string, updates: Partial<RunTask>) => void;
    removeTask: (taskId: string) => void;
    clearAllTasks: () => void;

    // Actions - Undo/Redo
    undo: () => void;
    redo: () => void;
    pushToHistory: () => void;

    // Actions - Workflow management
    setWorkflow: (id: string | null, name: string, nodes: WorkflowNode[], edges: WorkflowEdge[]) => void;
    setWorkflowName: (name: string) => void;
    clearWorkflow: () => void;
    markClean: () => void;

    // Actions - Backend sync
    loadWorkflow: (id: string) => Promise<void>;
    saveWorkflow: () => Promise<boolean>;
    createAndSaveWorkflow: (name: string, nodes: WorkflowNode[], edges: WorkflowEdge[]) => Promise<string | null>;

    // Getters for connected node data
    getConnectedInputs: (nodeId: string) => {
        systemPrompt?: string;
        userMessage?: string;
        images: string[];
    };

    // Propagate output to connected downstream nodes
    propagateOutput: (sourceNodeId: string, output: string) => void;
}

// ============================================================================
// Helper Functions
// ============================================================================

let nodeIdCounter = 0;
const generateNodeId = () => `node_${Date.now()}_${++nodeIdCounter}`;

const generateEdgeId = (source: string, target: string, sourceHandle?: string, targetHandle?: string) =>
    `e_${source}_${sourceHandle || 's'}_${target}_${targetHandle || 't'}`;

const getDefaultNodeData = (type: 'text' | 'image' | 'llm'): TextNodeData | ImageNodeData | LLMNodeData => {
    switch (type) {
        case 'text':
            return { text: '' };
        case 'image':
            return { images: [], currentIndex: 0, viewMode: 'single' as const };
        case 'llm':
            return { model: 'gemini-2.5-flash' as GeminiModel };
    }
};

// ============================================================================
// Zustand Store
// ============================================================================

export const useWorkflowStore = create<WorkflowState>()(
    subscribeWithSelector((set, get) => ({
        // Initial state
        nodes: [],
        edges: [],
        viewport: { x: 0, y: 0, zoom: 0.55 },
        workflowId: null,
        workflowName: 'untitled',
        isDirty: false,
        isSaving: false,
        isLoading: false,
        runTasks: [],
        undoStack: [],
        redoStack: [],
        maxHistorySize: 50,

        // React Flow change handlers
        onNodesChange: (changes) => {
            const state = get();

            // Filter out position changes for locked nodes
            const filteredChanges = changes.filter((change) => {
                if (change.type === 'position' && 'id' in change) {
                    const node = state.nodes.find((n) => n.id === change.id);
                    if (node && (node.data as { isLocked?: boolean }).isLocked) {
                        return false; // Don't allow position changes for locked nodes
                    }
                }
                return true;
            });

            if (filteredChanges.length === 0) return;

            // Push to history before significant changes (not just selection changes)
            const hasSignificantChange = filteredChanges.some(
                (c) => c.type !== 'select' && c.type !== 'dimensions'
            );
            if (hasSignificantChange) {
                state.pushToHistory();
            }

            set({
                nodes: applyNodeChanges(filteredChanges, state.nodes) as WorkflowNode[],
                isDirty: true,
            });
        },

        onEdgesChange: (changes) => {
            const state = get();
            const hasSignificantChange = changes.some((c) => c.type !== 'select');
            if (hasSignificantChange) {
                state.pushToHistory();
            }

            set({
                edges: applyEdgeChanges(changes, state.edges),
                isDirty: true,
            });
        },

        onConnect: (connection) => {
            const state = get();
            state.pushToHistory();

            const newEdge: WorkflowEdge = {
                id: generateEdgeId(
                    connection.source!,
                    connection.target!,
                    connection.sourceHandle ?? undefined,
                    connection.targetHandle ?? undefined
                ),
                source: connection.source!,
                target: connection.target!,
                sourceHandle: connection.sourceHandle ?? undefined,
                targetHandle: connection.targetHandle ?? undefined,
                type: 'custom',
                style: { stroke: '#E879F9', strokeWidth: 2 },
            };

            set({
                edges: addEdge(newEdge, state.edges),
                isDirty: true,
            });

            // If connecting from an LLM output to a Text node input, propagate existing output immediately
            if (connection.sourceHandle === 'output' && connection.targetHandle === 'input') {
                const sourceNode = state.nodes.find((n) => n.id === connection.source);
                const targetNode = state.nodes.find((n) => n.id === connection.target);

                if (sourceNode?.type === 'llm' && targetNode?.type === 'text') {
                    const llmData = sourceNode.data as LLMNodeData;
                    if (llmData.output) {
                        // Propagate existing output to the Text node
                        set((s) => ({
                            nodes: s.nodes.map((node) =>
                                node.id === connection.target && node.type === 'text'
                                    ? { ...node, data: { ...node.data, text: llmData.output } }
                                    : node
                            ) as WorkflowNode[],
                        }));
                    }
                }
            }
        },

        onViewportChange: (viewport) => {
            set({ viewport });
        },

        // Node operations
        addNode: (type, position) => {
            const state = get();
            state.pushToHistory();

            const nodeId = generateNodeId();
            const newNode: WorkflowNode = {
                id: nodeId,
                type,
                position,
                data: getDefaultNodeData(type),
            } as WorkflowNode;

            set({
                nodes: [...state.nodes, newNode],
                isDirty: true,
            });

            return nodeId;
        },

        updateNodeData: (nodeId, data) => {
            set((state) => ({
                nodes: state.nodes.map((node) =>
                    node.id === nodeId
                        ? { ...node, data: { ...node.data, ...data } }
                        : node
                ) as WorkflowNode[],
                isDirty: true,
            }));
        },

        deleteNode: (nodeId) => {
            const state = get();
            state.pushToHistory();

            set({
                nodes: state.nodes.filter((n) => n.id !== nodeId) as WorkflowNode[],
                edges: state.edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
                isDirty: true,
            });
        },

        deleteSelectedNodes: () => {
            const state = get();
            const selectedNodeIds = state.nodes
                .filter((n) => n.selected)
                .map((n) => n.id);

            if (selectedNodeIds.length === 0) return;

            state.pushToHistory();

            set({
                nodes: state.nodes.filter((n) => !n.selected) as WorkflowNode[],
                edges: state.edges.filter(
                    (e) => !selectedNodeIds.includes(e.source) && !selectedNodeIds.includes(e.target)
                ),
                isDirty: true,
            });
        },

        deleteSelectedEdges: () => {
            const state = get();
            const selectedEdges = state.edges.filter((e) => e.selected);

            if (selectedEdges.length === 0) return;

            state.pushToHistory();

            set({
                edges: state.edges.filter((e) => !e.selected),
                isDirty: true,
            });
        },

        duplicateNode: (nodeId) => {
            const state = get();
            const nodeToDuplicate = state.nodes.find((n) => n.id === nodeId);
            if (!nodeToDuplicate) return null;

            state.pushToHistory();

            const newNodeId = generateNodeId();
            const newNode: WorkflowNode = {
                ...nodeToDuplicate,
                id: newNodeId,
                position: {
                    x: nodeToDuplicate.position.x + 50,
                    y: nodeToDuplicate.position.y + 50,
                },
                data: { ...nodeToDuplicate.data, isLocked: false }, // Reset lock on duplicate
                selected: false,
            } as WorkflowNode;

            set({
                nodes: [...state.nodes, newNode],
                isDirty: true,
            });

            return newNodeId;
        },

        // Task Tracking
        addTask: (nodeId, nodeName) => {
            const taskId = `task_${Date.now()}_${nodeIdCounter++}`;
            const task: RunTask = {
                id: taskId,
                nodeId,
                nodeName,
                status: 'running',
                startedAt: new Date(),
                progress: '1/1',
            };
            set((state) => ({
                runTasks: [...state.runTasks, task],
            }));
            return taskId;
        },

        updateTask: (taskId, updates) => {
            set((state) => ({
                runTasks: state.runTasks.map((task) =>
                    task.id === taskId ? { ...task, ...updates } : task
                ),
            }));
        },

        removeTask: (taskId) => {
            set((state) => ({
                runTasks: state.runTasks.filter((task) => task.id !== taskId),
            }));
        },

        clearAllTasks: () => {
            set({ runTasks: [] });
        },

        // Undo/Redo
        undo: () => {
            const state = get();
            if (state.undoStack.length === 0) return;

            const previous = state.undoStack[state.undoStack.length - 1];
            const current: HistoryState = {
                nodes: state.nodes,
                edges: state.edges,
            };

            set({
                nodes: previous.nodes,
                edges: previous.edges,
                undoStack: state.undoStack.slice(0, -1),
                redoStack: [...state.redoStack, current].slice(-state.maxHistorySize),
                isDirty: true,
            });
        },

        redo: () => {
            const state = get();
            if (state.redoStack.length === 0) return;

            const next = state.redoStack[state.redoStack.length - 1];
            const current: HistoryState = {
                nodes: state.nodes,
                edges: state.edges,
            };

            set({
                nodes: next.nodes,
                edges: next.edges,
                redoStack: state.redoStack.slice(0, -1),
                undoStack: [...state.undoStack, current].slice(-state.maxHistorySize),
                isDirty: true,
            });
        },

        pushToHistory: () => {
            const state = get();
            const current: HistoryState = {
                nodes: [...state.nodes],
                edges: [...state.edges],
            };

            set({
                undoStack: [...state.undoStack, current].slice(-state.maxHistorySize),
                redoStack: [], // Clear redo stack on new action
            });
        },

        // Workflow management
        setWorkflow: (id, name, nodes, edges) => {
            set({
                workflowId: id,
                workflowName: name,
                nodes,
                edges,
                undoStack: [],
                redoStack: [],
                isDirty: false,
            });
        },

        setWorkflowName: (name) => {
            set({ workflowName: name, isDirty: true });
        },

        clearWorkflow: () => {
            set({
                nodes: [],
                edges: [],
                workflowId: null,
                workflowName: 'untitled',
                undoStack: [],
                redoStack: [],
                isDirty: false,
            });
        },

        markClean: () => {
            set({ isDirty: false });
        },

        // Backend sync - Load workflow from API
        loadWorkflow: async (id) => {
            set({ isLoading: true });
            try {
                const response = await api.getWorkflow(id);
                if (response.success && response.workflow) {
                    const { workflow } = response;
                    set({
                        workflowId: workflow.id,
                        workflowName: workflow.name,
                        nodes: (workflow.nodes || []) as WorkflowNode[],
                        edges: (workflow.edges || []) as WorkflowEdge[],
                        undoStack: [],
                        redoStack: [],
                        isDirty: false,
                        isLoading: false,
                    });
                } else {
                    console.error('Failed to load workflow:', response.message);
                    set({ isLoading: false });
                }
            } catch (error) {
                console.error('Error loading workflow:', error);
                set({ isLoading: false });
            }
        },

        // Backend sync - Save workflow to API
        saveWorkflow: async () => {
            const state = get();
            const { workflowId, workflowName, nodes, edges, isDirty } = state;

            if (!workflowId || !isDirty) {
                return true; // Nothing to save
            }

            set({ isSaving: true });
            try {
                const response = await api.updateWorkflow(workflowId, {
                    name: workflowName,
                    nodes: nodes as unknown as import('@/lib/api').WorkflowNode[],
                    edges: edges as unknown as import('@/lib/api').WorkflowEdge[],
                });

                if (response.success) {
                    set({ isDirty: false, isSaving: false });
                    return true;
                } else {
                    console.error('Failed to save workflow:', response.message);
                    set({ isSaving: false });
                    return false;
                }
            } catch (error) {
                console.error('Error saving workflow:', error);
                set({ isSaving: false });
                return false;
            }
        },

        // Backend sync - Create new workflow and save to backend
        createAndSaveWorkflow: async (name, nodes, edges) => {
            set({ isSaving: true });
            try {
                // First create workflow to get an ID
                const createResponse = await api.createWorkflow(name);

                if (!createResponse.success || !createResponse.workflow) {
                    console.error('Failed to create workflow:', createResponse.message);
                    set({ isSaving: false });
                    return null;
                }

                const workflowId = createResponse.workflow.id;

                // Now update with the nodes and edges
                const updateResponse = await api.updateWorkflow(workflowId, {
                    nodes: nodes as unknown as import('@/lib/api').WorkflowNode[],
                    edges: edges as unknown as import('@/lib/api').WorkflowEdge[],
                });

                if (updateResponse.success) {
                    set({
                        workflowId,
                        workflowName: name,
                        nodes,
                        edges,
                        undoStack: [],
                        redoStack: [],
                        isDirty: false,
                        isSaving: false,
                    });
                    return workflowId;
                } else {
                    console.error('Failed to save workflow data:', updateResponse.message);
                    set({ isSaving: false });
                    return null;
                }
            } catch (error) {
                console.error('Error creating workflow:', error);
                set({ isSaving: false });
                return null;
            }
        },

        // Get connected inputs for LLM node
        getConnectedInputs: (nodeId) => {
            const state = get();
            const result: {
                systemPrompt?: string;
                userMessage?: string;
                images: string[];
            } = { images: [] };

            // Find edges that target this node
            const incomingEdges = state.edges.filter((e) => e.target === nodeId);

            for (const edge of incomingEdges) {
                const sourceNode = state.nodes.find((n) => n.id === edge.source);
                if (!sourceNode) continue;

                switch (edge.targetHandle) {
                    case 'system_prompt':
                        if (sourceNode.type === 'text') {
                            result.systemPrompt = (sourceNode.data as TextNodeData).text;
                        }
                        break;
                    case 'user_message':
                        if (sourceNode.type === 'text') {
                            result.userMessage = (sourceNode.data as TextNodeData).text;
                        }
                        break;
                    case 'images':
                        if (sourceNode.type === 'image') {
                            const imageData = sourceNode.data as ImageNodeData;
                            // Push all base64 images from the images array
                            for (const img of imageData.images || []) {
                                if (img.imageBase64) {
                                    result.images.push(img.imageBase64);
                                }
                            }
                        }
                        break;
                }
            }

            return result;
        },

        // Propagate LLM output to connected downstream Text nodes
        propagateOutput: (sourceNodeId, output) => {
            const state = get();

            // Find edges where this node is the source
            const outgoingEdges = state.edges.filter((e) => e.source === sourceNodeId);

            for (const edge of outgoingEdges) {
                const targetNode = state.nodes.find((n) => n.id === edge.target);
                if (!targetNode) continue;

                // If target is a Text node, update its text with the output
                if (targetNode.type === 'text') {
                    set((s) => ({
                        nodes: s.nodes.map((node) =>
                            node.id === edge.target && node.type === 'text'
                                ? { ...node, data: { ...node.data, text: output } }
                                : node
                        ) as WorkflowNode[],
                    }));
                }
            }
        },
    }))
);

// ============================================================================
// Selectors
// ============================================================================

export const selectNodes = (state: WorkflowState) => state.nodes;
export const selectEdges = (state: WorkflowState) => state.edges;
export const selectWorkflowName = (state: WorkflowState) => state.workflowName;
export const selectIsDirty = (state: WorkflowState) => state.isDirty;
export const selectCanUndo = (state: WorkflowState) => state.undoStack.length > 0;
export const selectCanRedo = (state: WorkflowState) => state.redoStack.length > 0;
