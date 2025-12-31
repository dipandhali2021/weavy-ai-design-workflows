'use client';

import * as React from 'react';
import { Handle, Position, type Edge } from '@xyflow/react';
import { cn } from '@/lib/utils';
import { useWorkflowStore, type WorkflowState } from '@/stores/workflowStore';
import type { HandleLabelProps, HandleWithLabelProps, HandleColor } from '../types';
import { HANDLE_COLORS, getHandleStyle } from '../data/handle-colors';

/**
 * HandleLabel Component
 * 
 * Displays a label next to a handle that appears on hover
 */
export function HandleLabel({
  label,
  position,
  className,
  color = 'magenta',
}: HandleLabelProps) {
  const colorClasses: Record<HandleColor, string> = {
    magenta: 'text-pink-400',
    green: 'text-emerald-400',
    cyan: 'text-cyan-400',
  };

  return (
    <div
      className={cn(
        'absolute text-[11px] font-medium whitespace-nowrap pointer-events-none',
        'opacity-0 group-hover/node:opacity-100 transition-opacity duration-150',
        colorClasses[color],
        position === 'left' ? 'right-full mr-2' : 'left-full ml-2',
        className
      )}
    >
      {label}
    </div>
  );
}

/**
 * HandleWithLabel Component
 * 
 * Combines a React Flow Handle with a label and connection state detection.
 * The handle fills in when connected.
 * 
 * @example
 * ```tsx
 * <HandleWithLabel
 *   type="target"
 *   position={Position.Left}
 *   id="input"
 *   nodeId={id}
 *   label="input"
 *   color="magenta"
 * />
 * ```
 */
export function HandleWithLabel({
  type,
  position,
  id,
  nodeId,
  label,
  color = 'magenta',
  style,
}: HandleWithLabelProps) {
  // Check if this handle is connected
  const edges = useWorkflowStore((s: WorkflowState) => s.edges);
  const isConnected = edges.some((edge: Edge) => {
    if (type === 'source') {
      return edge.source === nodeId && edge.sourceHandle === id;
    }
    return edge.target === nodeId && edge.targetHandle === id;
  });

  return (
    <div className="relative">
      <Handle
        type={type}
        position={position}
        id={id}
        style={{ ...getHandleStyle(color, isConnected), ...style }}
      />
      <HandleLabel
        label={label}
        position={position === Position.Left ? 'left' : 'right'}
        color={color}
      />
    </div>
  );
}
