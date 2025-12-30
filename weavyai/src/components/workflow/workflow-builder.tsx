'use client';

import * as React from 'react';
import {
  Background,
  BackgroundVariant,
  MiniMap,
  Panel,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  useOnViewportChange,
  type NodeTypes,
  type Viewport,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { PiShareLight } from 'react-icons/pi';
import { TbAsterisk } from 'react-icons/tb';

import {
  IconChevronDown,
  ToolbarIconAssets,
  ToolbarIconDiscord,
  ToolbarIconHelp,
  ToolbarIconSearch,
  ToolbarIconSort,
} from '@/components/icons/workflow-icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import {
  Check,
  ChevronDown,
  Hand,
  ImageIcon,
  Loader2,
  MousePointer2,
  Redo2,
  Sparkles,
  Type,
  Undo2,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { workflowNodeTypes, TextNode, ImageNode, LLMNode } from './nodes';
import { useWorkflowStore, selectCanUndo, selectCanRedo } from '@/stores/workflowStore';
import { simpleTestWorkflow, productListingWorkflow } from '@/lib/sampleWorkflows';
import type { WorkflowNode, WorkflowEdge, RunTask } from '@/types/workflow.types';
import Link from 'next/link';

// ============================================================================
// Quick Access Node Button
// ============================================================================

function QuickAccessNodeButton({
  title,
  icon,
  nodeType,
  onAdd,
}: {
  title: string;
  icon: React.ReactNode;
  nodeType: 'text' | 'image' | 'llm';
  onAdd: (type: 'text' | 'image' | 'llm') => void;
}) {
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
        'flex h-24 flex-col items-center justify-center gap-2 rounded-lg border border-border/60',
        'bg-card/40 text-foreground/90 hover:bg-purple-500/10 hover:border-purple-500/50',
        'transition-all cursor-grab active:cursor-grabbing'
      )}
    >
      <span className="text-foreground/80">{icon}</span>
      <span className="text-[13px] font-medium">{title}</span>
    </button>
  );
}

// ============================================================================
// Bottom Toolbar
// ============================================================================

// ============================================================================
// Task Manager Panel
// ============================================================================

function TaskManagerPanel({ onClose }: { onClose: () => void }) {
  const runTasks = useWorkflowStore((s) => s.runTasks);
  const clearAllTasks = useWorkflowStore((s) => s.clearAllTasks);

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Sort tasks: running first, then by start time (newest first)
  const sortedTasks = [...runTasks].sort((a, b) => {
    if (a.status === 'running' && b.status !== 'running') return -1;
    if (a.status !== 'running' && b.status === 'running') return 1;
    return new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime();
  });

  return (
    <div className="w-[340px] rounded-lg border border-border/60 bg-card/95 backdrop-blur shadow-lg">
      <div className="flex items-center justify-between p-3">
        <div className="text-[16px] font-medium text-foreground">
          Task manager
        </div>
        <div className="flex items-center gap-2">
          {runTasks.length > 0 && (
            <button
              type="button"
              onClick={clearAllTasks}
              className="text-sm text-foreground/60 hover:text-foreground transition-colors"
            >
              Clear all
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close task manager"
            className="grid h-8 w-8 place-items-center rounded-md text-foreground/70 hover:bg-muted/30"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="h-px w-full bg-border/60" />
      
      {runTasks.length === 0 ? (
        <div className="py-4 px-3 text-[13px] text-foreground/60">
          No active runs
        </div>
      ) : (
        <div className="max-h-[300px] overflow-y-auto">
          {sortedTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 px-3 py-3 border-b border-border/30 last:border-b-0"
            >
              {/* Status icon */}
              <div className="flex-shrink-0">
                {task.status === 'running' ? (
                  <Loader2 className="h-5 w-5 text-purple-400 animate-spin" />
                ) : task.status === 'completed' ? (
                  <div className="h-5 w-5 rounded-full border-2 border-foreground/60 flex items-center justify-center">
                    <Check className="h-3 w-3 text-foreground/60" />
                  </div>
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-red-400 flex items-center justify-center">
                    <X className="h-3 w-3 text-red-400" />
                  </div>
                )}
              </div>

              {/* Task info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground truncate">
                    {formatTime(task.startedAt)}
                  </span>
                  <span className="text-sm text-foreground/60">
                    {task.progress}
                  </span>
                </div>
                {task.error && (
                  <div className="text-xs text-red-400 truncate mt-0.5">
                    {task.error}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================

interface BottomToolbarProps {
  toolMode: 'select' | 'pan';
  setToolMode: (mode: 'select' | 'pan') => void;
}

function BottomToolbar({ toolMode, setToolMode }: BottomToolbarProps) {
  const rf = useReactFlow();
  const [zoomPct, setZoomPct] = React.useState(55);
  const undo = useWorkflowStore((s) => s.undo);
  const redo = useWorkflowStore((s) => s.redo);
  const canUndo = useWorkflowStore(selectCanUndo);
  const canRedo = useWorkflowStore(selectCanRedo);

  // Subscribe to viewport changes to update zoom percentage when zooming with mouse wheel
  useOnViewportChange({
    onChange: React.useCallback((viewport: Viewport) => {
      setZoomPct(Math.round(viewport.zoom * 100));
    }, []),
  });

  React.useEffect(() => {
    rf.setViewport({ x: 100, y: 50, zoom: 0.55 }, { duration: 0 });
    setZoomPct(55);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const zoomIn = () => {
    const currentZoom = rf.getZoom();
    const newZoom = Math.min(currentZoom * 1.2, 2);
    rf.zoomTo(newZoom, { duration: 150 });
  };

  const zoomOut = () => {
    const currentZoom = rf.getZoom();
    const newZoom = Math.max(currentZoom / 1.2, 0.1);
    rf.zoomTo(newZoom, { duration: 150 });
  };

  const zoomTo100 = () => {
    rf.zoomTo(1, { duration: 150 });
  };

  const zoomToFit = () => {
    rf.fitView({ padding: 0.2, duration: 300 });
  };

  // Keyboard shortcuts for zoom
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey)) {
        if (e.key === '+' || e.key === '=') {
          e.preventDefault();
          zoomIn();
        } else if (e.key === '-') {
          e.preventDefault();
          zoomOut();
        } else if (e.key === '0') {
          e.preventDefault();
          zoomTo100();
        } else if (e.key === '1') {
          e.preventDefault();
          zoomToFit();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2">
      <div className="pointer-events-auto flex items-center gap-1 rounded-lg border border-border/60 bg-card/80 backdrop-blur px-2 py-2 shadow-lg">
        {/* Select tool */}
        <button
          type="button"
          aria-label="Select"
          onClick={() => setToolMode('select')}
          className={cn(
            'grid h-9 w-9 place-items-center rounded-lg transition-colors',
            toolMode === 'select' 
              ? 'bg-[#E8FF5A] text-black' 
              : 'text-foreground/80 hover:bg-muted/40'
          )}
        >
          <MousePointer2 className="h-4 w-4" />
        </button>

        {/* Pan tool */}
        <button
          type="button"
          aria-label="Pan"
          onClick={() => setToolMode('pan')}
          className={cn(
            'grid h-9 w-9 place-items-center rounded-lg transition-colors',
            toolMode === 'pan' 
              ? 'bg-[#E8FF5A] text-black' 
              : 'text-foreground/80 hover:bg-muted/40'
          )}
        >
          <Hand className="h-4 w-4" />
        </button>

        <div className="mx-1 h-6 w-px bg-border/60" />

        {/* Undo */}
        <button
          type="button"
          aria-label="Undo"
          disabled={!canUndo}
          onClick={undo}
          className={cn(
            'grid h-9 w-9 place-items-center rounded-lg hover:bg-muted/40',
            canUndo ? 'text-foreground/80' : 'text-foreground/30 cursor-not-allowed'
          )}
        >
          <Undo2 className="h-4 w-4" />
        </button>
        
        {/* Redo */}
        <button
          type="button"
          aria-label="Redo"
          disabled={!canRedo}
          onClick={redo}
          className={cn(
            'grid h-9 w-9 place-items-center rounded-lg hover:bg-muted/40',
            canRedo ? 'text-foreground/80' : 'text-foreground/30 cursor-not-allowed'
          )}
        >
          <Redo2 className="h-4 w-4" />
        </button>

        <div className="mx-1 h-6 w-px bg-border/60" />

        {/* Zoom dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-1 h-9 rounded-lg px-3 text-[13px] font-medium text-foreground/80 hover:bg-muted/40"
            >
              {zoomPct}%
              <ChevronDown className="h-3 w-3 ml-1" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-48">
            <DropdownMenuItem onClick={zoomIn} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ZoomIn className="h-4 w-4" />
                Zoom in
              </div>
              <span className="text-xs text-muted-foreground">Ctrl +</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={zoomOut} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ZoomOut className="h-4 w-4" />
                Zoom out
              </div>
              <span className="text-xs text-muted-foreground">Ctrl -</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={zoomTo100} className="flex items-center justify-between">
              <span>Zoom to 100%</span>
              <span className="text-xs text-muted-foreground">Ctrl 0</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={zoomToFit} className="flex items-center justify-between">
              <span>Zoom to fit</span>
              <span className="text-xs text-muted-foreground">Ctrl 1</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

// ============================================================================
// Main Builder Component
// ============================================================================

function BuilderInner() {
  const reactFlowWrapper = React.useRef<HTMLDivElement>(null);
  const rf = useReactFlow();

  // Store state and actions
  const nodes = useWorkflowStore((s) => s.nodes);
  const edges = useWorkflowStore((s) => s.edges);
  const onNodesChange = useWorkflowStore((s) => s.onNodesChange);
  const onEdgesChange = useWorkflowStore((s) => s.onEdgesChange);
  const onConnect = useWorkflowStore((s) => s.onConnect);
  const addNode = useWorkflowStore((s) => s.addNode);
  const deleteSelectedNodes = useWorkflowStore((s) => s.deleteSelectedNodes);
  const workflowName = useWorkflowStore((s) => s.workflowName);
  const setWorkflowName = useWorkflowStore((s) => s.setWorkflowName);
  const isSaving = useWorkflowStore((s) => s.isSaving);
  const isDirty = useWorkflowStore((s) => s.isDirty);

  const [leftPanelOpen, setLeftPanelOpen] = React.useState(true);
  const [taskManagerOpen, setTaskManagerOpen] = React.useState(false);
  const [toolMode, setToolMode] = React.useState<'select' | 'pan'>('select');
  
  // Editable workflow name state
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [editedName, setEditedName] = React.useState(workflowName);
  const nameInputRef = React.useRef<HTMLInputElement>(null);

  // Search state
  const [searchQuery, setSearchQuery] = React.useState('');

  // Node types for filtering
  const nodeTypes = [
    { title: 'Text', nodeType: 'text' as const, icon: <Type className="h-6 w-6" /> },
    { title: 'Image', nodeType: 'image' as const, icon: <ImageIcon className="h-6 w-6" /> },
    { title: 'Run Any LLM', nodeType: 'llm' as const, icon: <Sparkles className="h-6 w-6" /> },
  ];

  // Filter nodes based on search query
  const filteredNodeTypes = nodeTypes.filter((node) =>
    node.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sync browser tab title with workflow name
  React.useEffect(() => {
    document.title = workflowName || 'untitled';
  }, [workflowName]);

  // Focus input when editing starts
  React.useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [isEditingName]);

  const handleNameSubmit = () => {
    if (editedName.trim()) {
      setWorkflowName(editedName.trim());
    } else {
      setEditedName(workflowName); // Reset to current name if empty
    }
    setIsEditingName(false);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    } else if (e.key === 'Escape') {
      setEditedName(workflowName);
      setIsEditingName(false);
    }
  };

  // Add node at center of viewport
  const handleAddNode = React.useCallback(
    (type: 'text' | 'image' | 'llm') => {
      const viewport = rf.getViewport();
      const centerX = (-viewport.x + 400) / viewport.zoom;
      const centerY = (-viewport.y + 300) / viewport.zoom;
      addNode(type, { x: centerX, y: centerY });
    },
    [rf, addNode]
  );

  // Drag and drop handler
  const onDrop = React.useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as
        | 'text'
        | 'image'
        | 'llm';
      if (!type) return;

      const position = rf.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addNode(type, position);
    },
    [rf, addNode]
  );

  const onDragOver = React.useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Load sample workflow
  const createAndSaveWorkflow = useWorkflowStore((s) => s.createAndSaveWorkflow);
  const handleLoadSample = React.useCallback(
    async (sample: 'simple' | 'product') => {
      const workflow = sample === 'simple' ? simpleTestWorkflow : productListingWorkflow;
      
      // Create workflow in backend and set local state
      const newId = await createAndSaveWorkflow(
        workflow.name,
        workflow.nodes as WorkflowNode[],
        workflow.edges as WorkflowEdge[]
      );

      if (newId) {
        // Update URL to reflect new workflow ID
        window.history.replaceState(null, '', `/dashboard/workflow/${newId}`);
      }

      // Fit view after loading
      setTimeout(() => {
        rf.fitView({ padding: 0.2, duration: 300 });
      }, 100);
    },
    [rf, createAndSaveWorkflow]
  );

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Delete/Backspace to delete selected nodes
      if ((e.key === 'Delete' || e.key === 'Backspace') && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        deleteSelectedNodes();
      }

      // Ctrl+Z for undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        useWorkflowStore.getState().undo();
      }

      // Ctrl+Shift+Z or Ctrl+Y for redo
      if (((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) || ((e.ctrlKey || e.metaKey) && e.key === 'y')) {
        e.preventDefault();
        useWorkflowStore.getState().redo();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [deleteSelectedNodes]);

  return (
    <div className="relative h-dvh w-screen overflow-hidden bg-background">
      {/* Canvas */}
      <div ref={reactFlowWrapper} className="absolute inset-0">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={workflowNodeTypes as NodeTypes}
          fitView={false}
          panOnScroll
          zoomOnScroll
          zoomOnDoubleClick={false}
          // Tool mode controls:
          // Select mode: can move/select nodes, cannot pan by dragging
          // Pan mode: can pan by dragging, cannot move/select nodes
          panOnDrag={toolMode === 'pan'}
          nodesDraggable={toolMode === 'select'}
          nodesConnectable={toolMode === 'select'}
          elementsSelectable={toolMode === 'select'}
          selectionOnDrag={toolMode === 'select'}
          proOptions={{ hideAttribution: true }}
          defaultEdgeOptions={{
            animated: true,
            style: { stroke: '#8B5CF6', strokeWidth: 2 },
          }}
          connectionLineStyle={{ stroke: '#8B5CF6', strokeWidth: 2 }}
        >
          {/* Task manager panel */}
          {taskManagerOpen && (
            <Panel
              position="top-right"
              className="pointer-events-auto"
              style={{ margin: 24, transform: 'translateX(-276px)' }}
            >
              <TaskManagerPanel onClose={() => setTaskManagerOpen(false)} />
            </Panel>
          )}

          {/* Top-right credits and share */}
          <Panel
            position="top-right"
            className="pointer-events-auto"
            style={{ margin: 24 }}
          >
            <div className="w-[260px] rounded-lg border border-border/60 bg-card/80 backdrop-blur p-3 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="text-[14px] flex items-center gap-1 font-medium text-foreground">
                  <TbAsterisk className="text-[16px]" />
                  <p>149 credits</p>
                </div>
                <Button
                  size="sm"
                  className="h-8 rounded-md bg-[#faffc7] text-black hover:bg-[#f0f5a0] px-4"
                >
                  <PiShareLight className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>

              {/* Save status indicator */}
              <div className="mt-2 flex items-center gap-2 text-sm">
                {isSaving ? (
                  <span className="flex items-center gap-1 text-foreground/60">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Saving...
                  </span>
                ) : !isDirty ? (
                  <span className="flex items-center gap-1 text-green-500/80">
                    <Check className="h-3 w-3" />
                    Saved
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-foreground/50">
                    <span className="h-2 w-2 rounded-full bg-yellow-500" />
                    Unsaved
                  </span>
                )}
              </div>

              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => setTaskManagerOpen((v) => !v)}
                  className="flex items-center gap-2 text-[14px] font-medium text-foreground/90 hover:text-foreground hover:bg-muted/30 px-2 py-1 rounded-md"
                  aria-expanded={taskManagerOpen}
                >
                  Tasks
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Panel>

          {/* Left toolbar (icon strip) */}
          <Panel
            position="top-left"
            data-testid="left_tool_menu"
            style={{
              height: '100%',
              width: 56,
              left: 0,
              top: 0,
              margin: 0,
              pointerEvents: 'all',
            }}
          >
            <div
              id="main-toolbar-container"
              className="flex h-full flex-col border-r border-border bg-card"
            >
              <Link href={"/dashboard"} className="flex items-center justify-center gap-2 px-3 py-3 cursor-pointer">
                <img
                  src="https://app.weavy.ai/icons/logo.svg"
                  alt="Logo"
                  width="20"
                  className="invert"
                />
                <IconChevronDown className="text-foreground/70" />
              </Link>

              <div className="flex flex-1 flex-col items-center gap-2 px-2 pt-2">
                <button
                  type="button"
                  aria-label="Search"
                  onClick={() => setLeftPanelOpen((v) => !v)}
                  className={cn(
                    'grid h-11 w-11 place-items-center rounded-md transition-colors',
                    'text-foreground/70 hover:bg-muted/30 hover:text-foreground',
                    leftPanelOpen && 'bg-accent text-accent-foreground'
                  )}
                >
                  <ToolbarIconSearch />
                </button>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 px-2 py-3">
                <button
                  type="button"
                  aria-label="Assets"
                  className="grid h-10 w-10 place-items-center rounded-md text-foreground/70 hover:bg-muted/30"
                >
                  <ToolbarIconAssets />
                </button>
                <button
                  type="button"
                  aria-label="Help"
                  className="grid h-10 w-10 place-items-center rounded-md text-foreground/70 hover:bg-muted/30"
                >
                  <ToolbarIconHelp />
                </button>
                <button
                  type="button"
                  aria-label="Discord"
                  className="grid h-10 w-10 place-items-center rounded-md text-foreground/70 hover:bg-muted/30"
                >
                  <ToolbarIconDiscord />
                </button>
              </div>
            </div>
          </Panel>

          {/* Workflow name - visible when sidebar is closed */}
          {!leftPanelOpen && (
            <div
              className="pointer-events-auto absolute z-20"
              style={{ left: 72, top: 12 }}
            >
              {isEditingName ? (
                <input
                  autoFocus
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  onBlur={handleNameSubmit}
                  onKeyDown={handleNameKeyDown}
                  className="text-[18px] font-medium text-foreground bg-muted/60 rounded-md px-4 py-2 outline-none border border-purple-500 min-w-[200px]"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setEditedName(workflowName);
                    setIsEditingName(true);
                  }}
                  className="text-[18px] z-20 font-medium text-foreground hover:text-foreground/80 truncate text-left transition-colors bg-muted/60 rounded-md px-4 py-2 border border-border min-w-[200px]"
                  title="Click to rename"
                >
                  {workflowName}
                </button>
              )}
            </div>
          )}

          {/* Left slide-out panel */}
          <Panel
            position="top-left"
            className={cn(leftPanelOpen ? 'slide-left-enter' : 'slide-left-exit')}
            data-testid="left-panel-panel"
            style={{
              height: '100%',
              width: leftPanelOpen ? 260 : 0,
              top: 0,
              left: 56,
              margin: 0,
              opacity: leftPanelOpen ? 1 : 0,
              transition: 'width 0.15s, opacity 0.2s ease-in-out',
              pointerEvents: leftPanelOpen ? 'all' : 'none',
              overflow: 'hidden',
            }}
          >
            <div className="flex h-full w-full flex-col border-r border-border bg-card">
              {/* Editable Workflow title */}
              <div className="flex items-center border-b border-border px-4 py-4">
                {isEditingName ? (
                  <input
                    ref={nameInputRef}
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onBlur={handleNameSubmit}
                    onKeyDown={handleNameKeyDown}
                    className="w-full text-[18px] font-medium text-foreground bg-muted/40 rounded-md px-4 py-2 outline-none border border-border"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setEditedName(workflowName);
                      setIsEditingName(true);
                    }}
                    className="text-[18px] font-medium text-foreground hover:text-foreground/80 truncate text-left transition-colors"
                    title="Click to rename"
                  >
                    {workflowName}
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="border-b border-border px-4 py-3">
                <div className="flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-3">
                  <ToolbarIconSearch />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                    className="h-full w-full bg-transparent text-sm outline-none placeholder:text-foreground/50"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-foreground/50 hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Access - Node Buttons */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="text-[15px] font-medium text-foreground mb-3">
                  {searchQuery ? 'Search Results' : 'Quick access'}
                </div>
                {filteredNodeTypes.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {filteredNodeTypes.map((node) => (
                      <QuickAccessNodeButton
                        key={node.nodeType}
                        title={node.title}
                        icon={node.icon}
                        nodeType={node.nodeType}
                        onAdd={handleAddNode}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-foreground/50 py-4">
                    No nodes found for "{searchQuery}"
                  </div>
                )}

                <div className="mt-6 text-xs text-foreground/50">
                  Drag nodes to the canvas or click to add at center
                </div>

                {/* Sample Workflows Section */}
                <div className="mt-8 border-t border-border/60 pt-6">
                  <div className="text-[15px] font-medium text-foreground mb-3">
                    Sample Workflows
                  </div>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleLoadSample('simple')}
                      className="w-full justify-start text-left"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Simple LLM Test
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleLoadSample('product')}
                      className="w-full justify-start text-left"
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Product Listing Generator
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Panel>

          {/* MiniMap */}
          <MiniMap
            position="bottom-right"
            style={{ marginRight: 16, marginBottom: 80 }}
            nodeColor="#8B5CF6"
            maskColor="rgba(0, 0, 0, 0.7)"
            pannable
            zoomable
          />

          <Background
            variant={BackgroundVariant.Dots}
            gap={24}
            size={1.2}
            color="hsl(var(--muted-foreground))"
          />
        </ReactFlow>

        <BottomToolbar toolMode={toolMode} setToolMode={setToolMode} />
      </div>
    </div>
  );
}

// ============================================================================
// Export
// ============================================================================

interface WorkflowBuilderProps {
  workflowId?: string;
}

export function WorkflowBuilder({ workflowId }: WorkflowBuilderProps) {
  const loadWorkflow = useWorkflowStore((s) => s.loadWorkflow);
  const saveWorkflow = useWorkflowStore((s) => s.saveWorkflow);
  const isDirty = useWorkflowStore((s) => s.isDirty);
  const isLoading = useWorkflowStore((s) => s.isLoading);

  // Load workflow on mount
  React.useEffect(() => {
    if (workflowId && workflowId !== 'new') {
      loadWorkflow(workflowId);
    }
  }, [workflowId, loadWorkflow]);

  // Autosave effect - debounced save when isDirty changes
  React.useEffect(() => {
    if (!isDirty || !workflowId || workflowId === 'new') return;

    const timeoutId = setTimeout(() => {
      saveWorkflow();
    }, 2000); // 2 second debounce

    return () => clearTimeout(timeoutId);
  }, [isDirty, workflowId, saveWorkflow]);

  if (isLoading) {
    return (
      <div className="dark h-screen w-screen flex items-center justify-center bg-background">
        <div className="text-foreground/60">Loading workflow...</div>
      </div>
    );
  }

  return (
    <div className="dark">
      <ReactFlowProvider>
        <BuilderInner />
      </ReactFlowProvider>
    </div>
  );
}
