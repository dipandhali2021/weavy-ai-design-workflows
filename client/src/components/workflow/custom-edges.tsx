'use client';

import * as React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type EdgeProps,
  type Edge,
} from '@xyflow/react';
import { cn } from '@/lib/utils';

// =========================================================================
// Custom Bezier Edge with pink/magenta color and selection support
// ============================================================================

export function CustomBezierEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  selected,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      {/* Invisible wider path for easier selection */}
      <path
        id={`${id}-hitbox`}
        style={{
          stroke: 'transparent',
          strokeWidth: 20,
          fill: 'none',
          cursor: 'pointer',
        }}
        d={edgePath}
        className="react-flow__edge-interaction"
      />
      {/* Glow effect when selected */}
      {selected && (
        <path
          d={edgePath}
          style={{
            stroke: '#E879F9',
            strokeWidth: 6,
            fill: 'none',
            filter: 'blur(4px)',
            opacity: 0.5,
          }}
        />
      )}
      {/* Main edge path */}
      <path
        id={id}
        style={{
          stroke: '#E879F9',
          strokeWidth: selected ? 3 : 2,
          fill: 'none',
          ...style,
        }}
        d={edgePath}
        className="react-flow__edge-path"
      />
    </>
  );
}

// ============================================================================
// Edge Types Export
// ============================================================================

export const customEdgeTypes = {
  custom: CustomBezierEdge,
};
