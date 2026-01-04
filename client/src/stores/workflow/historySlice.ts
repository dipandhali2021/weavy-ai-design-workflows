import type { HistoryState } from '@/types/workflow.types';
import type { StateCreator } from './types';

// ============================================================================
// History Slice Actions
// ============================================================================

export interface HistorySlice {
    undo: () => void;
    redo: () => void;
    pushToHistory: () => void;
}

export const createHistorySlice: StateCreator<HistorySlice> = (set, get) => ({
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
            redoStack: [],
        });
    },
});
