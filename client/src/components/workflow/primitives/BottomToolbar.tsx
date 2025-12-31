'use client';

import * as React from 'react';
import {
  useReactFlow,
  useOnViewportChange,
  type Viewport,
} from '@xyflow/react';
import {
  ChevronDown,
  Hand,
  MousePointer2,
  Redo2,
  Undo2,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useWorkflowStore, selectCanUndo, selectCanRedo } from '@/stores/workflowStore';
import type { BottomToolbarProps } from '../types';

/**
 * BottomToolbar Component
 * 
 * Provides workflow canvas controls:
 * - Select/Pan tool modes
 * - Undo/Redo
 * - Zoom controls with dropdown
 */
export function BottomToolbar({ toolMode, setToolMode }: BottomToolbarProps) {
  const rf = useReactFlow();
  const [zoomPct, setZoomPct] = React.useState(55);
  const undo = useWorkflowStore((s) => s.undo);
  const redo = useWorkflowStore((s) => s.redo);
  const canUndo = useWorkflowStore(selectCanUndo);
  const canRedo = useWorkflowStore(selectCanRedo);

  // Subscribe to viewport changes to update zoom percentage
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
      if (e.ctrlKey || e.metaKey) {
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
      <div className="pointer-events-auto flex items-center gap-1 rounded-md border border-border/60 bg-card/80 backdrop-blur px-2 py-2 shadow-lg">
        {/* Select tool */}
        <button
          type="button"
          aria-label="Select"
          onClick={() => setToolMode('select')}
          className={cn(
            'grid h-9 w-9 place-items-center rounded-md transition-colors',
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
            'grid h-9 w-9 place-items-center rounded-md transition-colors',
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
            'grid h-9 w-9 place-items-center rounded-md hover:bg-muted/40',
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
            'grid h-9 w-9 place-items-center rounded-md hover:bg-muted/40',
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
              className="flex items-center gap-1 h-9 rounded-md px-3 text-[13px] font-medium text-foreground/80 hover:bg-muted/40"
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
