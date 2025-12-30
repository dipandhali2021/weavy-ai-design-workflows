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
  type NodeTypes,
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
import { cn } from '@/lib/utils';
import {
  ChevronDown,
  ImageIcon,
  MousePointer2,
  Redo2,
  Sparkles,
  Type,
  Undo2,
  X,
} from 'lucide-react';
import { workflowNodeTypes, TextNode, ImageNode, LLMNode } from './nodes';
import { useWorkflowStore, selectCanUndo, selectCanRedo } from '@/stores/workflowStore';
import { simpleTestWorkflow, productListingWorkflow } from '@/lib/sampleWorkflows';
import type { WorkflowNode, WorkflowEdge } from '@/types/workflow.types';

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

function BottomToolbar() {
  const rf = useReactFlow();
  const [zoomPct, setZoomPct] = React.useState(55);
  const undo = useWorkflowStore((s) => s.undo);
  const redo = useWorkflowStore((s) => s.redo);
  const canUndo = useWorkflowStore(selectCanUndo);
  const canRedo = useWorkflowStore(selectCanRedo);

  React.useEffect(() => {
    rf.setViewport({ x: 100, y: 50, zoom: 0.55 }, { duration: 0 });
    setZoomPct(55);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyZoomPct = (pct: number) => {
    const clamped = Math.max(10, Math.min(200, pct));
    const zoom = clamped / 100;
    const vp = rf.getViewport();
    rf.setViewport({ x: vp.x, y: vp.y, zoom }, { duration: 120 });
    setZoomPct(clamped);
  };

  return (
    <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2">
      <div className="pointer-events-auto flex items-center gap-2 rounded-lg border border-border/60 bg-card/80 backdrop-blur px-3 py-2 shadow-lg">
        <button
          type="button"
          aria-label="Select"
          className="grid h-9 w-9 place-items-center rounded-lg bg-muted/40 text-foreground hover:bg-muted/60"
        >
          <MousePointer2 className="h-4 w-4" />
        </button>

        <div className="mx-1 h-6 w-px bg-border/60" />

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

        <button
          type="button"
          aria-label="Zoom out"
          className="grid h-9 w-9 place-items-center rounded-lg text-foreground/80 hover:bg-muted/40"
          onClick={() => applyZoomPct(zoomPct - 10)}
        >
          −
        </button>
        <button
          type="button"
          className="h-9 rounded-lg px-3 text-[12px] font-medium text-foreground/80 hover:bg-muted/40"
          onClick={() => applyZoomPct(55)}
        >
          {zoomPct}%
        </button>
        <button
          type="button"
          aria-label="Zoom in"
          className="grid h-9 w-9 place-items-center rounded-lg text-foreground/80 hover:bg-muted/40"
          onClick={() => applyZoomPct(zoomPct + 10)}
        >
          +
        </button>
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

  const [leftPanelOpen, setLeftPanelOpen] = React.useState(true);
  const [taskManagerOpen, setTaskManagerOpen] = React.useState(false);

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
  const setWorkflow = useWorkflowStore((s) => s.setWorkflow);
  const handleLoadSample = React.useCallback(
    (sample: 'simple' | 'product') => {
      const workflow = sample === 'simple' ? simpleTestWorkflow : productListingWorkflow;
      setWorkflow(null, workflow.name, workflow.nodes as WorkflowNode[], workflow.edges as WorkflowEdge[]);
      // Fit view after loading
      setTimeout(() => {
        rf.fitView({ padding: 0.2, duration: 300 });
      }, 100);
    },
    [rf, setWorkflow]
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
              <div className="w-[300px] rounded-lg border border-border/60 bg-card/80 backdrop-blur shadow-lg">
                <div className="flex items-center justify-between p-3">
                  <div className="text-[16px] font-medium text-foreground">
                    Task manager
                  </div>
                  <button
                    type="button"
                    onClick={() => setTaskManagerOpen(false)}
                    aria-label="Close task manager"
                    className="grid h-8 w-8 place-items-center rounded-md text-foreground/70 hover:bg-muted/30"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="h-px w-full bg-border/60" />
                <div className="py-4 px-3 text-[13px] text-foreground/60">
                  No active runs
                </div>
              </div>
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
              <div className="flex items-center justify-center gap-2 px-3 py-3">
                <img
                  src="https://app.weavy.ai/icons/logo.svg"
                  alt="Logo"
                  width="20"
                  className="invert"
                />
                <IconChevronDown className="text-foreground/70" />
              </div>

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

              <div className="flex items-center justify-center gap-2 px-2 py-3">
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
              {/* Workflow title */}
              <div className="flex items-center border-b border-border px-4 py-4">
                <div className="text-[20px] font-medium text-foreground truncate">
                  {workflowName}
                </div>
              </div>

              {/* Search */}
              <div className="border-b border-border px-4 py-3">
                <div className="flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-3">
                  <ToolbarIconSearch />
                  <input
                    placeholder="Search nodes..."
                    className="h-full w-full bg-transparent text-sm outline-none placeholder:text-foreground/50"
                  />
                </div>
              </div>

              {/* Quick Access - Node Buttons */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="text-[15px] font-medium text-foreground mb-3">
                  Quick access
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <QuickAccessNodeButton
                    title="Text"
                    icon={<Type className="h-6 w-6" />}
                    nodeType="text"
                    onAdd={handleAddNode}
                  />
                  <QuickAccessNodeButton
                    title="Image"
                    icon={<ImageIcon className="h-6 w-6" />}
                    nodeType="image"
                    onAdd={handleAddNode}
                  />
                  <QuickAccessNodeButton
                    title="Run Any LLM"
                    icon={<Sparkles className="h-6 w-6" />}
                    nodeType="llm"
                    onAdd={handleAddNode}
                  />
                </div>

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

        <BottomToolbar />
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
  // TODO: Load workflow data from API using workflowId
  return (
    <div className="dark">
      <ReactFlowProvider>
        <BuilderInner />
      </ReactFlowProvider>
    </div>
  );
}
