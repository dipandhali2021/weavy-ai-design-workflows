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
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Ellipsis,
  ImageIcon,
  Loader2,
  Lock,
  LockOpen,
  Pencil,
  Play,
  Plus,
  Trash2,
  Type,
  Upload,
  X,
  Check,
  Sparkles,
} from 'lucide-react';
import type { ImageItem } from '@/types/workflow.types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

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
  color = 'magenta',
}: {
  label: string;
  position: 'left' | 'right';
  className?: string;
  color?: 'magenta' | 'green' | 'cyan';
}) {
  const colorClasses = {
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

// Handle colors
const handleColors = {
  magenta: '#E879F9',
  green: '#10B981',
  cyan: '#22D3EE',
};

// Get handle style based on color and connection state
const getHandleStyle = (color: 'magenta' | 'green' | 'cyan', isConnected: boolean): React.CSSProperties => {
  const colorValue = handleColors[color];
  return {
    width: 18,
    height: 18,
    border: `3px solid ${colorValue}`,
    backgroundColor: isConnected ? colorValue : 'transparent',
    boxShadow: isConnected 
      ? `inset 0 0 0 3px hsl(var(--background))` 
      : 'none',
  };
};

// Handle wrapper component for consistent styling with connection detection
function HandleWithLabel({
  type,
  position,
  id,
  nodeId,
  label,
  color = 'magenta',
  style,
}: {
  type: 'source' | 'target';
  position: Position;
  id: string;
  nodeId: string;
  label: string;
  color?: 'magenta' | 'green' | 'cyan';
  style?: React.CSSProperties;
}) {
  // Check if this handle is connected
  const edges = useWorkflowStore((s) => s.edges);
  const isConnected = edges.some((edge) => {
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

// ============================================================================
// Text Node
// ============================================================================

export function TextNode({ id, data, selected }: NodeProps<TextFlowNode>) {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const deleteNode = useWorkflowStore((s) => s.deleteNode);
  const duplicateNode = useWorkflowStore((s) => s.duplicateNode);
  
  const [renameDialogOpen, setRenameDialogOpen] = React.useState(false);
  const [newLabel, setNewLabel] = React.useState(data.label || 'Text');

  const displayLabel = data.label || 'Text';
  const isLocked = data.isLocked || false;

  const handleRename = () => {
    if (newLabel.trim()) {
      updateNodeData<TextFlowNode>(id, { label: newLabel.trim() });
    }
    setRenameDialogOpen(false);
  };

  const toggleLock = () => {
    updateNodeData<TextFlowNode>(id, { isLocked: !isLocked });
  };

  return (
    <div className="relative group/node">
      {/* Input Handle (Left side - to receive data from LLM output) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2" style={{ transform: 'translate(-6px, -50%)' }}>
        <HandleWithLabel
          type="target"
          position={Position.Left}
          id="input"
          nodeId={id}
          label="input"
          color="magenta"
        />
      </div>

      {/* Output Handle (Right side) */}
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
        icon={<Type className="h-4 w-4" />}
        selected={selected}
        className="w-[360px]"
        right={
          <div className="flex items-center gap-1">
            {isLocked && (
              <Lock className="h-4 w-4 text-foreground/50" />
            )}
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
                <DropdownMenuItem onClick={() => duplicateNode(id)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                  <span className="ml-auto text-xs text-muted-foreground">ctrl+d</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  setNewLabel(displayLabel);
                  setRenameDialogOpen(true);
                }}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleLock}>
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
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => deleteNode(id)}
                  className="text-red-400 focus:text-red-400"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                  <span className="ml-auto text-xs text-muted-foreground">delete / backspace</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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

      {/* Rename Dialog */}
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rename Node</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Enter node name..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRename();
              }}
              className="nodrag"
              autoFocus
            />
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setRenameDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleRename} className="bg-[#E8FF5A] text-black hover:bg-[#d4eb52]">
                Rename
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ============================================================================
// Image Node (Multi-Image Support)
// ============================================================================

export function ImageNode({ id, data, selected }: NodeProps<ImageFlowNode>) {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const deleteNode = useWorkflowStore((s) => s.deleteNode);
  const duplicateNode = useWorkflowStore((s) => s.duplicateNode);
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

  // Handle file selection - supports multiple files
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
          
          // Get image dimensions
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
            {isLocked && (
              <Lock className="h-4 w-4 text-foreground/50" />
            )}
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
                <DropdownMenuItem onClick={() => duplicateNode(id)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                  <span className="ml-auto text-xs text-muted-foreground">ctrl+d</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  setNewLabel(displayLabel);
                  setRenameDialogOpen(true);
                }}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleLock}>
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
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => deleteNode(id)}
                  className="text-red-400 focus:text-red-400"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                  <span className="ml-auto text-xs text-muted-foreground">delete / backspace</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5 text-xs text-muted-foreground">View</div>
                <DropdownMenuItem onClick={() => setViewMode('single')}>
                  Single
                  {viewMode === 'single' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setViewMode('all')}>
                  All
                  {viewMode === 'all' && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
          // Empty state - upload prompt
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
          // Single view mode - carousel
          <div className="space-y-3">
            <div className="relative rounded-lg overflow-hidden bg-muted/40 group">
              {/* Image navigation header - only visible on hover */}
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
                    // Download the image
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
              
              {/* Current image */}
              <img
                src={currentImage.imageUrl}
                alt={currentImage.fileName}
                className="w-full object-contain max-h-[250px]"
              />
              
              {/* Image dimensions - only visible on hover */}
              <div className="absolute bottom-2 left-2 text-white/80 text-xs bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {currentImage.width}x{currentImage.height}
              </div>
            </div>
          </div>
        ) : (
          // All view mode - grid
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

        {/* Add more images button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="nodrag w-full mt-3 flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add more images
        </button>
      </NodeShell>

      {/* Rename Dialog */}
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rename Node</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Enter node name..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRename();
              }}
              className="nodrag"
              autoFocus
            />
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setRenameDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleRename} className="bg-[#E8FF5A] text-black hover:bg-[#d4eb52]">
                Rename
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ============================================================================
// LLM Node (Run Any LLM)
// ============================================================================

export function LLMNode({ id, data, selected }: NodeProps<LLMFlowNode>) {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const deleteNode = useWorkflowStore((s) => s.deleteNode);
  const duplicateNode = useWorkflowStore((s) => s.duplicateNode);
  const getConnectedInputs = useWorkflowStore((s) => s.getConnectedInputs);
  const propagateOutput = useWorkflowStore((s) => s.propagateOutput);
  const addTask = useWorkflowStore((s) => s.addTask);
  const updateTask = useWorkflowStore((s) => s.updateTask);

  const [renameDialogOpen, setRenameDialogOpen] = React.useState(false);
  const [newLabel, setNewLabel] = React.useState(data.label || 'Run Any LLM');

  const displayLabel = data.label || 'Run Any LLM';
  const isLocked = data.isLocked || false;

  const handleRename = () => {
    if (newLabel.trim()) {
      updateNodeData<LLMFlowNode>(id, { label: newLabel.trim() });
    }
    setRenameDialogOpen(false);
  };

  const toggleLock = () => {
    updateNodeData<LLMFlowNode>(id, { isLocked: !isLocked });
  };

  const handleRun = async () => {
    updateNodeData<LLMFlowNode>(id, { isLoading: true, error: undefined });

    // Add task to task manager
    const taskId = addTask(id, displayLabel);

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

      // Update task to completed
      updateTask(taskId, { status: 'completed', completedAt: new Date() });

      // Propagate output to connected downstream Text nodes
      propagateOutput(id, result.output);

    } catch (error) {
      updateNodeData<LLMFlowNode>(id, {
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      // Update task to failed
      updateTask(taskId, { 
        status: 'failed', 
        completedAt: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  return (
    <div className="relative group/node">
      {/* Input Handles (Left side) */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-center gap-8" style={{ transform: 'translateX(-6px)' }}>
        <HandleWithLabel
          type="target"
          position={Position.Left}
          id={LLM_HANDLES.SYSTEM_PROMPT}
          nodeId={id}
          label="system_prompt"
          color="magenta"
          style={{ position: 'relative', top: 0 }}
        />
        <HandleWithLabel
          type="target"
          position={Position.Left}
          id={LLM_HANDLES.USER_MESSAGE}
          nodeId={id}
          label="user_message"
          color="magenta"
          style={{ position: 'relative', top: 0 }}
        />
        <HandleWithLabel
          type="target"
          position={Position.Left}
          id={LLM_HANDLES.IMAGES}
          nodeId={id}
          label="images"
          color="cyan"
          style={{ position: 'relative', top: 0 }}
        />
      </div>

      {/* Output Handle (Right side) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2" style={{ transform: 'translate(6px, -50%)' }}>
        <HandleWithLabel
          type="source"
          position={Position.Right}
          id={LLM_HANDLES.OUTPUT}
          nodeId={id}
          label="output"
          color="green"
        />
      </div>

      <NodeShell
        title={displayLabel}
        icon={<Sparkles className="h-4 w-4" />}
        selected={selected}
        className="w-[360px]"
        right={
          <div className="flex items-center gap-1">
            {isLocked && (
              <Lock className="h-4 w-4 text-foreground/50" />
            )}
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
                <DropdownMenuItem onClick={() => duplicateNode(id)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                  <span className="ml-auto text-xs text-muted-foreground">ctrl+d</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  setNewLabel(displayLabel);
                  setRenameDialogOpen(true);
                }}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleLock}>
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
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => deleteNode(id)}
                  className="text-red-400 focus:text-red-400"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                  <span className="ml-auto text-xs text-muted-foreground">delete / backspace</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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

          {/* Error Display - only show errors, loading is shown in button */}
          {data.error && (
            <div
              className={cn(
                'rounded-lg p-3 text-sm',
                'bg-red-500/10 text-red-400 border border-red-500/30'
              )}
            >
              <div className="flex items-start gap-2">
                <X className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{data.error}</span>
              </div>
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

      {/* Rename Dialog */}
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rename Node</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Enter node name..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRename();
              }}
              className="nodrag"
              autoFocus
            />
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setRenameDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleRename} className="bg-[#E8FF5A] text-black hover:bg-[#d4eb52]">
                Rename
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
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
