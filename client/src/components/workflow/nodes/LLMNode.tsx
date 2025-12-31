'use client';

import * as React from 'react';
import { Position, type NodeProps } from '@xyflow/react';
import { cn } from '@/lib/utils';
import { useWorkflowStore, type WorkflowState } from '@/stores/workflowStore';
import { api } from '@/lib/api';
import {
  type LLMFlowNode,
  GEMINI_MODELS,
  LLM_HANDLES,
} from '@/types/workflow.types';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Lock, Play, Sparkles, X } from 'lucide-react';

import {
  NodeShell,
  HandleWithLabel,
  RenameDialog,
  NodeDropdownMenu,
} from '../primitives';

/**
 * LLMNode Component
 * 
 * A node for running LLM inference.
 * Features:
 * - Model selector dropdown
 * - Input handles for system_prompt, user_message, and images
 * - Output handle for LLM response
 * - Run button with loading state
 * - Error display
 */
export function LLMNode({ id, data, selected }: NodeProps<LLMFlowNode>) {
  const updateNodeData = useWorkflowStore((s: WorkflowState) => s.updateNodeData);
  const getConnectedInputs = useWorkflowStore((s: WorkflowState) => s.getConnectedInputs);
  const propagateOutput = useWorkflowStore((s: WorkflowState) => s.propagateOutput);
  const addTask = useWorkflowStore((s: WorkflowState) => s.addTask);
  const updateTask = useWorkflowStore((s: WorkflowState) => s.updateTask);

  const [renameDialogOpen, setRenameDialogOpen] = React.useState(false);
  const [newLabel, setNewLabel] = React.useState(data.label || 'Run Any LLM');

  const displayLabel = data.label || 'Run Any LLM';
  const isLocked = data.isLocked || false;

  const handleRename = () => {
    if (newLabel.trim()) {
      updateNodeData<LLMFlowNode>(id, { label: newLabel.trim() });
    }
    setRenameDialogOpen(false);
  };

  const toggleLock = () => {
    updateNodeData<LLMFlowNode>(id, { isLocked: !isLocked });
  };

  const handleRun = async () => {
    updateNodeData<LLMFlowNode>(id, { isLoading: true, error: undefined });

    const taskId = addTask(id, displayLabel);

    try {
      const inputs = getConnectedInputs(id);

      const systemPrompt = inputs.systemPrompt || data.systemPrompt;
      const userMessage = inputs.userMessage || data.userMessage || '';
      const images = inputs.images.length > 0 ? inputs.images : (data.images || []);

      if (!userMessage.trim()) {
        throw new Error('User message is required. Connect a Text node to the user_message input.');
      }

      const result = await api.runLLM({
        model: data.model,
        systemPrompt,
        userMessage,
        images,
      });

      if (!result.success) {
        throw new Error(result.error || 'LLM request failed');
      }

      updateNodeData<LLMFlowNode>(id, {
        output: result.output,
        isLoading: false,
        error: undefined,
      });

      updateTask(taskId, { status: 'completed', completedAt: new Date() });
      propagateOutput(id, result.output || '');

    } catch (error) {
      updateNodeData<LLMFlowNode>(id, {
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      updateTask(taskId, {
        status: 'failed',
        completedAt: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  return (
    <div className="relative group/node">
      {/* Input Handles */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-center gap-8" style={{ transform: 'translateX(-6px)' }}>
        <HandleWithLabel
          type="target"
          position={Position.Left}
          id={LLM_HANDLES.SYSTEM_PROMPT}
          nodeId={id}
          label="system_prompt"
          color="magenta"
          style={{ position: 'relative', top: 0 }}
        />
        <HandleWithLabel
          type="target"
          position={Position.Left}
          id={LLM_HANDLES.USER_MESSAGE}
          nodeId={id}
          label="user_message"
          color="magenta"
          style={{ position: 'relative', top: 0 }}
        />
        <HandleWithLabel
          type="target"
          position={Position.Left}
          id={LLM_HANDLES.IMAGES}
          nodeId={id}
          label="images"
          color="cyan"
          style={{ position: 'relative', top: 0 }}
        />
      </div>

      {/* Output Handle */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2" style={{ transform: 'translate(6px, -50%)' }}>
        <HandleWithLabel
          type="source"
          position={Position.Right}
          id={LLM_HANDLES.OUTPUT}
          nodeId={id}
          label="output"
          color="green"
        />
      </div>

      <NodeShell
        title={displayLabel}
        icon={<Sparkles className="h-4 w-4" />}
        selected={selected}
        className="w-[360px]"
        right={
          <div className="flex items-center gap-1">
            {isLocked && <Lock className="h-4 w-4 text-foreground/50" />}
            <NodeDropdownMenu
              nodeId={id}
              label={displayLabel}
              isLocked={isLocked}
              onToggleLock={toggleLock}
              onOpenRename={() => {
                setNewLabel(displayLabel);
                setRenameDialogOpen(true);
              }}
            />
          </div>
        }
      >
        <div className="space-y-4">
          {/* Model Selector */}
          <div>
            <label className="text-xs text-foreground/60 mb-1 block">Model</label>
            <Select
              value={data.model}
              onValueChange={(value) =>
                updateNodeData<LLMFlowNode>(id, { model: value as LLMFlowNode['data']['model'] })
              }
            >
              <SelectTrigger className="nodrag w-full bg-muted/40">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {GEMINI_MODELS.map((model) => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Error Display */}
          {data.error && (
            <div
              className={cn(
                'rounded-lg p-3 text-sm',
                'bg-red-500/10 text-red-400 border border-red-500/30'
              )}
            >
              <div className="flex items-start gap-2">
                <X className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{data.error}</span>
              </div>
            </div>
          )}

          {/* Run Button */}
          <Button
            onClick={handleRun}
            disabled={data.isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            {data.isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Run
              </>
            )}
          </Button>
        </div>
      </NodeShell>

      <RenameDialog
        open={renameDialogOpen}
        onOpenChange={setRenameDialogOpen}
        value={newLabel}
        onChange={setNewLabel}
        onSubmit={handleRename}
      />
    </div>
  );
}
