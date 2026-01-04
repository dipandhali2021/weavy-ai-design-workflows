import type { Viewport } from '@xyflow/react';
import type {
    WorkflowNode,
    WorkflowEdge,
    HistoryState,
    RunTask,
} from '@/types/workflow.types';

// ============================================================================
// Store State Types
// ============================================================================

export interface WorkflowStateData {
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
}

// ============================================================================
// Initial State
// ============================================================================

export const initialState: WorkflowStateData = {
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
};

// ============================================================================
// Base actions that all slices can depend on
// ============================================================================

export interface BaseActions {
    pushToHistory: () => void;
}

// ============================================================================
// Slice Creator Type
// ============================================================================

export type StateCreator<T> = (
    set: (partial: Partial<WorkflowStateData> | ((state: WorkflowStateData) => Partial<WorkflowStateData>)) => void,
    get: () => WorkflowStateData & BaseActions & T
) => T;
