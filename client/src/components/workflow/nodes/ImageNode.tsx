'use client';

import * as React from 'react';
import { Position, type NodeProps } from '@xyflow/react';
import { cn } from '@/lib/utils';
import { useWorkflowStore, type WorkflowState } from '@/stores/workflowStore';
import { type ImageFlowNode } from '@/types/workflow.types';
import type { ImageItem } from '@/types/workflow.types';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  ImageIcon,
  Lock,
  Plus,
  Upload,
  X,
} from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

import {
  NodeShell,
  HandleWithLabel,
  RenameDialog,
  NodeDropdownMenu,
} from '../primitives';

/**
 * ImageNode Component
 * 
 * A node for uploading and displaying images.
 * Features:
 * - Multiple image upload support
 * - Carousel view (single) or grid view (all)
 * - Drag & drop upload
 * - Output handle for sending image data
 */
export function ImageNode({ id, data, selected }: NodeProps<ImageFlowNode>) {
  const updateNodeData = useWorkflowStore((s: WorkflowState) => s.updateNodeData);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [renameDialogOpen, setRenameDialogOpen] = React.useState(false);
  const [newLabel, setNewLabel] = React.useState(data.label || 'Image');

  const displayLabel = data.label || 'Image';
  const isLocked = data.isLocked || false;
  const images = data.images || [];
  const currentIndex = data.currentIndex || 0;
  const viewMode = data.viewMode || 'single';

  const handleRename = () => {
    if (newLabel.trim()) {
      updateNodeData<ImageFlowNode>(id, { label: newLabel.trim() });
    }
    setRenameDialogOpen(false);
  };

  const toggleLock = () => {
    updateNodeData<ImageFlowNode>(id, { isLocked: !isLocked });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    addImages(Array.from(files));
  };

  const addImages = async (files: File[]) => {
    const newImages: ImageItem[] = [];

    for (const file of files) {
      if (!file.type.startsWith('image/')) continue;

      const result = await new Promise<ImageItem>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = event.target?.result as string;
          const base64Data = base64.split(',')[1];

          const img = new window.Image();
          img.onload = () => {
            resolve({
              imageUrl: base64,
              imageBase64: base64Data,
              fileName: file.name,
              width: img.width,
              height: img.height,
            });
          };
          img.src = base64;
        };
        reader.readAsDataURL(file);
      });
      newImages.push(result);
    }

    updateNodeData<ImageFlowNode>(id, {
      images: [...images, ...newImages],
      currentIndex: viewMode === 'single' ? images.length : currentIndex,
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    addImages(Array.from(files));
  };

  const goToImage = (index: number) => {
    if (index < 0 || index >= images.length) return;
    updateNodeData<ImageFlowNode>(id, { currentIndex: index });
  };

  const setViewMode = (mode: 'single' | 'all') => {
    updateNodeData<ImageFlowNode>(id, { viewMode: mode });
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    updateNodeData<ImageFlowNode>(id, {
      images: newImages,
      currentIndex: Math.min(currentIndex, Math.max(0, newImages.length - 1)),
    });
  };

  const currentImage = images[currentIndex];

  return (
    <div className="relative group/node">
      {/* Output Handle */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2" style={{ transform: 'translate(6px, -50%)' }}>
        <HandleWithLabel
          type="source"
          position={Position.Right}
          id="output"
          nodeId={id}
          label="output"
          color="green"
        />
      </div>

      <NodeShell
        title={displayLabel}
        icon={<ImageIcon className="h-4 w-4" />}
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
              additionalItems={
                <>
                  <div className="px-2 py-1.5 text-xs text-muted-foreground">View</div>
                  <DropdownMenuItem onClick={() => setViewMode('single')}>
                    Single
                    {viewMode === 'single' && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setViewMode('all')}>
                    All
                    {viewMode === 'all' && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuItem>
                </>
              }
            />
          </div>
        }
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        {images.length === 0 ? (
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
        ) : viewMode === 'single' && currentImage ? (
          <div className="space-y-3">
            <div className="relative rounded-lg overflow-hidden bg-muted/40 group">
              <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-1 bg-black/50 rounded-md px-2 py-1">
                  <button
                    type="button"
                    onClick={() => goToImage(currentIndex - 1)}
                    disabled={currentIndex === 0}
                    className="p-0.5 text-white/80 hover:text-white disabled:opacity-30"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-white text-xs px-1">
                    {currentIndex + 1} / {images.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => goToImage(currentIndex + 1)}
                    disabled={currentIndex === images.length - 1}
                    className="p-0.5 text-white/80 hover:text-white disabled:opacity-30"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = currentImage.imageUrl;
                    link.download = currentImage.fileName || 'image.png';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="p-1 bg-black/50 rounded-md text-white/80 hover:text-white"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>

              <img
                src={currentImage.imageUrl}
                alt={currentImage.fileName}
                className="w-full object-contain max-h-[250px]"
              />

              <div className="absolute bottom-2 left-2 text-white/80 text-xs bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {currentImage.width}x{currentImage.height}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => {
                  updateNodeData<ImageFlowNode>(id, { currentIndex: index, viewMode: 'single' });
                }}
                className={cn(
                  'relative rounded-lg overflow-hidden cursor-pointer border-2 transition-colors group',
                  index === currentIndex ? 'border-purple-500' : 'border-transparent hover:border-purple-500/50'
                )}
              >
                <img
                  src={img.imageUrl}
                  alt={img.fileName}
                  className="w-full h-24 object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white/80 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="nodrag w-full mt-3 flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add more images
        </button>
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
