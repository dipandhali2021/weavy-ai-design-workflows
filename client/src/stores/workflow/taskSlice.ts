import type { RunTask } from '@/types/workflow.types';
import type { StateCreator } from './types';
import { generateTaskId } from './helpers';

// ============================================================================
// Task Slice Actions
// ============================================================================

export interface TaskSlice {
    addTask: (nodeId: string, nodeName: string) => string;
    updateTask: (taskId: string, updates: Partial<RunTask>) => void;
    removeTask: (taskId: string) => void;
    clearAllTasks: () => void;
}

export const createTaskSlice: StateCreator<TaskSlice> = (set) => ({
    addTask: (nodeId, nodeName) => {
        const taskId = generateTaskId();
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
});
