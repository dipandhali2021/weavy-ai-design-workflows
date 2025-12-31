'use client';

import * as React from 'react';
import { Panel } from '@xyflow/react';
import { PiShareLight } from 'react-icons/pi';
import { TbAsterisk } from 'react-icons/tb';
import { Check, ChevronDown, Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TaskManagerPanel } from './TaskManagerPanel';

interface RightPanelProps {
  isSaving: boolean;
  isDirty: boolean;
  onSave: () => void;
}

/**
 * RightPanel Component
 * 
 * Top-right panel containing:
 * - Credits display
 * - Share button
 * - Save status indicator
 * - Task manager toggle
 */
export function RightPanel({ isSaving, isDirty, onSave }: RightPanelProps) {
  const [taskManagerOpen, setTaskManagerOpen] = React.useState(false);

  return (
    <>
      {/* Task manager panel */}
      {taskManagerOpen && (
        <Panel
          position="top-right"
          className="pointer-events-auto"
          style={{ margin: 24, transform: 'translateX(-276px)' }}
        >
          <TaskManagerPanel onClose={() => setTaskManagerOpen(false)} />
        </Panel>
      )}

      {/* Credits and share panel */}
      <Panel
        position="top-right"
        className="pointer-events-auto"
        style={{ margin: 24 }}
      >
        <div className="w-[260px] rounded-md border border-border/60 bg-card/80 backdrop-blur p-3 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="text-[14px] flex items-center gap-1 font-medium text-foreground">
              <TbAsterisk className="text-[16px]" />
              <p>149 credits</p>
            </div>
            <Button
              size="sm"
              className="h-8 rounded-md bg-[#faffc7] text-black hover:bg-[#f0f5a0] px-4"
            >
              <PiShareLight className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          {/* Save status indicator with Save button */}
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              {isSaving ? (
                <span className="flex items-center gap-1 text-foreground/60">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Saving...
                </span>
              ) : !isDirty ? (
                <span className="flex items-center gap-1 text-green-500/80">
                  <Check className="h-3 w-3" />
                  Saved
                </span>
              ) : (
                <span className="flex items-center gap-1 text-foreground/50">
                  <span className="h-2 w-2 rounded-full bg-yellow-500" />
                  Unsaved
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving || !isDirty}
              className={cn(
                'flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-colors',
                isDirty && !isSaving
                  ? 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'
                  : 'text-foreground/40 cursor-not-allowed'
              )}
              title="Ctrl+S"
            >
              <Save className="h-3 w-3" />
              <span>Save</span>
              <span className="text-[10px] text-foreground/40 ml-1">⌘S</span>
            </button>
          </div>

          <div className="mt-2">
            <button
              type="button"
              onClick={() => setTaskManagerOpen((v) => !v)}
              className="flex items-center gap-2 text-[14px] font-medium text-foreground/90 hover:text-foreground hover:bg-muted/30 px-2 py-1 rounded-md"
              aria-expanded={taskManagerOpen}
            >
              Tasks
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Panel>
    </>
  );
}
