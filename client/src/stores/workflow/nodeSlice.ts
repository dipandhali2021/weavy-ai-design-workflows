import type { WorkflowNode } from '@/types/workflow.types';
import type { StateCreator } from './types';
import { generateNodeId, getDefaultNodeData } from './helpers';

// ============================================================================
// Node Slice Actions
// ============================================================================

export interface NodeSlice {
    addNode: (type: 'text' | 'image' | 'llm', position: { x: number; y: number }) => string;
    updateNodeData: <T extends WorkflowNode>(nodeId: string, data: Partial<T['data']>) => void;
    deleteNode: (nodeId: string) => void;
    deleteSelectedNodes: () => void;
    duplicateNode: (nodeId: string) => string | null;
}

export const createNodeSlice: StateCreator<NodeSlice> = (set, get) => ({
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
            data: { ...nodeToDuplicate.data, isLocked: false },
            selected: false,
        } as WorkflowNode;

        set({
            nodes: [...state.nodes, newNode],
            isDirty: true,
        });

        return newNodeId;
    },
});
