'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import type { RenameDialogProps } from '../types';

/**
 * RenameDialog Component
 * 
 * Reusable dialog for renaming nodes.
 * 
 * @example
 * ```tsx
 * <RenameDialog
 *   open={renameDialogOpen}
 *   onOpenChange={setRenameDialogOpen}
 *   value={newLabel}
 *   onChange={setNewLabel}
 *   onSubmit={handleRename}
 * />
 * ```
 */
export function RenameDialog({
  open,
  onOpenChange,
  value,
  onChange,
  onSubmit,
}: RenameDialogProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename Node</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter node name..."
            onKeyDown={handleKeyDown}
            className="nodrag"
            autoFocus
          />
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              className="bg-[#E8FF5A] text-black hover:bg-[#d4eb52]"
            >
              Rename
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
