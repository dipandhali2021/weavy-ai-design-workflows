'use client';

import * as React from 'react';
import { Handle, Position, type NodeProps, useReactFlow } from '@xyflow/react';
import { cn } from '@/lib/utils';
import { useWorkflowStore } from '@/stores/workflowStore';
import {
  type TextFlowNode,
  type ImageFlowNode,
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
import {
  Ellipsis,
  ImageIcon,
  Loader2,
  Play,
  Type,
  Upload,
  X,
  Sparkles,
} from 'lucide-react';

// ============================================================================
// Shared Components
// ============================================================================

function NodeShell({
  title,
  icon,
  right,
  children,
  className,
  selected,
}: {
  title: string;
  icon?: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  selected?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border bg-card text-card-foreground shadow-lg',
        'w-[280px] overflow-hidden transition-all',
        selected ? 'border-purple-500 ring-2 ring-purple-500/30' : 'border-border',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <div className="flex items-center gap-2">
          {icon && <span className="text-foreground/70">{icon}</span>}
          <div className="text-sm font-medium text-foreground">{title}</div>
        </div>
        {right}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function HandleLabel({
  label,
  position,
  className,
}: {
  label: string;
  position: 'left' | 'right';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'absolute text-[10px] text-foreground/60 whitespace-nowrap',
        position === 'left' ? 'left-3' : 'right-3',
        className
      )}
    >
      {label}
    </div>
  );
}

const handleStyle = {
  width: 12,
  height: 12,
  border: '2px solid hsl(var(--background))',
  backgroundColor: '#8B5CF6',
};

// ============================================================================
// Text Node
// ============================================================================

export function TextNode({ id, data, selected }: NodeProps<TextFlowNode>) {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);

  return (
    <div className="relative">
      {/* Input Handle (Left side - to receive data from LLM output) */}
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        style={{ ...handleStyle, top: '50%' }}
      />

      {/* Output Handle (Right side) */}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ ...handleStyle, top: '50%' }}
      />

      <NodeShell
        title="Text"
        icon={<Type className="h-4 w-4" />}
        selected={selected}
        right={
          <button
            type="button"
            aria-label="Node options"
            className="grid h-7 w-7 place-items-center rounded-md text-foreground/60 hover:bg-muted/40"
          >
            <Ellipsis className="h-4 w-4" />
          </button>
        }
      >
        <textarea
          value={data.text || ''}
          onChange={(e) => updateNodeData<TextFlowNode>(id, { text: e.target.value })}
          placeholder="Enter your text here..."
          className={cn(
            'nodrag w-full resize-none rounded-lg bg-muted/40 p-3',
            'text-sm leading-relaxed text-foreground/90',
            'placeholder:text-foreground/40 outline-none',
            'focus:ring-2 focus:ring-purple-500/50',
            'min-h-[100px]'
          )}
        />
      </NodeShell>
    </div>
  );
}

// ============================================================================
// Image Node
// ============================================================================

export function ImageNode({ id, data, selected }: NodeProps<ImageFlowNode>) {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      // Store both the full data URL for preview and the base64 for API
      const base64Data = base64.split(',')[1]; // Remove data URI prefix
      updateNodeData<ImageFlowNode>(id, {
        imageUrl: base64,
        imageBase64: base64Data,
        fileName: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      const base64Data = base64.split(',')[1];
      updateNodeData<ImageFlowNode>(id, {
        imageUrl: base64,
        imageBase64: base64Data,
        fileName: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    updateNodeData<ImageFlowNode>(id, {
      imageUrl: undefined,
      imageBase64: undefined,
      fileName: undefined,
    });
  };

  return (
    <div className="relative">
      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ ...handleStyle, top: '50%' }}
      />

      <NodeShell
        title="Image"
        icon={<ImageIcon className="h-4 w-4" />}
        selected={selected}
        right={
          data.imageUrl && (
            <button
              type="button"
              onClick={clearImage}
              aria-label="Clear image"
              className="grid h-7 w-7 place-items-center rounded-md text-foreground/60 hover:bg-muted/40 hover:text-red-400"
            >
              <X className="h-4 w-4" />
            </button>
          )
        }
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {data.imageUrl ? (
          <div className="relative">
            <img
              src={data.imageUrl}
              alt={data.fileName || 'Uploaded image'}
              className="w-full rounded-lg object-cover max-h-[180px]"
            />
            <div className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
              {data.fileName}
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className={cn(
              'nodrag cursor-pointer rounded-lg border-2 border-dashed border-border/60',
              'flex flex-col items-center justify-center gap-2 p-8',
              'bg-muted/20 transition-colors hover:bg-muted/40 hover:border-purple-500/50'
            )}
          >
            <Upload className="h-8 w-8 text-foreground/40" />
            <div className="text-center text-sm text-foreground/60">
              <div>Drag & drop or click to upload</div>
              <div className="text-xs text-foreground/40 mt-1">PNG, JPG, GIF up to 10MB</div>
            </div>
          </div>
        )}
      </NodeShell>
    </div>
  );
}

// ============================================================================
// LLM Node (Run Any LLM)
// ============================================================================

export function LLMNode({ id, data, selected }: NodeProps<LLMFlowNode>) {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const getConnectedInputs = useWorkflowStore((s) => s.getConnectedInputs);
  const propagateOutput = useWorkflowStore((s) => s.propagateOutput);

  const handleRun = async () => {
    updateNodeData<LLMFlowNode>(id, { isLoading: true, error: undefined });

    try {
      // Get connected inputs from other nodes
      const inputs = getConnectedInputs(id);
      
      // Also check local data for backward compatibility
      const systemPrompt = inputs.systemPrompt || data.systemPrompt;
      const userMessage = inputs.userMessage || data.userMessage || '';
      const images = inputs.images.length > 0 ? inputs.images : (data.images || []);

      if (!userMessage.trim()) {
        throw new Error('User message is required. Connect a Text node to the user_message input.');
      }

      const response = await fetch('/api/llm/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: data.model,
          systemPrompt,
          userMessage,
          images,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'LLM request failed');
      }

      updateNodeData<LLMFlowNode>(id, {
        output: result.output,
        isLoading: false,
        error: undefined,
      });

      // Propagate output to connected downstream Text nodes
      propagateOutput(id, result.output);

    } catch (error) {
      updateNodeData<LLMFlowNode>(id, {
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  return (
    <div className="relative">
      {/* Input Handles (Left side) */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-center gap-8" style={{ transform: 'translateX(-6px)' }}>
        <div className="relative">
          <Handle
            type="target"
            position={Position.Left}
            id={LLM_HANDLES.SYSTEM_PROMPT}
            style={{ ...handleStyle, position: 'relative', top: 0 }}
          />
          <HandleLabel label="system_prompt" position="left" className="top-[-16px]" />
        </div>
        <div className="relative">
          <Handle
            type="target"
            position={Position.Left}
            id={LLM_HANDLES.USER_MESSAGE}
            style={{ ...handleStyle, position: 'relative', top: 0 }}
          />
          <HandleLabel label="user_message" position="left" className="top-[-16px]" />
        </div>
        <div className="relative">
          <Handle
            type="target"
            position={Position.Left}
            id={LLM_HANDLES.IMAGES}
            style={{ ...handleStyle, position: 'relative', top: 0 }}
          />
          <HandleLabel label="images" position="left" className="top-[-16px]" />
        </div>
      </div>

      {/* Output Handle (Right side) */}
      <Handle
        type="source"
        position={Position.Right}
        id={LLM_HANDLES.OUTPUT}
        style={{ ...handleStyle, top: '50%' }}
      />

      <NodeShell
        title="Run Any LLM"
        icon={<Sparkles className="h-4 w-4" />}
        selected={selected}
        className="w-[320px]"
        right={
          <button
            type="button"
            aria-label="Node options"
            className="grid h-7 w-7 place-items-center rounded-md text-foreground/60 hover:bg-muted/40"
          >
            <Ellipsis className="h-4 w-4" />
          </button>
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

          {/* Status Display - only loading and errors, output goes to connected Text nodes */}
          {(data.error || data.isLoading) && (
            <div
              className={cn(
                'rounded-lg p-3 text-sm',
                data.error
                  ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                  : 'bg-muted/40 text-foreground/80'
              )}
            >
              {data.isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Running...</span>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <X className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{data.error}</span>
                </div>
              )}
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
    </div>
  );
}

// ============================================================================
// Node Types Export
// ============================================================================

export const workflowNodeTypes = {
  text: TextNode,
  image: ImageNode,
  llm: LLMNode,
};
