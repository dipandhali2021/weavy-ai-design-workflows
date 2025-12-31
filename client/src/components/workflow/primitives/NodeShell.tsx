'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { NodeShellProps } from '../types';

/**
 * NodeShell Component
 * 
 * Reusable wrapper for all workflow nodes providing:
 * - Consistent card styling
 * - Header with icon, title, and right-side actions
 * - Selection state highlighting
 * 
 * @example
 * ```tsx
 * <NodeShell
 *   title="Text"
 *   icon={<Type className="h-4 w-4" />}
 *   selected={selected}
 *   right={<NodeDropdownMenu ... />}
 * >
 *   <textarea ... />
 * </NodeShell>
 * ```
 */
export function NodeShell({
  title,
  icon,
  right,
  children,
  className,
  selected,
}: NodeShellProps) {
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
