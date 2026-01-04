import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import {
    initialState,
    type WorkflowStateData,
    createNodeSlice,
    type NodeSlice,
    createEdgeSlice,
    type EdgeSlice,
    createHistorySlice,
    type HistorySlice,
    createTaskSlice,
    type TaskSlice,
    createPersistenceSlice,
    type PersistenceSlice,
} from './workflow';

// ============================================================================
// Combined Store Type
// ============================================================================

export type WorkflowState = WorkflowStateData &
    NodeSlice &
    EdgeSlice &
    HistorySlice &
    TaskSlice &
    PersistenceSlice;

// ============================================================================
// Store Creation
// ============================================================================

export const useWorkflowStore = create<WorkflowState>()(
    subscribeWithSelector((set, get) => {
        // Type-safe set and get for slices
        const typedSet = set as (
            partial: Partial<WorkflowStateData> | ((state: WorkflowStateData) => Partial<WorkflowStateData>)
        ) => void;
        const typedGet = get as () => WorkflowState;

        return {
            // Initial state
            ...initialState,

            // Combine all slices
            ...createHistorySlice(typedSet, typedGet),
            ...createNodeSlice(typedSet, typedGet),
            ...createEdgeSlice(typedSet, typedGet),
            ...createTaskSlice(typedSet, typedGet),
            ...createPersistenceSlice(typedSet, typedGet),
        };
    })
);

// ============================================================================
// Re-export selectors for convenience
// ============================================================================

export {
    selectNodes,
    selectEdges,
    selectWorkflowName,
    selectIsDirty,
    selectCanUndo,
    selectCanRedo,
    selectIsLoading,
    selectIsSaving,
    selectRunTasks,
} from './workflow/selectors';
