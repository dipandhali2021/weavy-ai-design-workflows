'use client';

import * as React from 'react';
import { Check, Loader2, X } from 'lucide-react';
import { useWorkflowStore } from '@/stores/workflowStore';
import type { TaskManagerPanelProps } from '../types';

/**
 * TaskManagerPanel Component
 * 
 * Displays a list of running and completed tasks with status indicators.
 */
export function TaskManagerPanel({ onClose }: TaskManagerPanelProps) {
  const runTasks = useWorkflowStore((s) => s.runTasks);
  const clearAllTasks = useWorkflowStore((s) => s.clearAllTasks);

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Sort tasks: running first, then by start time (newest first)
  const sortedTasks = [...runTasks].sort((a, b) => {
    if (a.status === 'running' && b.status !== 'running') return -1;
    if (a.status !== 'running' && b.status === 'running') return 1;
    return new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime();
  });

  return (
    <div className="w-[340px] rounded-md border border-border/60 bg-card/95 backdrop-blur shadow-lg">
      <div className="flex items-center justify-between p-3">
        <div className="text-[16px] font-medium text-foreground">
          Task manager
        </div>
        <div className="flex items-center gap-2">
          {runTasks.length > 0 && (
            <button
              type="button"
              onClick={clearAllTasks}
              className="text-sm text-foreground/60 hover:text-foreground transition-colors"
            >
              Clear all
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close task manager"
            className="grid h-8 w-8 place-items-center rounded-md text-foreground/70 hover:bg-muted/30"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="h-px w-full bg-border/60" />

      {runTasks.length === 0 ? (
        <div className="py-4 px-3 text-[13px] text-foreground/60">
          No active runs
        </div>
      ) : (
        <div className="max-h-[300px] overflow-y-auto">
          {sortedTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 px-3 py-3 border-b border-border/30 last:border-b-0"
            >
              {/* Status icon */}
              <div className="flex-shrink-0">
                {task.status === 'running' ? (
                  <Loader2 className="h-5 w-5 text-purple-400 animate-spin" />
                ) : task.status === 'completed' ? (
                  <div className="h-5 w-5 rounded-full border-2 border-foreground/60 flex items-center justify-center">
                    <Check className="h-3 w-3 text-foreground/60" />
                  </div>
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-red-400 flex items-center justify-center">
                    <X className="h-3 w-3 text-red-400" />
                  </div>
                )}
              </div>

              {/* Task info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground truncate">
                    {formatTime(task.startedAt)}
                  </span>
                  <span className="text-sm text-foreground/60">
                    {task.progress}
                  </span>
                </div>
                {task.error && (
                  <div className="text-xs text-red-400 truncate mt-0.5">
                    {task.error}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
