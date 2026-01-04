import {
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    type NodeChange,
    type EdgeChange,
    type Connection,
    type Viewport,
} from '@xyflow/react';
import type { WorkflowNode, WorkflowEdge, LLMNodeData } from '@/types/workflow.types';
import type { StateCreator } from './types';
import { generateEdgeId } from './helpers';
import { validateConnection } from '@/lib/connectionValidation';

// ============================================================================
// Edge Slice Actions
// ============================================================================

export interface EdgeSlice {
    onNodesChange: (changes: NodeChange[]) => void;
    onEdgesChange: (changes: EdgeChange[]) => void;
    onConnect: (connection: Connection) => void;
    onViewportChange: (viewport: Viewport) => void;
    deleteSelectedEdges: () => void;
}

export const createEdgeSlice: StateCreator<EdgeSlice> = (set, get) => ({
    onNodesChange: (changes) => {
        const state = get();

        // Filter out position changes for locked nodes
        const filteredChanges = changes.filter((change) => {
            if (change.type === 'position' && 'id' in change) {
                const node = state.nodes.find((n) => n.id === change.id);
                if (node && (node.data as { isLocked?: boolean }).isLocked) {
                    return false;
                }
            }
            return true;
        });

        if (filteredChanges.length === 0) return;

        // Push to history before significant changes
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

        // Validate connection before adding
        const validation = validateConnection(connection, state.nodes, state.edges);

        if (!validation.valid) {
            console.warn('Connection rejected:', validation.error);
            return;
        }

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

        // Propagate LLM output to Text node on connect
        if (connection.sourceHandle === 'output' && connection.targetHandle === 'input') {
            const sourceNode = state.nodes.find((n) => n.id === connection.source);
            const targetNode = state.nodes.find((n) => n.id === connection.target);

            if (sourceNode?.type === 'llm' && targetNode?.type === 'text') {
                const llmData = sourceNode.data as LLMNodeData;
                if (llmData.output) {
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
});
