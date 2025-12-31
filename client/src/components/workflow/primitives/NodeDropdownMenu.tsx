'use client';

import * as React from 'react';
import {
  Copy,
  Ellipsis,
  Lock,
  LockOpen,
  Pencil,
  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWorkflowStore, type WorkflowState } from '@/stores/workflowStore';
import type { NodeDropdownMenuProps } from '../types';

/**
 * NodeDropdownMenu Component
 * 
 * Reusable dropdown menu for workflow nodes with common actions:
 * - Duplicate
 * - Rename
 * - Lock/Unlock
 * - Delete
 * 
 * @example
 * ```tsx
 * <NodeDropdownMenu
 *   nodeId={id}
 *   label={displayLabel}
 *   isLocked={isLocked}
 *   onToggleLock={toggleLock}
 *   onOpenRename={() => setRenameDialogOpen(true)}
 * />
 * ```
 */
export function NodeDropdownMenu({
  nodeId,
  label,
  isLocked,
  onToggleLock,
  onOpenRename,
  additionalItems,
}: NodeDropdownMenuProps) {
  const deleteNode = useWorkflowStore((s: WorkflowState) => s.deleteNode);
  const duplicateNode = useWorkflowStore((s: WorkflowState) => s.duplicateNode);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Node options"
          className="grid h-7 w-7 place-items-center rounded-md text-foreground/60 hover:bg-muted/40"
        >
          <Ellipsis className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => duplicateNode(nodeId)}>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate
          <span className="ml-auto text-xs text-muted-foreground">ctrl+d</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onOpenRename}>
          <Pencil className="mr-2 h-4 w-4" />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onToggleLock}>
          {isLocked ? (
            <>
              <LockOpen className="mr-2 h-4 w-4" />
              Unlock
            </>
          ) : (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Lock
            </>
          )}
        </DropdownMenuItem>
        {additionalItems && (
          <>
            <DropdownMenuSeparator />
            {additionalItems}
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => deleteNode(nodeId)}
          className="text-red-400 focus:text-red-400"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
          <span className="ml-auto text-xs text-muted-foreground">delete / backspace</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
