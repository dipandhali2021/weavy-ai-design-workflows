'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Copy, ExternalLink, FolderInput, Pencil, Trash2 } from 'lucide-react';
import type { FileCardProps } from '../types';
import { formatTimeAgo } from '../utils';

/**
 * FileCard Component
 * 
 * A card displaying a workflow file with context menu actions
 */
export function FileCard({
  workflow,
  onRename,
  onDelete,
  onDuplicate,
  onMove,
}: FileCardProps) {
  const router = useRouter();
  const [renameDialogOpen, setRenameDialogOpen] = React.useState(false);
  const [newName, setNewName] = React.useState(workflow.name);

  const handleOpen = () => {
    router.push(`/dashboard/workflow/${workflow.id}`);
  };

  const handleOpenNewTab = () => {
    window.open(`/dashboard/workflow/${workflow.id}`, '_blank');
  };

  const handleRename = () => {
    if (newName.trim() && newName !== workflow.name) {
      onRename(workflow.id, newName.trim());
    }
    setRenameDialogOpen(false);
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="space-y-2 cursor-pointer" draggable>
            <button
              type="button"
              onClick={handleOpen}
              className="block w-full overflow-hidden rounded-md border border-border bg-card shadow-xs hover:border-foreground/30 transition-colors"
            >
              <div className="h-[220px] w-full bg-background/40">
                <img
                  src={workflow.thumbnail || 'https://app.weavy.ai/workflow-default-cover.png'}
                  alt="workflow cover"
                  className="h-full w-full object-cover invert"
                />
              </div>
            </button>

            <div>
              <div className="text-[16px] font-medium text-foreground">
                {workflow.name}
              </div>
              <div className="text-[14px] text-muted-foreground">
                Last edited {formatTimeAgo(workflow.updatedAt)}
              </div>
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48 bg-card border-border">
          <ContextMenuItem onClick={handleOpen} className="cursor-pointer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Open
          </ContextMenuItem>
          <ContextMenuItem onClick={handleOpenNewTab} className="cursor-pointer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Open in a new tab
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={() => onDuplicate(workflow.id)} className="cursor-pointer">
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </ContextMenuItem>
          <ContextMenuItem onClick={() => onMove(workflow)} className="cursor-pointer">
            <FolderInput className="mr-2 h-4 w-4" />
            Move
          </ContextMenuItem>
          <ContextMenuItem onClick={() => {
            setNewName(workflow.name);
            setRenameDialogOpen(true);
          }} className="cursor-pointer">
            <Pencil className="mr-2 h-4 w-4" />
            Rename
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            onClick={() => onDelete(workflow.id)}
            className="cursor-pointer text-red-500 focus:text-red-500"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent className="sm:max-w-[400px] bg-card border-border">
          <DialogHeader>
            <DialogTitle>Rename workflow</DialogTitle>
            <DialogDescription>
              Enter a new name for your workflow.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Workflow name"
              className="w-full"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRename();
              }}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRename} className="bg-[#faffc7] text-black hover:bg-[#f4f8cd]">
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
