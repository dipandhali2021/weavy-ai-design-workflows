/**
 * Workflow-related type definitions
 */

export interface WorkflowNode {
    id: string;
    type: string;
    position: { x: number; y: number };
    data: Record<string, unknown>;
}

export interface WorkflowEdge {
    id: string;
    source: string;
    target: string;
    sourceHandle?: string;
    targetHandle?: string;
}

export interface WorkflowListItem {
    id: string;
    name: string;
    thumbnail?: string;
    folderId: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface WorkflowResponse {
    id: string;
    name: string;
    nodes: WorkflowNode[];
    edges: WorkflowEdge[];
    thumbnail?: string;
    folderId?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
