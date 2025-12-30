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
} from '@/types/workflow.types';

// ============================================================================
// Store Types
// ============================================================================

interface WorkflowState {
    // Core state
    nodes: WorkflowNode[];
    edges: WorkflowEdge[];
    viewport: Viewport;
    workflowId: string | null;
    workflowName: string;
    isDirty: boolean;

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

    // Actions - Undo/Redo
    undo: () => void;
    redo: () => void;
    pushToHistory: () => void;

    // Actions - Workflow management
    setWorkflow: (id: string | null, name: string, nodes: WorkflowNode[], edges: WorkflowEdge[]) => void;
    setWorkflowName: (name: string) => void;
    clearWorkflow: () => void;
    markClean: () => void;

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
            return {};
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
        undoStack: [],
        redoStack: [],
        maxHistorySize: 50,

        // React Flow change handlers
        onNodesChange: (changes) => {
            const state = get();
            // Push to history before significant changes (not just selection changes)
            const hasSignificantChange = changes.some(
                (c) => c.type !== 'select' && c.type !== 'dimensions'
            );
            if (hasSignificantChange) {
                state.pushToHistory();
            }

            set({
                nodes: applyNodeChanges(changes, state.nodes) as WorkflowNode[],
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
                animated: true,
                style: { stroke: '#8B5CF6', strokeWidth: 2 },
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
                            if (imageData.imageBase64) {
                                result.images.push(imageData.imageBase64);
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
