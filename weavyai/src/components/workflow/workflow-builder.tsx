'use client';

import * as React from 'react';
import {
  Background,
  BackgroundVariant,
  Panel,
  ReactFlow,
  ReactFlowProvider,
  type Edge,
  type Node,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { PiShareLight } from 'react-icons/pi';
import { TbAsterisk } from 'react-icons/tb';

import {
  IconChevronDown,
  QuickAccessIconCompositor,
  QuickAccessIconExport,
  QuickAccessIconImport,
  QuickAccessIconLevels,
  QuickAccessIconPreview,
  QuickAccessIconPrompt,
  ToolbarIconAssets,
  ToolbarIconDiscord,
  ToolbarIconHelp,
  ToolbarIconImage,
  ToolbarIconModels,
  ToolbarIconRecent,
  ToolbarIconSearch,
  ToolbarIconSort,
  ToolbarIconThreeDee,
  ToolbarIconToolbox,
  ToolbarIconVideo,
} from '@/components/icons/workflow-icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ChevronDown,
  MousePointer2,
  Redo2,
  Share2,
  SlidersHorizontal,
  Undo2,
  X,
} from 'lucide-react';
import { workflowNodeTypes } from './nodes';
import Image from 'next/image';

type WorkflowNode = Node;

type WorkflowEdge = Edge;

const initialNodes: WorkflowNode[] = [
  {
    id: 'prompt',
    type: 'prompt',
    position: { x: 340, y: 140 },
    data: {
      text: "Hipster Sisyphus, limbo dots overall suit, pushing a huge round rock up a hill. The rock is sprayed with the text 'default prompt', bright grey background, extreme side long shot, cinematic, fashion style, side view",
    },
  },
  {
    id: 'file',
    type: 'file',
    position: { x: 340, y: 320 },
    data: {},
  },
  {
    id: 'model',
    type: 'model',
    position: { x: 730, y: 160 },
    data: { title: 'Veo 3.1 Text to Video' },
  },
];

const initialEdges: WorkflowEdge[] = [
  {
    id: 'e-prompt-model',
    source: 'prompt',
    sourceHandle: 'out',
    target: 'model',
    targetHandle: 'prompt',
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: 'hsl(var(--sidebar-ring))',
    },
  },
  {
    id: 'e-file-model',
    source: 'file',
    sourceHandle: 'out',
    target: 'model',
    targetHandle: 'file',
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: 'hsl(var(--sidebar-ring))',
    },
  },
];

type LeftToolKey =
  | 'search'
  | 'recent'
  | 'toolbox'
  | 'image'
  | 'video'
  | 'threedee'
  | 'models';

function LeftToolbarButton({
  id,
  active,
  value,
  ariaLabel,
  onClick,
  children,
}: {
  id: string;
  active: boolean;
  value: LeftToolKey;
  ariaLabel: string;
  onClick: (value: LeftToolKey) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      id={id}
      type="button"
      value={value}
      aria-label={ariaLabel}
      aria-pressed={active}
      onClick={() => onClick(value)}
      className={cn(
        'grid h-11 w-11 place-items-center rounded-md transition-colors',
        'text-foreground/70 hover:bg-muted/30 hover:text-foreground',
        active && 'bg-accent text-accent-foreground'
      )}
    >
      {children}
    </button>
  );
}

function QuickAccessTile({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={cn(
        'flex h-28 flex-col items-center justify-center gap-2 rounded-md border border-border/60',
        'bg-card/40 text-foreground/90 hover:bg-card/60'
      )}
    >
      <span className="text-foreground/80">{icon}</span>
      <span className="text-[14px] font-medium">{title}</span>
    </button>
  );
}

function BottomToolbar() {
  const rf = useReactFlow();
  const [zoomPct, setZoomPct] = React.useState(55);

  React.useEffect(() => {
    // Initialize zoom similar to screenshot
    rf.setViewport({ x: 0, y: 0, zoom: 0.55 }, { duration: 0 });
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
      <div className="pointer-events-auto flex items-center gap-2 rounded-md border border-border/60 bg-card/60 px-2 py-2 shadow-sm">
        <button
          type="button"
          aria-label="Select"
          className="grid h-9 w-9 place-items-center rounded-lg bg-muted/40 text-foreground hover:bg-muted/50"
        >
          <MousePointer2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Pan"
          className="grid h-9 w-9 place-items-center rounded-lg text-foreground/80 hover:bg-muted/40"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Undo"
          className="grid h-9 w-9 place-items-center rounded-lg text-foreground/80 hover:bg-muted/40"
        >
          <Undo2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Redo"
          className="grid h-9 w-9 place-items-center rounded-lg text-foreground/80 hover:bg-muted/40"
        >
          <Redo2 className="h-4 w-4" />
        </button>

        <div className="mx-1 h-6 w-px bg-border/60" />

        <button
          type="button"
          aria-label="Zoom out"
          className="grid h-9 w-9 place-items-center rounded-lg text-foreground/80 hover:bg-muted/40"
          onClick={() => applyZoomPct(zoomPct - 5)}
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
          onClick={() => applyZoomPct(zoomPct + 5)}
        >
          +
        </button>
      </div>
    </div>
  );
}

function BuilderInner() {
  const [activeLeftTool, setActiveLeftTool] =
    React.useState<LeftToolKey>('search');
  const [leftPanelOpen, setLeftPanelOpen] = React.useState(true);
  const [taskManagerOpen, setTaskManagerOpen] = React.useState(false);

  const onSelectLeftTool = (value: LeftToolKey) => {
    if (value === activeLeftTool) {
      setLeftPanelOpen((v) => !v);
      return;
    }
    setActiveLeftTool(value);
    setLeftPanelOpen(true);
  };

  return (
    <div className="relative h-dvh w-screen overflow-hidden bg-background">
      {/* Canvas */}
      <div className="absolute inset-0">
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={workflowNodeTypes}
          fitView={false}
          panOnScroll
          zoomOnScroll
          zoomOnDoubleClick={false}
          proOptions={{ hideAttribution: true }}
          defaultEdgeOptions={{
            style: { stroke: 'hsl(var(--sidebar-ring))', strokeWidth: 2 },
          }}
        >
          {/* Task manager (opens from Tasks) */}
          {taskManagerOpen ? (
            <Panel
              position="top-right"
              className="pointer-events-auto"
              style={{ margin: 24, transform: 'translateX(-276px)' }}
            >
              <div className="w-[300px] rounded-md border border-border/60 bg-card/60 shadow-sm backdrop-blur">
                <div className="flex items-center justify-between p-2">
                  <div className="text-[18px] font-medium text-foreground">
                    Task manager
                  </div>
                  <button
                    type="button"
                    onClick={() => setTaskManagerOpen(false)}
                    aria-label="Close task manager"
                    className="grid h-9 w-9 place-items-center rounded-md text-foreground/70 hover:bg-muted/30 hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="h-px w-full bg-border/60" />
                <div className="py-4 px-2 text-[12px] text-foreground/70">
                  No active runs
                </div>
              </div>
            </Panel>
          ) : null}

          {/* Top-right status */}
          <Panel
            position="top-right"
            className="pointer-events-auto"
            style={{ margin: 24 }}
          >
            <div className="w-[260px] rounded-md border border-border/60 bg-card/60 p-2 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="text-[14px] flex items-center gap-1 font-medium text-foreground">
                  <TbAsterisk className="text-[18px]" />
                  <p>149 credits</p>
                </div>
                <Button
                  size="sm"
                  className="h-9 rounded-md bg-[#faffc7] text-black px-4"
                >
                  <PiShareLight className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>

              <div className="mt-1">
                <button
                  type="button"
                  onClick={() => setTaskManagerOpen((v) => !v)}
                  className="flex items-center gap-2 text-[16px] font-medium text-foreground/90 hover:text-foreground hover:bg-gray-200 px-1 rounded-md"
                  aria-expanded={taskManagerOpen}
                >
                  Tasks
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Panel>

          {/* Left toolbar (always visible) */}
          <Panel
            position="top-left"
            className="left"
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

                <IconChevronDown className="text-foreground/70 " />
              </div>

              <div
                id="toolbar-container"
                className="flex flex-1 flex-col items-center gap-2 px-2 pt-2"
              >
                <LeftToolbarButton
                  id="toolbar-menu-item-search"
                  value="search"
                  ariaLabel="search"
                  active={activeLeftTool === 'search'}
                  onClick={onSelectLeftTool}
                >
                  <ToolbarIconSearch />
                </LeftToolbarButton>

                <LeftToolbarButton
                  id="toolbar-menu-item-recent"
                  value="recent"
                  ariaLabel="recent"
                  active={activeLeftTool === 'recent'}
                  onClick={onSelectLeftTool}
                >
                  <ToolbarIconRecent />
                </LeftToolbarButton>

                <LeftToolbarButton
                  id="toolbar-menu-item-toolbox"
                  value="toolbox"
                  ariaLabel="toolbox"
                  active={activeLeftTool === 'toolbox'}
                  onClick={onSelectLeftTool}
                >
                  <ToolbarIconToolbox />
                </LeftToolbarButton>

                <LeftToolbarButton
                  id="toolbar-menu-item-image"
                  value="image"
                  ariaLabel="image"
                  active={activeLeftTool === 'image'}
                  onClick={onSelectLeftTool}
                >
                  <ToolbarIconImage />
                </LeftToolbarButton>

                <LeftToolbarButton
                  id="toolbar-menu-item-video"
                  value="video"
                  ariaLabel="video"
                  active={activeLeftTool === 'video'}
                  onClick={onSelectLeftTool}
                >
                  <ToolbarIconVideo />
                </LeftToolbarButton>

                <LeftToolbarButton
                  id="toolbar-menu-item-threedee"
                  value="threedee"
                  ariaLabel="threedee"
                  active={activeLeftTool === 'threedee'}
                  onClick={onSelectLeftTool}
                >
                  <ToolbarIconThreeDee />
                </LeftToolbarButton>

                <LeftToolbarButton
                  id="toolbar-menu-item-models"
                  value="models"
                  ariaLabel="models"
                  active={activeLeftTool === 'models'}
                  onClick={onSelectLeftTool}
                >
                  <ToolbarIconModels />
                </LeftToolbarButton>
              </div>

              <div
                data-testid="toolbar-extras-container"
                className="flex items-center justify-center gap-2 px-2 py-3"
              >
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
                  aria-label="Join our Discord"
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
            className={cn(
              'left',
              leftPanelOpen ? 'slide-left-enter' : 'slide-left-exit'
            )}
            data-testid="left-panel-panel"
            style={{
              height: '100%',
              width: leftPanelOpen ? 240 : 0,
              top: 0,
              left: 56,
              margin: 0,
              opacity: leftPanelOpen ? 1 : 0,
              transition: 'width 0.1s, opacity 0.2s ease-in-out',
              pointerEvents: leftPanelOpen ? 'all' : 'none',
              overflow: 'hidden',
            }}
          >
            <div
              className="flex h-full w-full flex-col border-r border-border bg-card"
              data-testid="flow-left-panel"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src="/icons/logo.svg"
                    alt="logo"
                    width="24"
                    height="24"
                    style={{
                      display: 'none',
                      cursor: 'pointer',
                      marginRight: 24,
                    }}
                  />
                  <div className="min-w-0 text-[22px] font-medium leading-none text-foreground">
                    <span className="block truncate">untitled</span>
                  </div>
                </div>
              </div>

              {/* Search row */}
              <div className="border-b border-border px-4 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-11 flex-1 items-center gap-2 rounded-md border border-border bg-background px-3">
                    <ToolbarIconSearch />
                    <input
                      placeholder="Search"
                      className="h-full w-full bg-transparent text-[16px] outline-none placeholder:text-foreground/50"
                      aria-label="Search"
                    />
                  </div>
                  <button
                    type="button"
                    aria-label="Sort"
                    className="grid h-11 w-11 place-items-center rounded-lg text-foreground/70 hover:bg-muted/30"
                  >
                    <ToolbarIconSort />
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-4 px-1 text-[14px] text-foreground/70">
                  <div className="flex items-center gap-2">
                    <span>From</span>
                    <span className="rounded-md bg-muted/30 px-3 py-1 font-mono text-foreground/70">
                      Input
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>to</span>
                    <span className="rounded-md bg-muted/30 px-3 py-1 font-mono text-foreground/70">
                      Output
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="no-scrollbar flex-1 overflow-y-auto px-4 py-4">
                {activeLeftTool === 'toolbox' ? (
                  <div>
                    <div className="text-[18px] font-medium text-foreground">
                      Toolbox
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <QuickAccessTile
                        title="Levels"
                        icon={<QuickAccessIconLevels />}
                      />
                      <QuickAccessTile
                        title="Compositor"
                        icon={<QuickAccessIconCompositor />}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-[18px] font-medium text-foreground">
                      Quick access
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <QuickAccessTile
                        title="Prompt"
                        icon={<QuickAccessIconPrompt />}
                      />
                      <QuickAccessTile
                        title="Import"
                        icon={<QuickAccessIconImport />}
                      />
                      <QuickAccessTile
                        title="Export"
                        icon={<QuickAccessIconExport />}
                      />
                      <QuickAccessTile
                        title="Preview"
                        icon={<QuickAccessIconPreview />}
                      />
                      <QuickAccessTile
                        title="Import Model"
                        icon={<ToolbarIconToolbox />}
                      />
                      <QuickAccessTile
                        title="Import LoRA"
                        icon={<ToolbarIconToolbox />}
                      />
                      <QuickAccessTile
                        title="Import Multiple LoRAs"
                        icon={<ToolbarIconToolbox />}
                      />
                    </div>

                    <div className="mt-8 text-[18px] font-medium text-foreground">
                      Toolbox
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <QuickAccessTile
                        title="Levels"
                        icon={<SlidersHorizontal className="h-5 w-5" />}
                      />
                      <QuickAccessTile
                        title="Compositor"
                        icon={<ToolbarIconImage />}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Panel>

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

export function WorkflowBuilder() {
  // Scope dark theme to this surface (matches screenshot).
  return (
    <div className="dark">
      <ReactFlowProvider>
        <BuilderInner />
      </ReactFlowProvider>
    </div>
  );
}
