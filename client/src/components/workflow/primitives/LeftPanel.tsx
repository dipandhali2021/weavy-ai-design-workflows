'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  HelpCircle,
  Images,
  Search,
  ImageIcon,
  Sparkles,
  Type,
  X,
} from 'lucide-react';
import { BsDiscord } from 'react-icons/bs';
import { Panel } from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { QuickAccessNodeButton } from './QuickAccessNodeButton';

interface LeftPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  workflowName: string;
  isEditingName: boolean;
  editedName: string;
  onEditedNameChange: (name: string) => void;
  onNameSubmit: () => void;
  onNameKeyDown: (e: React.KeyboardEvent) => void;
  onStartEditing: () => void;
  nameInputRef: React.RefObject<HTMLInputElement | null>;
  onAddNode: (type: 'text' | 'image' | 'llm') => void;
  onLoadSample: (sample: 'simple' | 'product') => void;
}

/**
 * LeftPanel Component
 * 
 * The left sidebar containing:
 * - Toolbar with logo and quick actions
 * - Slide-out panel with search and node palette
 */
export function LeftPanel({
  isOpen,
  onToggle,
  workflowName,
  isEditingName,
  editedName,
  onEditedNameChange,
  onNameSubmit,
  onNameKeyDown,
  onStartEditing,
  nameInputRef,
  onAddNode,
  onLoadSample,
}: LeftPanelProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const nodeTypes = [
    { title: 'Text', nodeType: 'text' as const, icon: <Type className="h-6 w-6" /> },
    { title: 'Image', nodeType: 'image' as const, icon: <ImageIcon className="h-6 w-6" /> },
    { title: 'Run Any LLM', nodeType: 'llm' as const, icon: <Sparkles className="h-6 w-6" /> },
  ];

  const filteredNodeTypes = nodeTypes.filter((node) =>
    node.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
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
          <Link href="/dashboard" className="flex items-center justify-center gap-2 px-3 py-3 cursor-pointer">
            <img
              src="https://app.weavy.ai/icons/logo.svg"
              alt="Logo"
              width="20"
              className="invert"
            />
            <ChevronDown className="h-3 w-3 text-foreground/70" />
          </Link>

          <div className="flex flex-1 flex-col items-center gap-2 px-2 pt-2">
            <button
              type="button"
              aria-label="Search"
              onClick={onToggle}
              className={cn(
                'grid h-11 w-11 place-items-center rounded-md transition-colors',
                'text-foreground/70 hover:bg-muted/30 hover:text-foreground',
                isOpen && 'bg-accent text-accent-foreground'
              )}
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 px-2 py-3">
            <button
              type="button"
              aria-label="Assets"
              className="grid h-10 w-10 place-items-center rounded-md text-foreground/70 hover:bg-muted/30"
            >
              <Images className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Help"
              className="grid h-10 w-10 place-items-center rounded-md text-foreground/70 hover:bg-muted/30"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Discord"
              className="grid h-10 w-10 place-items-center rounded-md text-foreground/70 hover:bg-muted/30"
            >
              <BsDiscord className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Panel>

      {/* Workflow name - visible when sidebar is closed */}
      {!isOpen && (
        <div
          className="pointer-events-auto absolute z-20"
          style={{ left: 72, top: 12 }}
        >
          {isEditingName ? (
            <input
              autoFocus
              type="text"
              value={editedName}
              onChange={(e) => onEditedNameChange(e.target.value)}
              onBlur={onNameSubmit}
              onKeyDown={onNameKeyDown}
              className="text-[18px] font-medium text-foreground bg-muted/60 rounded-md px-4 py-2 outline-none border border-purple-500 min-w-[200px]"
            />
          ) : (
            <button
              type="button"
              onClick={onStartEditing}
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
        className={cn(isOpen ? 'slide-left-enter' : 'slide-left-exit')}
        data-testid="left-panel-panel"
        style={{
          height: '100%',
          width: isOpen ? 260 : 0,
          top: 0,
          left: 56,
          margin: 0,
          opacity: isOpen ? 1 : 0,
          transition: 'width 0.15s, opacity 0.2s ease-in-out',
          pointerEvents: isOpen ? 'all' : 'none',
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
                onChange={(e) => onEditedNameChange(e.target.value)}
                onBlur={onNameSubmit}
                onKeyDown={onNameKeyDown}
                className="w-full text-[18px] font-medium text-foreground bg-muted/40 rounded-md px-4 py-2 outline-none border border-border"
              />
            ) : (
              <button
                type="button"
                onClick={onStartEditing}
                className="text-[18px] font-medium text-foreground hover:text-foreground/80 truncate text-left transition-colors"
                title="Click to rename"
              >
                {workflowName}
              </button>
            )}
          </div>

          {/* Search */}
          <div className="border-b border-border px-4 py-3">
            <div className="flex h-10 items-center gap-2 rounded-md border border-border bg-background px-3">
              <Search className="h-4 w-4 text-foreground/60" />
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
                    onAdd={onAddNode}
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
                  onClick={() => onLoadSample('simple')}
                  className="w-full justify-start text-left"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Simple LLM Test
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onLoadSample('product')}
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
    </>
  );
}
