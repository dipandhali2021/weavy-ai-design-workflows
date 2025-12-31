import type { Workflow, Folder } from '@/lib/api';

/**
 * Showcase item for template cards
 */
export interface ShowcaseItem {
    title: string;
    imageUrl: string;
}

/**
 * Props for sidebar navigation item
 */
export interface SidebarNavItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    disabled?: boolean;
    trailing?: React.ReactNode;
    onClick?: () => void;
}

/**
 * Props for file card (workflow)
 */
export interface FileCardProps {
    workflow: Workflow;
    onRename: (id: string, newName: string) => void;
    onDelete: (id: string) => void;
    onDuplicate: (id: string) => void;
    onMove: (workflow: Workflow) => void;
}

/**
 * Props for folder card
 */
export interface FolderCardProps {
    folder: Folder;
    onOpen: (folder: Folder) => void;
    onRename: (id: string, newName: string) => void;
    onDelete: (id: string) => void;
    onMove: (folder: Folder) => void;
}

/**
 * Breadcrumb item for folder navigation
 */
export interface BreadcrumbItem {
    id: string | null;
    name: string;
}

/**
 * Props for move dialog
 */
export interface MoveDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    workflow: Workflow | null;
    folders: Folder[];
    selectedTarget: string | null;
    onSelectTarget: (id: string | null) => void;
    onMove: () => void;
}

/**
 * Props for create folder dialog
 */
export interface CreateFolderDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    folderName: string;
    onFolderNameChange: (name: string) => void;
    onCreate: () => void;
}
