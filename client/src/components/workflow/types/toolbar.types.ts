import type React from 'react';

/**
 * Props for the BottomToolbar component
 */
export interface BottomToolbarProps {
    /** Current tool mode */
    toolMode: 'select' | 'pan';
    /** Callback to change tool mode */
    setToolMode: (mode: 'select' | 'pan') => void;
}

/**
 * Props for QuickAccessNodeButton
 */
export interface QuickAccessNodeButtonProps {
    /** Button title */
    title: string;
    /** Icon element */
    icon: React.ReactNode;
    /** Node type to create */
    nodeType: 'text' | 'image' | 'llm';
    /** Callback when button is clicked */
    onAdd: (type: 'text' | 'image' | 'llm') => void;
}

/**
 * Props for TaskManagerPanel
 */
export interface TaskManagerPanelProps {
    /** Callback to close the panel */
    onClose: () => void;
}

/**
 * Toolbar section configuration
 */
export interface ToolbarSection {
    /** Section ID */
    id: string;
    /** Section label */
    label: string;
    /** Section icon */
    icon: React.ReactNode;
    /** Items in this section */
    items?: ToolbarItem[];
}

/**
 * Toolbar item configuration
 */
export interface ToolbarItem {
    /** Item ID */
    id: string;
    /** Item label */
    label: string;
    /** Item icon */
    icon: React.ReactNode;
    /** Node type to add (if applicable) */
    nodeType?: 'text' | 'image' | 'llm';
}
