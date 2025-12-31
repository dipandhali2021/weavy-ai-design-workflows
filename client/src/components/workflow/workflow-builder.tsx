'use client';

import * as React from 'react';
import {
  Background,
  BackgroundVariant,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type NodeTypes,
  type EdgeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useWorkflowStore } from '@/stores/workflowStore';
import { simpleTestWorkflow, productListingWorkflow } from '@/components/workflow/data/sampleWorkflows';
import type { WorkflowNode, WorkflowEdge } from '@/types/workflow.types';

import { workflowNodeTypes } from './nodes';
import { customEdgeTypes } from './custom-edges';
import { BottomToolbar, LeftPanel, RightPanel } from './primitives';

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
  const saveWorkflow = useWorkflowStore((s) => s.saveWorkflow);

  const [leftPanelOpen, setLeftPanelOpen] = React.useState(true);
  const [toolMode, setToolMode] = React.useState<'select' | 'pan'>('select');

  // Editable workflow name state
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [editedName, setEditedName] = React.useState(workflowName);
  const nameInputRef = React.useRef<HTMLInputElement>(null);

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
      setEditedName(workflowName);
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

      const newId = await createAndSaveWorkflow(
        workflow.name,
        workflow.nodes as WorkflowNode[],
        workflow.edges as WorkflowEdge[]
      );

      if (newId) {
        window.history.replaceState(null, '', `/dashboard/workflow/${newId}`);
      }

      setTimeout(() => {
        rf.fitView({ padding: 0.2, duration: 300 });
      }, 100);
    },
    [rf, createAndSaveWorkflow]
  );

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Delete/Backspace to delete selected nodes and edges
      if (
        (e.key === 'Delete' || e.key === 'Backspace') &&
        !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault();
        deleteSelectedNodes();
        useWorkflowStore.getState().deleteSelectedEdges();
      }

      // Ctrl+Z for undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        useWorkflowStore.getState().undo();
      }

      // Ctrl+Shift+Z or Ctrl+Y for redo
      if (
        ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) ||
        ((e.ctrlKey || e.metaKey) && e.key === 'y')
      ) {
        e.preventDefault();
        useWorkflowStore.getState().redo();
      }

      // Ctrl+S for instant save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        useWorkflowStore.getState().saveWorkflow();
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
          panOnDrag={toolMode === 'pan'}
          nodesDraggable={toolMode === 'select'}
          nodesConnectable={toolMode === 'select'}
          elementsSelectable={toolMode === 'select'}
          selectionOnDrag={toolMode === 'select'}
          proOptions={{ hideAttribution: true }}
          edgeTypes={customEdgeTypes as EdgeTypes}
          defaultEdgeOptions={{
            type: 'custom',
            style: { stroke: '#D946EF', strokeWidth: 2 },
          }}
          connectionLineStyle={{ stroke: '#D946EF', strokeWidth: 2 }}
        >
          {/* Right Panel (Credits, Save, Tasks) */}
          <RightPanel
            isSaving={isSaving}
            isDirty={isDirty}
            onSave={saveWorkflow}
          />

          {/* Left Panel (Toolbar + Slide-out) */}
          <LeftPanel
            isOpen={leftPanelOpen}
            onToggle={() => setLeftPanelOpen((v) => !v)}
            workflowName={workflowName}
            isEditingName={isEditingName}
            editedName={editedName}
            onEditedNameChange={setEditedName}
            onNameSubmit={handleNameSubmit}
            onNameKeyDown={handleNameKeyDown}
            onStartEditing={() => {
              setEditedName(workflowName);
              setIsEditingName(true);
            }}
            nameInputRef={nameInputRef}
            onAddNode={handleAddNode}
            onLoadSample={handleLoadSample}
          />

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
    }, 2000);

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
