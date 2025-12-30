'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  isAuthenticated,
  getStoredUser,
  setStoredToken,
  setStoredUser,
  clearAuth,
  type AuthUser,
} from '@/lib/auth';
import { api, type Workflow, type Folder } from '@/lib/api';
import { BsDiscord } from 'react-icons/bs';
import { PiUsers } from 'react-icons/pi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import {
  LogOut,
  Copy,
  ExternalLink,
  FolderInput,
  Pencil,
  Trash2,
  File,
  FolderPlus,
  ChevronRight,
  Folder as FolderIcon,
} from 'lucide-react';

type ShowcaseItem = {
  title: string;
  imageUrl: string;
};

const showcaseItems: ShowcaseItem[] = [
  {
    title: 'Weavy Welcome',
    imageUrl:
      'https://media.weavy.ai/image/upload/f_auto,q_auto/v1/uploads/gclnmopestmtomr4wk9k?_a=BAMAMiWO0',
  },
  {
    title: 'Weavy Iterators',
    imageUrl:
      'https://media.weavy.ai/image/upload/f_auto,q_auto/v1/uploads/1VzevvFzYnfcuq7FDIhlJFZtZW73/q346rdjtgnoljav8ofwi?_a=BAMAMiWO0',
  },
  {
    title: 'Multiple Image Models',
    imageUrl:
      'https://media.weavy.ai/image/upload/f_auto,q_auto/v1/uploads/D13KHjm958bJaWyp8KGYlyWGlIj2/nyfxshgadqckp8y3xftr?_a=BAMAMiWO0',
  },
  {
    title: 'Editing Images',
    imageUrl:
      'https://media.weavy.ai/image/upload/f_auto,q_auto/v1/uploads/9MzfwEZkPeWMhA20uRTNGSJA4wx2/vlxuswgdgeqxuhgfurfs?_a=BAMAMiWO0',
  },
  {
    title: 'Compositor Node',
    imageUrl:
      'https://media.weavy.ai/image/upload/f_auto,q_auto/v1/uploads/D13KHjm958bJaWyp8KGYlyWGlIj2/aak3ssgcgmo9nw2obolo?_a=BAMAMiWO0',
  },
  {
    title: 'Image to Video',
    imageUrl:
      'https://media.weavy.ai/image/upload/f_auto,q_auto/v1/uploads/tycelzmnejahr8svztrb?_a=BAMAMiWO0',
  },
  {
    title: 'Camera Angle Ideation',
    imageUrl:
      'https://media.weavy.ai/image/upload/f_auto,q_auto/v1/uploads/D13KHjm958bJaWyp8KGYlyWGlIj2/aa6lo32y9qozccggmvll?_a=BAMAMiWO0',
  },
];

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M3.75 12H20.25"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3.75V20.25"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CaretDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
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

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
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

function SidebarNavItem({
  icon,
  label,
  active,
  disabled,
  trailing,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
  trailing?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        'flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors',
        active
          ? 'bg-card text-foreground'
          : 'text-foreground/80 hover:bg-card/60 hover:text-foreground',
        disabled && 'cursor-not-allowed opacity-40 hover:bg-transparent'
      )}
    >
      <span className="grid h-8 w-8 place-items-center text-foreground/80">
        {icon}
      </span>
      <span className="text-[14px] font-medium">{label}</span>
      <span className="ml-auto text-foreground/80">{trailing}</span>
    </button>
  );
}

function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  return (
    <button
      type="button"
      className="relative h-[120px] w-[190px] shrink-0 overflow-hidden rounded-md bg-card shadow-xs"
    >
      <img
        src={item.imageUrl}
        alt="content poster"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
      <span className="absolute bottom-3 left-3 right-3 truncate text-[13px] font-medium text-white">
        {item.title}
      </span>
    </button>
  );
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

function FileCard({
  workflow,
  onRename,
  onDelete,
  onDuplicate,
  onMove,
}: {
  workflow: Workflow;
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onMove: (workflow: Workflow) => void;
}) {
  const router = useRouter();
  const [renameDialogOpen, setRenameDialogOpen] = React.useState(false);
  const [newName, setNewName] = React.useState(workflow.name);

  const handleOpen = () => {
    router.push(`/dashboard/workflow/${workflow.id}`);
  };

  const handleOpenNewTab = () => {
    window.open(`/dashboard/workflow/${workflow.id}`, '_blank');
  };

  const handleRename = () => {
    if (newName.trim() && newName !== workflow.name) {
      onRename(workflow.id, newName.trim());
    }
    setRenameDialogOpen(false);
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="space-y-2 cursor-pointer" draggable>
            <button
              type="button"
              onClick={handleOpen}
              className="block w-full overflow-hidden rounded-md border border-border bg-card shadow-xs hover:border-foreground/30 transition-colors"
            >
              <div className="h-[220px] w-full bg-background/40">
                <img
                  src={
                    workflow.thumbnail ||
                    'https://app.weavy.ai/workflow-default-cover.png'
                  }
                  alt="workflow cover"
                  className="h-full w-full object-cover invert"
                />
              </div>
            </button>

            <div>
              <div className="text-[16px] font-medium text-foreground">
                {workflow.name}
              </div>
              <div className="text-[14px] text-muted-foreground">
                Last edited {formatTimeAgo(workflow.updatedAt)}
              </div>
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48 bg-card border-border">
          <ContextMenuItem onClick={handleOpen} className="cursor-pointer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Open
          </ContextMenuItem>
          <ContextMenuItem
            onClick={handleOpenNewTab}
            className="cursor-pointer"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Open in a new tab
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            onClick={() => onDuplicate(workflow.id)}
            className="cursor-pointer"
          >
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => onMove(workflow)}
            className="cursor-pointer"
          >
            <FolderInput className="mr-2 h-4 w-4" />
            Move
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              setNewName(workflow.name);
              setRenameDialogOpen(true);
            }}
            className="cursor-pointer"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Rename
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            onClick={() => onDelete(workflow.id)}
            className="cursor-pointer text-red-500 focus:text-red-500"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent className="sm:max-w-[400px] bg-card border-border">
          <DialogHeader>
            <DialogTitle>Rename workflow</DialogTitle>
            <DialogDescription>
              Enter a new name for your workflow.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Workflow name"
              className="w-full"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRename();
              }}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRenameDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRename}
              className="bg-[#faffc7] text-black hover:bg-[#f4f8cd]"
            >
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function FolderCard({
  folder,
  onOpen,
  onRename,
  onDelete,
  onMove,
}: {
  folder: Folder;
  onOpen: (folder: Folder) => void;
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  onMove: (folder: Folder) => void;
}) {
  const [renameDialogOpen, setRenameDialogOpen] = React.useState(false);
  const [newName, setNewName] = React.useState(folder.name);

  const handleOpen = () => {
    onOpen(folder);
  };

  const handleOpenNewTab = () => {
    window.open(`/dashboard?folderId=${folder.id}`, '_blank');
  };

  const handleRename = () => {
    if (newName.trim() && newName !== folder.name) {
      onRename(folder.id, newName.trim());
    }
    setRenameDialogOpen(false);
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <button
            type="button"
            onClick={handleOpen}
            className="group space-y-2 text-left"
          >
            <div className="flex h-[220px] w-full items-center justify-center rounded-md border border-border bg-card shadow-xs transition-colors hover:border-foreground/30">
              <img
                src="https://app.weavy.ai/icons/folder.svg"
                alt="folder"
                className="h-16 w-16 opacity-80 invert"
              />
            </div>
            <div>
              <div className="text-[16px] font-medium text-foreground">
                {folder.name}
              </div>
              <div className="text-[14px] text-muted-foreground">
                {folder.fileCount} Files
              </div>
            </div>
          </button>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48 bg-card border-border">
          <ContextMenuItem onClick={handleOpen} className="cursor-pointer">
            Open
          </ContextMenuItem>
          <ContextMenuItem
            onClick={handleOpenNewTab}
            className="cursor-pointer"
          >
            Open in a new tab
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            onClick={() => {
              setNewName(folder.name);
              setRenameDialogOpen(true);
            }}
            className="cursor-pointer"
          >
            Rename
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => onMove(folder)}
            className="cursor-pointer"
          >
            Move
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            onClick={() => onDelete(folder.id)}
            className="cursor-pointer text-red-500 focus:text-red-500"
          >
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent className="sm:max-w-[400px] bg-card border-border">
          <DialogHeader>
            <DialogTitle>Rename folder</DialogTitle>
            <DialogDescription>
              Enter a new name for your folder.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Folder name"
              className="w-full"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRename();
              }}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRenameDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRename}
              className="bg-[#faffc7] text-black hover:bg-[#f4f8cd]"
            >
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function DashboardPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [workflows, setWorkflows] = React.useState<Workflow[]>([]);
  const [folders, setFolders] = React.useState<Folder[]>([]);
  const [currentFolderId, setCurrentFolderId] = React.useState<string | null>(
    null
  );
  const [breadcrumbs, setBreadcrumbs] = React.useState<
    { id: string | null; name: string }[]
  >([{ id: null, name: 'My files' }]);
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isCreating, setIsCreating] = React.useState(false);
  const [createFolderDialogOpen, setCreateFolderDialogOpen] =
    React.useState(false);
  const [newFolderName, setNewFolderName] = React.useState('');

  // Search state
  const [searchQuery, setSearchQuery] = React.useState('');

  // Move dialog state
  const [moveDialogOpen, setMoveDialogOpen] = React.useState(false);
  const [workflowToMove, setWorkflowToMove] = React.useState<Workflow | null>(
    null
  );
  const [allFolders, setAllFolders] = React.useState<Folder[]>([]);
  const [selectedMoveTarget, setSelectedMoveTarget] = React.useState<
    string | null
  >(null);

  // Filtered folders and workflows based on search query
  const filteredFolders = React.useMemo(() => {
    if (!searchQuery.trim()) return folders;
    const query = searchQuery.toLowerCase();
    return folders.filter((folder) =>
      folder.name.toLowerCase().includes(query)
    );
  }, [folders, searchQuery]);

  const filteredWorkflows = React.useMemo(() => {
    if (!searchQuery.trim()) return workflows;
    const query = searchQuery.toLowerCase();
    return workflows.filter((workflow) =>
      workflow.name.toLowerCase().includes(query)
    );
  }, [workflows, searchQuery]);

  // Handle token from OAuth callback
  React.useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setStoredToken(token);
      api.setToken(token);
      // Remove token from URL
      window.history.replaceState({}, '', '/dashboard');
    }
  }, [searchParams]);

  // Check auth and fetch user + workflows
  React.useEffect(() => {
    const checkAuth = async () => {
      // First check localStorage
      const storedUser = getStoredUser();
      if (storedUser) {
        setUser(storedUser);
      }

      // Then verify with server
      if (isAuthenticated() || api.getToken()) {
        try {
          const response = await api.getSession();
          if (response.success && response.user) {
            setUser(response.user as AuthUser);
            setStoredUser(response.user as AuthUser);

            // Fetch workflows and folders for current folder (root)
            const [workflowsResponse, foldersResponse] = await Promise.all([
              api.getWorkflows(null), // Get root workflows
              api.getFolders(null), // Get root folders
            ]);

            if (workflowsResponse.success && workflowsResponse.workflows) {
              setWorkflows(workflowsResponse.workflows);
            }
            if (foldersResponse.success && foldersResponse.folders) {
              setFolders(foldersResponse.folders);
            }
          } else {
            // Server says invalid - clear and redirect
            clearAuth();
            router.replace('/signin');
          }
        } catch {
          // If server is down, use cached user
          if (!storedUser) {
            clearAuth();
            router.replace('/signin');
          }
        }
      } else {
        router.replace('/signin');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await api.logout();
    clearAuth();
    router.replace('/signin');
  };

  const handleCreateNewFile = React.useCallback(async () => {
    if (isCreating) return;
    setIsCreating(true);

    try {
      const response = await api.createWorkflow('untitled', currentFolderId);
      if (response.success && response.workflow) {
        // Redirect to the new workflow
        router.push(`/dashboard/workflow/${response.workflow.id}`);
      }
    } catch (error) {
      console.error('Failed to create workflow:', error);
    } finally {
      setIsCreating(false);
    }
  }, [isCreating, router, currentFolderId]);

  const handleRenameWorkflow = React.useCallback(
    async (id: string, newName: string) => {
      try {
        const response = await api.updateWorkflow(id, { name: newName });
        if (response.success && response.workflow) {
          setWorkflows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, name: newName } : w))
          );
        }
      } catch (error) {
        console.error('Failed to rename workflow:', error);
      }
    },
    []
  );

  const handleDeleteWorkflow = React.useCallback(async (id: string) => {
    try {
      const response = await api.deleteWorkflow(id);
      if (response.success) {
        setWorkflows((prev) => prev.filter((w) => w.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete workflow:', error);
    }
  }, []);

  const handleDuplicateWorkflow = React.useCallback(
    async (id: string) => {
      try {
        const workflow = workflows.find((w) => w.id === id);
        if (!workflow) return;

        const response = await api.createWorkflow(
          `${workflow.name} (copy)`,
          currentFolderId
        );
        if (response.success && response.workflow) {
          setWorkflows((prev) => [response.workflow!, ...prev]);
        }
      } catch (error) {
        console.error('Failed to duplicate workflow:', error);
      }
    },
    [workflows, currentFolderId]
  );

  // Folder navigation handler
  const handleNavigateToFolder = React.useCallback(
    async (folderId: string | null, folderName?: string) => {
      try {
        const [workflowsResponse, foldersResponse] = await Promise.all([
          api.getWorkflows(folderId),
          api.getFolders(folderId),
        ]);

        if (workflowsResponse.success && workflowsResponse.workflows) {
          setWorkflows(workflowsResponse.workflows);
        }
        if (foldersResponse.success && foldersResponse.folders) {
          setFolders(foldersResponse.folders);
        }

        setCurrentFolderId(folderId);

        // Update breadcrumbs
        if (folderId === null) {
          setBreadcrumbs([{ id: null, name: 'My files' }]);
        } else if (folderName) {
          // Check if we're navigating back in breadcrumbs
          const existingIndex = breadcrumbs.findIndex((b) => b.id === folderId);
          if (existingIndex >= 0) {
            setBreadcrumbs(breadcrumbs.slice(0, existingIndex + 1));
          } else {
            setBreadcrumbs((prev) => [
              ...prev,
              { id: folderId, name: folderName },
            ]);
          }
        }
      } catch (error) {
        console.error('Failed to navigate to folder:', error);
      }
    },
    [breadcrumbs]
  );

  // Create folder handler
  const handleCreateFolder = React.useCallback(async () => {
    if (!newFolderName.trim()) return;

    try {
      const response = await api.createFolder(
        newFolderName.trim(),
        currentFolderId
      );
      if (response.success && response.folder) {
        setFolders((prev) => [response.folder!, ...prev]);
        setCreateFolderDialogOpen(false);
        setNewFolderName('');
      }
    } catch (error) {
      console.error('Failed to create folder:', error);
    }
  }, [newFolderName, currentFolderId]);

  // Folder rename handler
  const handleRenameFolder = React.useCallback(
    async (id: string, newName: string) => {
      try {
        const response = await api.updateFolder(id, newName);
        if (response.success && response.folder) {
          setFolders((prev) =>
            prev.map((f) => (f.id === id ? { ...f, name: newName } : f))
          );
          // Update breadcrumbs if renaming current folder
          setBreadcrumbs((prev) =>
            prev.map((b) => (b.id === id ? { ...b, name: newName } : b))
          );
        }
      } catch (error) {
        console.error('Failed to rename folder:', error);
      }
    },
    []
  );

  // Folder delete handler
  const handleDeleteFolder = React.useCallback(async (id: string) => {
    try {
      const response = await api.deleteFolder(id);
      if (response.success) {
        setFolders((prev) => prev.filter((f) => f.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete folder:', error);
    }
  }, []);

  // Open folder
  const handleOpenFolder = React.useCallback(
    (folder: Folder) => {
      handleNavigateToFolder(folder.id, folder.name);
    },
    [handleNavigateToFolder]
  );

  // Move folder dialog (placeholder - same structure as workflow move)
  const handleMoveFolder = React.useCallback((folder: Folder) => {
    // For now, just log - could implement folder move dialog similar to workflow
    console.log('Move folder:', folder);
  }, []);

  // Open move dialog
  const openMoveDialog = React.useCallback(async (workflow: Workflow) => {
    setWorkflowToMove(workflow);
    setSelectedMoveTarget(workflow.folderId || null);

    try {
      // Fetch all folders for the user (at root level)
      const response = await api.getFolders(null);
      if (response.success && response.folders) {
        setAllFolders(response.folders);
      }
    } catch (error) {
      console.error('Failed to fetch folders:', error);
    }

    setMoveDialogOpen(true);
  }, []);

  // Handle move workflow
  const handleMoveWorkflow = React.useCallback(async () => {
    if (!workflowToMove) return;

    try {
      const response = await api.updateWorkflow(workflowToMove.id, {
        folderId: selectedMoveTarget,
      });
      if (response.success) {
        // If moving to a different folder than current, remove from current view
        if (selectedMoveTarget !== currentFolderId) {
          setWorkflows((prev) =>
            prev.filter((w) => w.id !== workflowToMove.id)
          );
        }
        setMoveDialogOpen(false);
        setWorkflowToMove(null);

        // Refresh folder counts
        const foldersResponse = await api.getFolders(currentFolderId);
        if (foldersResponse.success && foldersResponse.folders) {
          setFolders(foldersResponse.folders);
        }
      }
    } catch (error) {
      console.error('Failed to move workflow:', error);
    }
  }, [workflowToMove, selectedMoveTarget, currentFolderId]);

  const [showcaseTab, setShowcaseTab] = React.useState<
    'workflows' | 'tutorials'
  >('workflows');

  const [filesView, setFilesView] = React.useState<'grid' | 'list'>('grid');

  const showcaseScrollerRef = React.useRef<HTMLDivElement | null>(null);

  const [canScrollShowcaseLeft, setCanScrollShowcaseLeft] =
    React.useState(false);
  const [canScrollShowcaseRight, setCanScrollShowcaseRight] =
    React.useState(false);

  const checkShowcaseScroll = React.useCallback(() => {
    const el = showcaseScrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollShowcaseLeft(scrollLeft > 0);
    setCanScrollShowcaseRight(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  const scrollShowcaseBy = (direction: -1 | 1) => {
    const el = showcaseScrollerRef.current;
    if (!el) return;

    // One card (190) + gap (16) ~= 206, scroll a few cards at a time.
    const delta = direction * 620;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  React.useEffect(() => {
    checkShowcaseScroll();
    window.addEventListener('resize', checkShowcaseScroll);
    return () => window.removeEventListener('resize', checkShowcaseScroll);
  }, [checkShowcaseScroll]);

  return (
    <div className="dark min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="border-b border-border px-4 py-5 md:border-b-0 md:border-r">
          <nav
            aria-label="dashboard navigation"
            className="flex h-full flex-col"
          >
            <div className="flex flex-1 flex-col gap-4">
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left cursor-pointer"
              >
                <div className="h-8 w-8 overflow-hidden rounded-full bg-muted">
                  {user?.avatar ? (
                    <img
                      alt={user.name}
                      src={user.avatar}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-primary text-primary-foreground text-sm font-medium">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                  )}
                </div>
                <span className="truncate text-[14px] font-medium">
                  {user?.name || 'Loading...'}
                </span>
                <CaretDown className="text-foreground/80" />
              </button>

              <Button
                type="button"
                onClick={handleCreateNewFile}
                className="h-11 w-full justify-start rounded-md bg-[#faffc7] px-4 text-[14px] font-medium text-black hover:bg-[#f4f8cd]"
              >
                <PlusIcon />
                Create New File
              </Button>

              <div className="pt-1">
                <div className="flex flex-col gap-1">
                  <div
                    className={cn(
                      'flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors',
                      'bg-card text-foreground'
                    )}
                  >
                    <span className="grid h-8 w-8 place-items-center text-foreground/80">
                      <img
                        src="https://app.weavy.ai/icons/files.svg"
                        alt="files"
                        className="h-5 w-5 invert"
                      />
                    </span>
                    <span className="text-[14px] font-medium">My Files</span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="ml-auto p-1 rounded hover:bg-muted/30 transition-colors"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-40 p-1 bg-card border-border"
                        align="start"
                      >
                        <button
                          type="button"
                          onClick={handleCreateNewFile}
                          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted/30"
                        >
                          <File className="h-4 w-4" />
                          New File
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setNewFolderName('');
                            setCreateFolderDialogOpen(true);
                          }}
                          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted/30"
                        >
                          <FolderPlus className="h-4 w-4" />
                          New Folder
                        </button>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <SidebarNavItem
                    disabled
                    label="Shared with me"
                    icon={<PiUsers className="h-5 w-5" />}
                  />

                  <SidebarNavItem
                    label="Apps"
                    icon={
                      <img
                        src="https://app.weavy.ai/icons/apps.svg"
                        alt="shared-apps"
                        className="h-5 w-5 invert"
                      />
                    }
                  />
                </div>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-foreground/80 hover:bg-card/60 hover:bg-red-200"
              >
                <span className="grid h-8 w-8 place-items-center">
                  <LogOut className="h-5 w-5" />
                </span>
                <span className="text-[14px] font-medium">Logout</span>
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-foreground/80 hover:bg-card/60 hover:text-foreground"
              >
                <span className="grid h-8 w-8 place-items-center">
                  <BsDiscord className="h-5 w-5" />
                </span>
                <span className="text-[14px] font-medium">Discord</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main */}
        <div className="min-w-0 px-4 py-7 sm:px-8">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-[14px] font-medium text-foreground/90">
              {user?.name ? `${user.name}'s Workspace` : 'Loading...'}
            </span>
            <Button
              type="button"
              onClick={handleCreateNewFile}
              className="h-10 rounded-md bg-[#faffc7] px-4 text-[14px] font-medium text-black hover:bg-[#f4f8cd]"
            >
              <PlusIcon />
              Create New File
            </Button>
          </header>

          <main className="pt-6">
            {/* Showcase */}
            <section className="rounded-md border border-border bg-card/60 p-5">
              <div className="flex items-center justify-between">
                <ToggleGroup
                  type="single"
                  value={showcaseTab}
                  onValueChange={(v) => {
                    if (v === 'workflows' || v === 'tutorials')
                      setShowcaseTab(v);
                  }}
                  className="rounded-sm gap-1"
                >
                  <ToggleGroupItem
                    value="workflows"
                    className="h-7 rounded-sm px-4 text-[14px] font-medium data-[state=on]:bg-gray-200"
                  >
                    Workflow library
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="tutorials"
                    className="h-7 rounded-sm px-4 text-[14px] font-medium data-[state=on]:bg-gray-200"
                  >
                    Tutorials
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="group/showcase relative mt-4">
                <div
                  ref={showcaseScrollerRef}
                  onScroll={checkShowcaseScroll}
                  className="no-scrollbar flex min-w-0 gap-4 overflow-x-auto pb-1"
                >
                  {showcaseItems.map((item) => (
                    <ShowcaseCard key={item.title} item={item} />
                  ))}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => scrollShowcaseBy(-1)}
                  disabled={!canScrollShowcaseLeft}
                  className="absolute left-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-sm bg-background/40 opacity-0 transition-opacity hover:bg-background/60 disabled:opacity-0 group-hover/showcase:opacity-100 group-focus-within/showcase:opacity-100"
                  aria-label="scroll left"
                >
                  <img
                    src="/icons/arrow.svg"
                    alt="arrow-left"
                    className="h-4 w-4 rotate-90"
                  />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => scrollShowcaseBy(1)}
                  disabled={!canScrollShowcaseRight}
                  className="absolute right-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-sm bg-background/40 opacity-0 transition-opacity hover:bg-background/60 disabled:opacity-0 group-hover/showcase:opacity-100 group-focus-within/showcase:opacity-100"
                  aria-label="scroll right"
                >
                  <img
                    src="/icons/arrow.svg"
                    alt="arrow-right"
                    className="h-4 w-4 -rotate-90"
                  />
                </Button>
              </div>
            </section>

            {/* My files header row */}
            <section className="pt-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Breadcrumb navigation */}
                <div className="flex items-center gap-1 text-[16px] font-medium text-foreground">
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={crumb.id ?? 'root'}>
                      {index > 0 && (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          handleNavigateToFolder(crumb.id, crumb.name)
                        }
                        className={cn(
                          'hover:text-foreground/80 transition-colors',
                          index === breadcrumbs.length - 1
                            ? 'text-foreground font-semibold'
                            : 'text-muted-foreground'
                        )}
                      >
                        {crumb.name}
                      </button>
                    </React.Fragment>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative w-full sm:w-[260px]">
                    <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/70" />
                    <Input
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-10 rounded-md border-border bg-background/40 pl-10 text-[14px]"
                    />
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setFilesView('list')}
                    aria-pressed={filesView === 'list'}
                    className={cn(
                      'h-9 w-9 rounded-md hover:bg-background/40',
                      filesView === 'list'
                        ? 'bg-background/40'
                        : 'bg-background/20'
                    )}
                    aria-label="list view"
                  >
                    <img src="/icons/list.svg" alt="list" className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setFilesView('grid')}
                    aria-pressed={filesView === 'grid'}
                    className={cn(
                      'h-9 w-9 rounded-md hover:bg-background/60',
                      filesView === 'grid'
                        ? 'bg-background/40'
                        : 'bg-background/20'
                    )}
                    aria-label="grid view"
                  >
                    <img
                      src="/icons/squares.svg"
                      alt="squares"
                      className="h-5 w-5"
                    />
                  </Button>
                </div>
              </div>

              {filesView === 'grid' ? (
                <div className="mt-6">
                  {filteredFolders.length === 0 &&
                  filteredWorkflows.length === 0 ? (
                    /* Empty state */
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="mb-4 rounded-lg border border-border bg-card/40 p-4">
                        <img
                          src="https://app.weavy.ai/icons/folder.svg"
                          alt="folder"
                          className="h-12 w-12 opacity-60 invert"
                        />
                      </div>
                      <h3 className="text-lg font-medium text-foreground">
                        This folder is empty
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Create new files or move files here from other folders
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                      {/* Folder cards */}
                      {filteredFolders.map((folder) => (
                        <FolderCard
                          key={folder.id}
                          folder={folder}
                          onOpen={handleOpenFolder}
                          onRename={handleRenameFolder}
                          onDelete={handleDeleteFolder}
                          onMove={handleMoveFolder}
                        />
                      ))}
                      {/* Workflow cards */}
                      {filteredWorkflows.map((workflow) => (
                        <FileCard
                          key={workflow.id}
                          workflow={workflow}
                          onRename={handleRenameWorkflow}
                          onDelete={handleDeleteWorkflow}
                          onDuplicate={handleDuplicateWorkflow}
                          onMove={openMoveDialog}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-6">
                  {filteredFolders.length === 0 &&
                  filteredWorkflows.length === 0 ? (
                    /* Empty state for list view */
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="mb-4 rounded-lg border border-border bg-card/40 p-4">
                        <img
                          src="https://app.weavy.ai/icons/folder.svg"
                          alt="folder"
                          className="h-12 w-12 opacity-60 invert"
                        />
                      </div>
                      <h3 className="text-lg font-medium text-foreground">
                        This folder is empty
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Create new files or move files here from other folders
                      </p>
                    </div>
                  ) : (
                    <>
                      <Table className="border-separate border-spacing-y-3">
                        <TableHeader className="[&_tr]:border-0">
                          <TableRow className="border-0">
                            <TableHead className="text-muted-foreground px-0">
                              Name
                            </TableHead>
                            <TableHead className="text-muted-foreground text-center">
                              Files
                            </TableHead>
                            <TableHead className="text-muted-foreground text-center">
                              <span className="inline-flex items-center justify-center">
                                Last modified
                                <CaretDown className="ml-1 h-4 w-4" />
                              </span>
                            </TableHead>
                            <TableHead className="text-muted-foreground text-center">
                              Created at
                            </TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          {/* Folder rows */}
                          {filteredFolders.map((folder) => (
                            <ContextMenu key={folder.id}>
                              <ContextMenuTrigger asChild>
                                <TableRow
                                  className="group border-0 hover:bg-transparent cursor-pointer"
                                  onClick={() =>
                                    handleNavigateToFolder(
                                      folder.id,
                                      folder.name
                                    )
                                  }
                                >
                                  <TableCell className="rounded-l-md py-5 pl-4 pr-4 group-hover:bg-card/60">
                                    <div className="flex items-center gap-6">
                                      <div className="flex h-[74px] w-[120px] items-center justify-center rounded-md bg-muted/20">
                                        <img
                                          src="https://app.weavy.ai/icons/folder.svg"
                                          alt="folder"
                                          className="h-10 w-10 opacity-80 invert"
                                        />
                                      </div>
                                      <div className="text-[16px] font-medium text-foreground">
                                        {folder.name}
                                      </div>
                                    </div>
                                  </TableCell>

                                  <TableCell className="py-5 text-center text-foreground group-hover:bg-card/60">
                                    {folder.fileCount} Files
                                  </TableCell>

                                  <TableCell className="py-5 text-center text-foreground group-hover:bg-card/60">
                                    {formatTimeAgo(folder.updatedAt)}
                                  </TableCell>

                                  <TableCell className="rounded-r-md py-5 text-center text-foreground group-hover:bg-card/60">
                                    {formatTimeAgo(folder.createdAt)}
                                  </TableCell>
                                </TableRow>
                              </ContextMenuTrigger>
                              <ContextMenuContent className="w-48 bg-card border-border">
                                <ContextMenuItem
                                  onClick={() =>
                                    handleNavigateToFolder(
                                      folder.id,
                                      folder.name
                                    )
                                  }
                                  className="cursor-pointer"
                                >
                                  Open
                                </ContextMenuItem>
                                <ContextMenuItem
                                  onClick={() =>
                                    window.open(
                                      `/dashboard?folderId=${folder.id}`,
                                      '_blank'
                                    )
                                  }
                                  className="cursor-pointer"
                                >
                                  Open in a new tab
                                </ContextMenuItem>
                                <ContextMenuSeparator />
                                <ContextMenuItem
                                  onClick={() => {
                                    const newName = prompt(
                                      'Enter new folder name:',
                                      folder.name
                                    );
                                    if (newName && newName.trim()) {
                                      handleRenameFolder(
                                        folder.id,
                                        newName.trim()
                                      );
                                    }
                                  }}
                                  className="cursor-pointer"
                                >
                                  Rename
                                </ContextMenuItem>
                                <ContextMenuItem
                                  onClick={() => handleMoveFolder(folder)}
                                  className="cursor-pointer"
                                >
                                  Move
                                </ContextMenuItem>
                                <ContextMenuSeparator />
                                <ContextMenuItem
                                  onClick={() => handleDeleteFolder(folder.id)}
                                  className="cursor-pointer text-red-500 focus:text-red-500"
                                >
                                  Delete
                                </ContextMenuItem>
                              </ContextMenuContent>
                            </ContextMenu>
                          ))}

                          {/* Workflow rows */}
                          {filteredWorkflows.map((workflow) => (
                            <ContextMenu key={workflow.id}>
                              <ContextMenuTrigger asChild>
                                <TableRow
                                  className="group border-0 hover:bg-transparent cursor-pointer"
                                  onClick={() =>
                                    router.push(
                                      `/dashboard/workflow/${workflow.id}`
                                    )
                                  }
                                >
                                  <TableCell className="rounded-l-md py-5 pl-4 pr-4 group-hover:bg-card/60">
                                    <div className="flex items-center gap-6">
                                      <div className="h-[74px] w-[120px] overflow-hidden rounded-md bg-muted/20">
                                        <img
                                          src={
                                            workflow.thumbnail ||
                                            'https://app.weavy.ai/workflow-default-cover.png'
                                          }
                                          alt="workflow cover"
                                          className="h-full w-full object-cover invert"
                                        />
                                      </div>
                                      <div className="text-[16px] font-medium text-foreground">
                                        {workflow.name}
                                      </div>
                                    </div>
                                  </TableCell>

                                  <TableCell className="py-5 text-center text-muted-foreground group-hover:bg-card/60">
                                    —
                                  </TableCell>

                                  <TableCell className="py-5 text-center text-foreground group-hover:bg-card/60">
                                    {formatTimeAgo(workflow.updatedAt)}
                                  </TableCell>

                                  <TableCell className="rounded-r-md py-5 text-center text-foreground group-hover:bg-card/60">
                                    {formatTimeAgo(workflow.createdAt)}
                                  </TableCell>
                                </TableRow>
                              </ContextMenuTrigger>
                              <ContextMenuContent className="w-48 bg-card border-border">
                                <ContextMenuItem
                                  onClick={() =>
                                    router.push(
                                      `/dashboard/workflow/${workflow.id}`
                                    )
                                  }
                                  className="cursor-pointer"
                                >
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Open
                                </ContextMenuItem>
                                <ContextMenuItem
                                  onClick={() =>
                                    window.open(
                                      `/dashboard/workflow/${workflow.id}`,
                                      '_blank'
                                    )
                                  }
                                  className="cursor-pointer"
                                >
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Open in a new tab
                                </ContextMenuItem>
                                <ContextMenuSeparator />
                                <ContextMenuItem
                                  onClick={() =>
                                    handleDuplicateWorkflow(workflow.id)
                                  }
                                  className="cursor-pointer"
                                >
                                  <Copy className="mr-2 h-4 w-4" />
                                  Duplicate
                                </ContextMenuItem>
                                <ContextMenuItem
                                  onClick={() => openMoveDialog(workflow)}
                                  className="cursor-pointer"
                                >
                                  <FolderInput className="mr-2 h-4 w-4" />
                                  Move
                                </ContextMenuItem>
                                <ContextMenuItem
                                  onClick={() => {
                                    const newName = prompt(
                                      'Enter new name:',
                                      workflow.name
                                    );
                                    if (newName && newName.trim()) {
                                      handleRenameWorkflow(
                                        workflow.id,
                                        newName.trim()
                                      );
                                    }
                                  }}
                                  className="cursor-pointer"
                                >
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Rename
                                </ContextMenuItem>
                                <ContextMenuSeparator />
                                <ContextMenuItem
                                  onClick={() =>
                                    handleDeleteWorkflow(workflow.id)
                                  }
                                  className="cursor-pointer text-red-500 focus:text-red-500"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </ContextMenuItem>
                              </ContextMenuContent>
                            </ContextMenu>
                          ))}
                        </TableBody>
                      </Table>

                      <div className="mt-8 flex items-center justify-end gap-2 text-[14px] text-muted-foreground">
                        <span>
                          1–{filteredFolders.length + filteredWorkflows.length}{' '}
                          of {filteredFolders.length + filteredWorkflows.length}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled
                          className="h-9 w-9 rounded-md bg-background/20 hover:bg-background/40 disabled:opacity-40"
                          aria-label="previous page"
                        >
                          <IoIosArrowBack />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled
                          className="h-9 w-9 rounded-md bg-background/20 hover:bg-background/40 disabled:opacity-40"
                          aria-label="next page"
                        >
                          <IoIosArrowForward />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </section>
          </main>
        </div>
      </div>

      {/* Create folder dialog */}
      <Dialog
        open={createFolderDialogOpen}
        onOpenChange={setCreateFolderDialogOpen}
      >
        <DialogContent className="sm:max-w-[400px] bg-card border-border">
          <DialogHeader>
            <DialogTitle>Create folder</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label
              htmlFor="folder-name"
              className="text-sm text-muted-foreground mb-2 block"
            >
              Name
            </label>
            <Input
              id="folder-name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder name"
              className="w-full"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateFolder();
              }}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCreateFolderDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateFolder}
              className="bg-[#faffc7] text-black hover:bg-[#f4f8cd]"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Move dialog */}
      <Dialog open={moveDialogOpen} onOpenChange={setMoveDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-card border-border">
          <DialogHeader>
            <DialogTitle>Move &ldquo;{workflowToMove?.name}&rdquo;</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Current location</span>
              <span className="text-foreground font-medium">
                {workflowToMove?.folderId
                  ? allFolders.find((f) => f.id === workflowToMove.folderId)
                      ?.name || 'Unknown'
                  : 'My Files'}
              </span>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-center gap-2 text-sm mb-2">
                <span className="text-muted-foreground">Dashboard</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground font-medium">My Files</span>
              </div>

              <div className="space-y-1 max-h-[200px] overflow-y-auto">
                {/* Root folder option */}
                <button
                  type="button"
                  onClick={() => setSelectedMoveTarget(null)}
                  className={cn(
                    'w-full px-3 py-2 text-left text-sm rounded-md transition-colors flex items-center gap-2',
                    selectedMoveTarget === null
                      ? 'bg-primary/20 text-foreground'
                      : 'hover:bg-muted/30 text-muted-foreground'
                  )}
                >
                  <FolderIcon className="h-4 w-4" />
                  My Files (root)
                </button>

                {/* Available folders */}
                {allFolders.map((folder) => (
                  <button
                    key={folder.id}
                    type="button"
                    onClick={() => setSelectedMoveTarget(folder.id)}
                    className={cn(
                      'w-full px-3 py-2 text-left text-sm rounded-md transition-colors flex items-center gap-2',
                      selectedMoveTarget === folder.id
                        ? 'bg-primary/20 text-foreground'
                        : 'hover:bg-muted/30 text-foreground'
                    )}
                  >
                    <FolderIcon className="h-4 w-4" />
                    {folder.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMoveDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleMoveWorkflow}
              disabled={
                selectedMoveTarget === (workflowToMove?.folderId || null)
              }
              className="bg-zinc-800 text-white hover:bg-zinc-700 disabled:opacity-50"
            >
              Move
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-background p-6 text-foreground">
          Loading...
        </div>
      }
    >
      <DashboardPageContent />
    </React.Suspense>
  );
}
