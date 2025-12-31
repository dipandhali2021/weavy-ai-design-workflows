import type { Position } from '@xyflow/react';
import type React from 'react';

/**
 * Props for the NodeShell wrapper component
 */
export interface NodeShellProps {
    /** Node title displayed in header */
    title: string;
    /** Optional icon element */
    icon?: React.ReactNode;
    /** Optional right-side content (e.g., dropdown menu) */
    right?: React.ReactNode;
    /** Node body content */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
    /** Whether the node is selected */
    selected?: boolean;
}

/**
 * Props for the HandleLabel component
 */
export interface HandleLabelProps {
    /** Label text */
    label: string;
    /** Position of the label relative to handle */
    position: 'left' | 'right';
    /** Additional CSS classes */
    className?: string;
    /** Handle color theme */
    color?: HandleColor;
}

/**
 * Available handle colors
 */
export type HandleColor = 'magenta' | 'green' | 'cyan';

/**
 * Props for the HandleWithLabel component
 */
export interface HandleWithLabelProps {
    /** Handle type (source or target) */
    type: 'source' | 'target';
    /** Handle position */
    position: Position;
    /** Unique handle ID */
    id: string;
    /** Parent node ID */
    nodeId: string;
    /** Label text */
    label: string;
    /** Handle color theme */
    color?: HandleColor;
    /** Additional inline styles */
    style?: React.CSSProperties;
}

/**
 * Props for the RenameDialog component
 */
export interface RenameDialogProps {
    /** Whether dialog is open */
    open: boolean;
    /** Callback when open state changes */
    onOpenChange: (open: boolean) => void;
    /** Current name value */
    value: string;
    /** Callback when value changes */
    onChange: (value: string) => void;
    /** Callback when rename is submitted */
    onSubmit: () => void;
}

/**
 * Props for node dropdown menu
 */
export interface NodeDropdownMenuProps {
    /** Node ID */
    nodeId: string;
    /** Current node label */
    label: string;
    /** Whether node is locked */
    isLocked: boolean;
    /** Callback to toggle lock */
    onToggleLock: () => void;
    /** Callback to open rename dialog */
    onOpenRename: () => void;
    /** Optional additional menu items */
    additionalItems?: React.ReactNode;
}
