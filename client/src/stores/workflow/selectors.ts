import type { WorkflowStateData } from './types';

// ============================================================================
// Selectors
// ============================================================================

// Selectors use WorkflowStateData since they only access data properties,
// not the action methods from slices. This makes them compatible with
// any state type that extends WorkflowStateData.

export const selectNodes = (state: WorkflowStateData) => state.nodes;
export const selectEdges = (state: WorkflowStateData) => state.edges;
export const selectWorkflowName = (state: WorkflowStateData) => state.workflowName;
export const selectIsDirty = (state: WorkflowStateData) => state.isDirty;
export const selectCanUndo = (state: WorkflowStateData) => state.undoStack.length > 0;
export const selectCanRedo = (state: WorkflowStateData) => state.redoStack.length > 0;
export const selectIsLoading = (state: WorkflowStateData) => state.isLoading;
export const selectIsSaving = (state: WorkflowStateData) => state.isSaving;
export const selectRunTasks = (state: WorkflowStateData) => state.runTasks;
