'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { QuickAccessNodeButtonProps } from '../types';

/**
 * QuickAccessNodeButton Component
 * 
 * A draggable button for adding nodes to the workflow canvas.
 * Supports both click-to-add and drag-to-drop functionality.
 */
export function QuickAccessNodeButton({
  title,
  icon,
  nodeType,
  onAdd,
}: QuickAccessNodeButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onAdd(nodeType)}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('application/reactflow', nodeType);
        e.dataTransfer.effectAllowed = 'move';
      }}
      className={cn(
        'flex h-24 flex-col items-center justify-center gap-2 rounded-md border border-border/60',
        'bg-card/40 text-foreground/90 hover:bg-purple-500/10 hover:border-purple-500/50',
        'transition-all cursor-grab active:cursor-grabbing'
      )}
    >
      <span className="text-foreground/80">{icon}</span>
      <span className="text-[13px] font-medium">{title}</span>
    </button>
  );
}
