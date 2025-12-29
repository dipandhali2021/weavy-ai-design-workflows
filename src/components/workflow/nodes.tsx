'use client';

import * as React from 'react';
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Ellipsis, Play } from 'lucide-react';

function CardShell({
  title,
  right,
  children,
  className,
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card text-card-foreground shadow-xs',
        'w-[260px] overflow-hidden',
        className
      )}
    >
      <div className="flex items-center justify-between px-4 pt-3">
        <div className="text-[12px] font-medium text-foreground/80">
          {title}
        </div>
        {right}
      </div>
      <div className="px-4 pb-4 pt-2">{children}</div>
    </div>
  );
}

function Checkerboard({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  // Uses theme tokens only (background/muted) to avoid hard-coded new colors.
  const style: React.CSSProperties = {
    backgroundColor: 'hsl(var(--muted))',
    backgroundImage: [
      'linear-gradient(45deg, hsl(var(--background)) 25%, transparent 25%)',
      'linear-gradient(-45deg, hsl(var(--background)) 25%, transparent 25%)',
      'linear-gradient(45deg, transparent 75%, hsl(var(--background)) 75%)',
      'linear-gradient(-45deg, transparent 75%, hsl(var(--background)) 75%)',
    ].join(','),
    backgroundSize: '16px 16px',
    backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
  };

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-lg border border-border/60',
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

export type PromptNodeData = {
  text: string;
};

export type PromptFlowNode = Node<PromptNodeData, 'prompt'>;

export function PromptNode({ data }: NodeProps<PromptFlowNode>) {
  return (
    <div className="relative">
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        className="h-3! w-3! border-2! border-background! bg-[hsl(var(--sidebar-ring))]!"
      />

      <CardShell
        title="Prompt"
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
        <div className="rounded-lg bg-muted/40 p-3 text-[12px] leading-5 text-foreground/80">
          {data.text}
        </div>
      </CardShell>
    </div>
  );
}

export type FileNodeData = {
  hint?: string;
};

export type FileFlowNode = Node<FileNodeData, 'file'>;

export function FileNode(_props: NodeProps<FileFlowNode>) {
  return (
    <div className="relative">
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        className="h-3! w-3! border-2! border-background! bg-[hsl(var(--sidebar-ring))]!"
      />

      <CardShell title="File">
        <Checkerboard className="h-[170px]">
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="text-[12px] text-foreground/70">
                Drag & drop or click to upload
              </div>
            </div>
          </div>
        </Checkerboard>

        <div className="mt-3 rounded-md border border-border/60 bg-background px-3 py-2 text-[12px] text-foreground/50">
          Paste a file link
        </div>
      </CardShell>
    </div>
  );
}

export type ModelNodeData = {
  title: string;
};

export type ModelFlowNode = Node<ModelNodeData, 'model'>;

export function ModelNode({ data }: NodeProps<ModelFlowNode>) {
  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Left}
        id="prompt"
        style={{ top: 26 }}
        className="h-3! w-3! border-2! border-background! bg-[hsl(var(--sidebar-ring))]!"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="file"
        style={{ top: 54 }}
        className="h-3! w-3! border-2! border-background! bg-[hsl(var(--sidebar-ring))]!"
      />

      <CardShell
        title={data.title}
        className="w-[330px]"
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
        <Checkerboard className="h-[210px]" />

        <div className="mt-3 flex justify-end">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 rounded-md px-3 text-[12px]"
          >
            <Play className="mr-2 h-3.5 w-3.5" />
            Run Model
          </Button>
        </div>
      </CardShell>
    </div>
  );
}

export const workflowNodeTypes = {
  prompt: PromptNode,
  file: FileNode,
  model: ModelNode,
};
