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
import {} from '@/components/ui/dropdown-menu';
import { workflowNodeTypes } from './nodes';

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

function IconChevronDown({ className }: { className?: string }) {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9.75 4.5L6 8.25L2.25 4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ToolbarIconSearch() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.8035 15.8035L21 21"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ToolbarIconRecent() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 7.5V12L15.75 14.25"
        stroke="currentColor"
        strokeOpacity="0.8"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75 9.75H3V6"
        stroke="currentColor"
        strokeOpacity="0.8"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.3375 18.0004C7.51685 19.1132 8.99798 19.8538 10.5958 20.1297C12.1937 20.4056 13.8374 20.2045 15.3217 19.5515C16.8059 18.8986 18.0648 17.8227 18.9411 16.4584C19.8173 15.0941 20.2721 13.5017 20.2486 11.8804C20.2251 10.2591 19.7244 8.68062 18.8089 7.34226C17.8934 6.0039 16.6039 4.96499 15.1014 4.35533C13.5988 3.74568 11.95 3.59231 10.3608 3.9144C8.77157 4.23648 7.31253 5.01974 6.16594 6.1663C5.0625 7.2838 4.15125 8.33755 3 9.75036"
        stroke="currentColor"
        strokeOpacity="0.8"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ToolbarIconToolbox() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 6.75H3C2.58579 6.75 2.25 7.08579 2.25 7.5V18C2.25 18.4142 2.58579 18.75 3 18.75H21C21.4142 18.75 21.75 18.4142 21.75 18V7.5C21.75 7.08579 21.4142 6.75 21 6.75Z"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.25 11.25H21.75"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75 9.75V12.75"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.25 9.75V12.75"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.75 6.75V5.25C15.75 4.85218 15.592 4.47064 15.3107 4.18934C15.0294 3.90804 14.6478 3.75 14.25 3.75H9.75C9.35218 3.75 8.97064 3.90804 8.68934 4.18934C8.40804 4.47064 8.25 4.85218 8.25 5.25V6.75"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ToolbarIconImage() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5 3.75H4.5C3.77375 3.75 3.185 4.33875 3.185 5.065V19.5C3.185 20.2263 3.77375 20.815 4.5 20.815H19.5C20.2263 20.815 20.815 20.2263 20.815 19.5V9.50528C20.6157 10.0455 20.4068 10.3162 20.133 10.507C19.995 10.6032 19.8438 10.6768 19.685 10.7263V19.5C19.685 19.6022 19.6022 19.685 19.5 19.685H4.5C4.39783 19.685 4.315 19.6022 4.315 19.5V5.065C4.315 4.96283 4.39783 4.88 4.5 4.88H13.2737C13.3232 4.72121 13.3968 4.56998 13.493 4.43195C13.6838 4.1582 13.9539 3.9495 14.2669 3.83396L14.4947 3.75H19.5Z"
        fill="currentColor"
      />
      <path
        d="M9 10.5C9.82843 10.5 10.5 9.82843 10.5 9C10.5 8.17157 9.82843 7.5 9 7.5C8.17157 7.5 7.5 8.17157 7.5 9C7.5 9.82843 8.17157 10.5 9 10.5Z"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.31494 20.2496L15.5946 9.96899C15.6643 9.89926 15.747 9.84394 15.838 9.80619C15.9291 9.76845 16.0267 9.74902 16.1253 9.74902C16.2238 9.74902 16.3214 9.76845 16.4125 9.80619C16.5035 9.84394 16.5862 9.89926 16.6559 9.96899L20.2503 13.5643"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ToolbarIconVideo() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.8 12.5L10 9.5V15.5L14.8 12.5Z"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.818 5.5653H20.1816C20.6209 5.5653 20.9791 5.79986 21.2092 6.10121C21.439 6.40206 21.5648 6.79303 21.5648 7.20173V18.9289C21.5648 19.3376 21.439 19.7285 21.2092 20.0294C20.9791 20.3307 20.6209 20.5653 20.1816 20.5653H3.818C3.37871 20.5653 3.02053 20.3307 2.79041 20.0294C2.56067 19.7285 2.43481 19.3376 2.43481 18.9289V7.20173C2.43481 6.79303 2.56067 6.40206 2.79041 6.10121C3.02053 5.79986 3.37871 5.5653 3.818 5.5653Z"
        fill="currentColor"
        fillOpacity="0.0"
      />
      <path
        d="M20.1818 5H3.81818C3.36631 5 3 5.47969 3 6.07143V18.9286C3 19.5203 3.36631 20 3.81818 20H20.1818C20.6337 20 21 19.5203 21 18.9286V6.07143C21 5.47969 20.6337 5 20.1818 5Z"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ToolbarIconThreeDee() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.36 2.344C12.2496 2.28361 12.1258 2.25195 12 2.25195C11.8742 2.25195 11.7504 2.28361 11.64 2.344L3.39 6.86088C3.2722 6.92533 3.17386 7.02023 3.10526 7.13567C3.03666 7.25111 3.0003 7.38285 3 7.51713V16.4834C3.0003 16.6177 3.03666 16.7494 3.10526 16.8648C3.17386 16.9803 3.2722 17.0752 3.39 17.1396"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12.103V21.7508"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.3356 6.71566L12 11.4578L20.6644 6.71566"
        stroke="currentColor"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ToolbarIconModels() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.90007 16.0994L2.73539 14.1963C2.59298 14.1438 2.4701 14.0488 2.38332 13.9243C2.29653 13.7997 2.25 13.6516 2.25 13.4998C2.25 13.348 2.29653 13.1998 2.38332 13.0753C2.4701 12.9507 2.59298 12.8558 2.73539 12.8032L7.90007 10.9001L9.8032 5.73539C9.85577 5.59298 9.95072 5.4701 10.0753 5.38332C10.1998 5.29653 10.348 5.25 10.4998 5.25C10.6516 5.25 10.7997 5.29653 10.9243 5.38332C11.0488 5.4701 11.1438 5.59298 11.1963 5.73539L13.0994 10.9001L18.2641 12.8032C18.4065 12.8558 18.5294 12.9507 18.6162 13.0753C18.703 13.1998 18.7495 13.348 18.7495 13.4998C18.7495 13.6516 18.703 13.7997 18.6162 13.9243C18.5294 14.0488 18.4065 14.1438 18.2641 14.1963L13.0994 16.0994L11.1963 21.2641C11.1438 21.4065 11.0488 21.5294 10.9243 21.6162C10.7997 21.703 10.6516 21.7495 10.4998 21.7495C10.348 21.7495 10.1998 21.703 10.0753 21.6162C9.95072 21.5294 9.85577 21.4065 9.8032 21.2641L7.90007 16.0994Z"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 1.5V6"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 6.75V9.75"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.25 3.75H18.75"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 8.25H22.5"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

                <IconChevronDown className="text-foreground/70" />
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
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.5 3.75H7.5C7.08579 3.75 6.75 4.08579 6.75 4.5V16.5C6.75 16.9142 7.08579 17.25 7.5 17.25H19.5C19.9142 17.25 20.25 16.9142 20.25 16.5V4.5C20.25 4.08579 19.9142 3.75 19.5 3.75Z"
                      stroke="currentColor"
                      strokeWidth="1.125"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.25 9.75C12.0784 9.75 12.75 9.07843 12.75 8.25C12.75 7.42157 12.0784 6.75 11.25 6.75C10.4216 6.75 9.75 7.42157 9.75 8.25C9.75 9.07843 10.4216 9.75 11.25 9.75Z"
                      stroke="currentColor"
                      strokeWidth="1.125"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.25 17.25V19.5C17.25 19.6989 17.171 19.8897 17.0303 20.0303C16.8897 20.171 16.6989 20.25 16.5 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V7.5C3.75 7.30109 3.82902 7.11032 3.96967 6.96967C4.11032 6.82902 4.30109 6.75 4.5 6.75H6.75"
                      stroke="currentColor"
                      strokeWidth="1.125"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  aria-label="Help"
                  className="grid h-10 w-10 place-items-center rounded-md text-foreground/70 hover:bg-muted/30"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 17.8125C12.5178 17.8125 12.9375 17.3928 12.9375 16.875C12.9375 16.3572 12.5178 15.9375 12 15.9375C11.4822 15.9375 11.0625 16.3572 11.0625 16.875C11.0625 17.3928 11.4822 17.8125 12 17.8125Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 13.5V12.75C13.6566 12.75 15 11.5744 15 10.125C15 8.67562 13.6566 7.5 12 7.5C10.3434 7.5 9 8.67562 9 10.125V10.5"
                      stroke="currentColor"
                      strokeWidth="1.125"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                      stroke="currentColor"
                      strokeWidth="1.125"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  aria-label="Join our Discord"
                  className="grid h-10 w-10 place-items-center rounded-md text-foreground/70 hover:bg-muted/30"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.3303 4.22781C18.7767 3.50093 17.1156 2.97267 15.3789 2.67188C15.1656 3.05749 14.9164 3.57614 14.7446 3.98873C12.8985 3.71109 11.0693 3.71109 9.25716 3.98873C9.08539 3.57614 8.83055 3.05749 8.61536 2.67188C6.87681 2.97267 5.21376 3.50287 3.66019 4.23166C0.526643 8.96686 -0.322811 13.5845 0.101917 18.1365C2.18025 19.6885 4.19441 20.6313 6.17457 21.2483C6.66349 20.5754 7.09953 19.8601 7.47518 19.1063C6.75975 18.8344 6.07453 18.499 5.42707 18.1095C5.59884 17.9822 5.76686 17.8492 5.92918 17.7123C9.87819 19.5594 14.1689 19.5594 18.0707 17.7123C18.235 17.8492 18.403 17.9822 18.5728 18.1095C17.9235 18.5009 17.2364 18.8363 16.521 19.1082C16.8966 19.8601 17.3308 20.5774 17.8216 21.2502C19.8036 20.6333 21.8197 19.6905 23.898 18.1365C24.3964 12.8595 23.0467 8.28434 20.3303 4.22781Z"
                      fill="currentColor"
                    />
                  </svg>
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
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.5 16.5L7.5 19.5L4.5 16.5"
                        stroke="currentColor"
                        strokeWidth="1.13"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.5 4.5L7.5 19.5"
                        stroke="currentColor"
                        strokeWidth="1.13"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.5 7.5L16.5 4.5L19.5 7.5"
                        stroke="currentColor"
                        strokeWidth="1.13"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.5 19.5L16.5 4.5"
                        stroke="currentColor"
                        strokeWidth="1.13"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
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
                        icon={
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15 18.75C15 17.5074 13.9926 16.5 12.75 16.5C11.5074 16.5 10.5 17.5074 10.5 18.75C10.5 19.9926 11.5074 21 12.75 21C13.9926 21 15 19.9926 15 18.75Z"
                              stroke="currentColor"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10.5 12C10.5 10.7574 9.49264 9.75 8.25 9.75C7.00736 9.75 6 10.7574 6 12C6 13.2426 7.00736 14.25 8.25 14.25C9.49264 14.25 10.5 13.2426 10.5 12Z"
                              stroke="currentColor"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M18 5.25C18 4.00736 16.9926 3 15.75 3C14.5074 3 13.5 4.00736 13.5 5.25C13.5 6.49264 14.5074 7.5 15.75 7.5C16.9926 7.5 18 6.49264 18 5.25Z"
                              stroke="currentColor"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M3.75 18.75L10.5 18.75"
                              stroke="currentColor"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M3.75 5.25L13.5 5.25"
                              stroke="currentColor"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M3.75 12L6 12"
                              stroke="currentColor"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15 18.75L20.25 18.75"
                              stroke="currentColor"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M18 5.25L20.25 5.25"
                              stroke="currentColor"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10.5 12L20.25 12"
                              stroke="currentColor"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
                      />
                      <QuickAccessTile
                        title="Compositor"
                        icon={
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.5 3.75H7.5C7.08579 3.75 6.75 4.08579 6.75 4.5V16.5C6.75 16.9142 7.08579 17.25 7.5 17.25H19.5C19.9142 17.25 20.25 16.9142 20.25 16.5V4.5C20.25 4.08579 19.9142 3.75 19.5 3.75Z"
                              stroke="currentColor"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M11.25 9.75C12.0784 9.75 12.75 9.07843 12.75 8.25C12.75 7.42157 12.0784 6.75 11.25 6.75C10.4216 6.75 9.75 7.42157 9.75 8.25C9.75 9.07843 10.4216 9.75 11.25 9.75Z"
                              stroke="currentColor"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.06445 17.2501L16.3441 9.96948C16.4138 9.89974 16.4965 9.84443 16.5876 9.80668C16.6786 9.76894 16.7762 9.74951 16.8748 9.74951C16.9733 9.74951 17.0709 9.76894 17.162 9.80668C17.253 9.84443 17.3357 9.89974 17.4054 9.96948L20.2498 12.8148"
                              stroke="currentColor"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
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
                        icon={
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 5.25V18.75"
                              stroke="currentColor"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.25 8.25V5.25H18.75V8.25"
                              stroke="currentColor"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9 18.75H15"
                              stroke="currentColor"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
                      />
                      <QuickAccessTile
                        title="Import"
                        icon={
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 13.5V3"
                              stroke="currentColor"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M20.25 13.5V19.5H3.75V13.5"
                              stroke="currentColor"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15.75 9.75L12 13.5L8.25 9.75"
                              stroke="currentColor"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
                      />
                      <QuickAccessTile
                        title="Export"
                        icon={
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 3L12 13.5"
                              stroke="currentColor"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M20.25 13.5V19.5H3.75V13.5"
                              stroke="currentColor"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8.25 6.75L12 3L15.75 6.75"
                              stroke="currentColor"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
                      />
                      <QuickAccessTile
                        title="Preview"
                        icon={
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 5.25C4.5 5.25 1.5 12 1.5 12C1.5 12 4.5 18.75 12 18.75C19.5 18.75 22.5 12 22.5 12C22.5 12 19.5 5.25 12 5.25Z"
                              stroke="currentColor"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z"
                              stroke="currentColor"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
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
