'use client';

import * as React from 'react';
import { Suspense } from 'react';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { isAuthenticated, getStoredUser, setStoredToken, setStoredUser, clearAuth, type AuthUser } from '@/lib/auth';
import { api, type Workflow, type Folder } from '@/lib/api';
import { BsDiscord } from 'react-icons/bs';
import { PiUsers } from 'react-icons/pi';
import {
  LogOut,
  File,
  FolderPlus,
  ChevronRight,
  ChevronDown,
  Plus,
  Search,
} from 'lucide-react';

// Import modular dashboard components
import {
  SidebarNavItem,
  ShowcaseCard,
  FileCard,
  FolderCard,
  MoveDialog,
  CreateFolderDialog,
  SHOWCASE_ITEMS,
  formatTimeAgo,
} from '@/components/dashboard';

/**
 * DashboardContent Component
 * 
 * The main dashboard content, handling:
 * - Authentication
 * - Workflow and folder management
 * - File/folder navigation
 * - Search and filtering
 */
function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for workflows and folders
  const [workflows, setWorkflows] = React.useState<Workflow[]>([]);
  const [folders, setFolders] = React.useState<Folder[]>([]);
  const [currentFolderId, setCurrentFolderId] = React.useState<string | null>(null);
  const [breadcrumbs, setBreadcrumbs] = React.useState<{ id: string | null; name: string }[]>([{ id: null, name: 'My files' }]);
  
  // Auth state
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isCreating, setIsCreating] = React.useState(false);
  
  // Dialog states
  const [createFolderDialogOpen, setCreateFolderDialogOpen] = React.useState(false);
  const [newFolderName, setNewFolderName] = React.useState('');
  const [moveDialogOpen, setMoveDialogOpen] = React.useState(false);
  const [workflowToMove, setWorkflowToMove] = React.useState<Workflow | null>(null);
  const [allFolders, setAllFolders] = React.useState<Folder[]>([]);
  const [selectedMoveTarget, setSelectedMoveTarget] = React.useState<string | null>(null);

  // Search and view state
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showcaseTab, setShowcaseTab] = React.useState<'workflows' | 'tutorials'>('workflows');
  const [filesView, setFilesView] = React.useState<'grid' | 'list'>('grid');

  // Showcase scroll
  const showcaseScrollerRef = React.useRef<HTMLDivElement | null>(null);
  const [canScrollShowcaseLeft, setCanScrollShowcaseLeft] = React.useState(false);
  const [canScrollShowcaseRight, setCanScrollShowcaseRight] = React.useState(false);

  // Filtered data
  const filteredFolders = React.useMemo(() => {
    if (!searchQuery.trim()) return folders;
    const query = searchQuery.toLowerCase();
    return folders.filter(folder => folder.name.toLowerCase().includes(query));
  }, [folders, searchQuery]);

  const filteredWorkflows = React.useMemo(() => {
    if (!searchQuery.trim()) return workflows;
    const query = searchQuery.toLowerCase();
    return workflows.filter(workflow => workflow.name.toLowerCase().includes(query));
  }, [workflows, searchQuery]);

  // Handle token from OAuth callback
  React.useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setStoredToken(token);
      api.setToken(token);
      window.history.replaceState({}, '', '/dashboard');
    }
  }, [searchParams]);

  // Auth check and data fetch
  React.useEffect(() => {
    const checkAuth = async () => {
      const storedUser = getStoredUser();
      if (storedUser) {
        setUser(storedUser);
      }

      if (isAuthenticated() || api.getToken()) {
        try {
          const response = await api.getSession();
          if (response.success && response.user) {
            setUser(response.user as AuthUser);
            setStoredUser(response.user as AuthUser);
            
            const [workflowsResponse, foldersResponse] = await Promise.all([
              api.getWorkflows(null),
              api.getFolders(null),
            ]);
            
            if (workflowsResponse.success && workflowsResponse.workflows) {
              setWorkflows(workflowsResponse.workflows);
            }
            if (foldersResponse.success && foldersResponse.folders) {
              setFolders(foldersResponse.folders);
            }
          } else {
            clearAuth();
            router.replace('/signin');
          }
        } catch {
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

  // Handlers
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
        router.push(`/dashboard/workflow/${response.workflow.id}`);
      }
    } catch (error) {
      console.error('Failed to create workflow:', error);
    } finally {
      setIsCreating(false);
    }
  }, [isCreating, router, currentFolderId]);

  const handleRenameWorkflow = React.useCallback(async (id: string, newName: string) => {
    try {
      const response = await api.updateWorkflow(id, { name: newName });
      if (response.success && response.workflow) {
        setWorkflows(prev => prev.map(w => w.id === id ? { ...w, name: newName } : w));
      }
    } catch (error) {
      console.error('Failed to rename workflow:', error);
    }
  }, []);

  const handleDeleteWorkflow = React.useCallback(async (id: string) => {
    try {
      const response = await api.deleteWorkflow(id);
      if (response.success) {
        setWorkflows(prev => prev.filter(w => w.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete workflow:', error);
    }
  }, []);

  const handleDuplicateWorkflow = React.useCallback(async (id: string) => {
    try {
      const workflow = workflows.find(w => w.id === id);
      if (!workflow) return;
      
      const response = await api.createWorkflow(`${workflow.name} (copy)`, currentFolderId);
      if (response.success && response.workflow) {
        setWorkflows(prev => [response.workflow!, ...prev]);
      }
    } catch (error) {
      console.error('Failed to duplicate workflow:', error);
    }
  }, [workflows, currentFolderId]);

  const handleNavigateToFolder = React.useCallback(async (folderId: string | null, folderName?: string) => {
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
      
      if (folderId === null) {
        setBreadcrumbs([{ id: null, name: 'My files' }]);
      } else if (folderName) {
        const existingIndex = breadcrumbs.findIndex(b => b.id === folderId);
        if (existingIndex >= 0) {
          setBreadcrumbs(breadcrumbs.slice(0, existingIndex + 1));
        } else {
          setBreadcrumbs(prev => [...prev, { id: folderId, name: folderName }]);
        }
      }
    } catch (error) {
      console.error('Failed to navigate to folder:', error);
    }
  }, [breadcrumbs]);

  const handleCreateFolder = React.useCallback(async () => {
    if (!newFolderName.trim()) return;
    
    try {
      const response = await api.createFolder(newFolderName.trim(), currentFolderId);
      if (response.success && response.folder) {
        setFolders(prev => [response.folder!, ...prev]);
        setCreateFolderDialogOpen(false);
        setNewFolderName('');
      }
    } catch (error) {
      console.error('Failed to create folder:', error);
    }
  }, [newFolderName, currentFolderId]);

  const handleRenameFolder = React.useCallback(async (id: string, newName: string) => {
    try {
      const response = await api.updateFolder(id, newName);
      if (response.success && response.folder) {
        setFolders(prev => prev.map(f => f.id === id ? { ...f, name: newName } : f));
        setBreadcrumbs(prev => prev.map(b => b.id === id ? { ...b, name: newName } : b));
      }
    } catch (error) {
      console.error('Failed to rename folder:', error);
    }
  }, []);

  const handleDeleteFolder = React.useCallback(async (id: string) => {
    try {
      const response = await api.deleteFolder(id);
      if (response.success) {
        setFolders(prev => prev.filter(f => f.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete folder:', error);
    }
  }, []);

  const handleOpenFolder = React.useCallback((folder: Folder) => {
    handleNavigateToFolder(folder.id, folder.name);
  }, [handleNavigateToFolder]);

  const handleMoveFolder = React.useCallback((folder: Folder) => {
    console.log('Move folder:', folder);
  }, []);

  const openMoveDialog = React.useCallback(async (workflow: Workflow) => {
    setWorkflowToMove(workflow);
    setSelectedMoveTarget(workflow.folderId || null);
    
    try {
      const response = await api.getFolders(null);
      if (response.success && response.folders) {
        setAllFolders(response.folders);
      }
    } catch (error) {
      console.error('Failed to fetch folders:', error);
    }
    
    setMoveDialogOpen(true);
  }, []);

  const handleMoveWorkflow = React.useCallback(async () => {
    if (!workflowToMove) return;
    
    try {
      const response = await api.updateWorkflow(workflowToMove.id, { folderId: selectedMoveTarget });
      if (response.success) {
        if (selectedMoveTarget !== currentFolderId) {
          setWorkflows(prev => prev.filter(w => w.id !== workflowToMove.id));
        }
        setMoveDialogOpen(false);
        setWorkflowToMove(null);
        
        const foldersResponse = await api.getFolders(currentFolderId);
        if (foldersResponse.success && foldersResponse.folders) {
          setFolders(foldersResponse.folders);
        }
      }
    } catch (error) {
      console.error('Failed to move workflow:', error);
    }
  }, [workflowToMove, selectedMoveTarget, currentFolderId]);

  // Showcase scroll handlers
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
    const delta = direction * 620;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  React.useEffect(() => {
    checkShowcaseScroll();
    window.addEventListener('resize', checkShowcaseScroll);
    return () => window.removeEventListener('resize', checkShowcaseScroll);
  }, [checkShowcaseScroll]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-foreground/60">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dark min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="border-b border-border px-4 py-5 md:border-b-0 md:border-r">
          <nav aria-label="dashboard navigation" className="flex h-full flex-col">
            <div className="flex flex-1 flex-col gap-4">
              {/* User button */}
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left cursor-pointer"
              >
                <div className="h-8 w-8 overflow-hidden rounded-full bg-muted">
                  {user?.avatar ? (
                    <img alt={user.name} src={user.avatar} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-primary text-primary-foreground text-sm font-medium">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                  )}
                </div>
                <span className="truncate text-[14px] font-medium">{user?.name || 'Loading...'}</span>
                <ChevronDown className="h-3 w-3 text-foreground/80" />
              </button>

              {/* Create button */}
              <Button
                type="button"
                onClick={handleCreateNewFile}
                className="h-11 w-full justify-start rounded-md bg-[#faffc7] px-4 text-[14px] font-medium text-black hover:bg-[#f4f8cd]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New File
              </Button>

              {/* Navigation items */}
              <div className="pt-1">
                <div className="flex flex-col gap-1">
                  <div className={cn(
                    'flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors',
                    'bg-card text-foreground'
                  )}>
                    <span className="grid h-8 w-8 place-items-center text-foreground/80">
                      <img src="https://app.weavy.ai/icons/files.svg" alt="files" className="h-5 w-5 invert" />
                    </span>
                    <span className="text-[14px] font-medium">My Files</span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button type="button" className="ml-auto p-1 rounded hover:bg-muted/30 transition-colors">
                          <Plus className="h-4 w-4" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-40 p-1 bg-card border-border" align="start">
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

                  <SidebarNavItem disabled label="Shared with me" icon={<PiUsers className="h-5 w-5" />} />
                  <SidebarNavItem
                    label="Apps"
                    icon={<img src="https://app.weavy.ai/icons/apps.svg" alt="apps" className="h-5 w-5 invert" />}
                  />
                </div>
              </div>
            </div>

            {/* Bottom actions */}
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

        {/* Main content */}
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
              <Plus className="h-4 w-4 mr-2" />
              Create New File
            </Button>
          </header>

          <main className="pt-6">
            {/* Showcase section */}
            <section className="rounded-md border border-border bg-card/60 p-5">
              <div className="flex items-center justify-between">
                <ToggleGroup
                  type="single"
                  value={showcaseTab}
                  onValueChange={(v) => {
                    if (v === 'workflows' || v === 'tutorials') setShowcaseTab(v);
                  }}
                  className="rounded-sm gap-1"
                >
                  <ToggleGroupItem value="workflows" className="h-7 rounded-sm px-4 text-[14px] font-medium data-[state=on]:bg-gray-200">
                    Workflow library
                  </ToggleGroupItem>
                  <ToggleGroupItem value="tutorials" className="h-7 rounded-sm px-4 text-[14px] font-medium data-[state=on]:bg-gray-200">
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
                  {SHOWCASE_ITEMS.map((item) => (
                    <ShowcaseCard key={item.title} item={item} />
                  ))}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => scrollShowcaseBy(-1)}
                  disabled={!canScrollShowcaseLeft}
                  className="absolute left-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-sm bg-background/40 opacity-0 transition-opacity hover:bg-background/60 disabled:opacity-0 group-hover/showcase:opacity-100"
                  aria-label="scroll left"
                >
                  <img src="/icons/arrow.svg" alt="arrow-left" className="h-4 w-4 rotate-90" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => scrollShowcaseBy(1)}
                  disabled={!canScrollShowcaseRight}
                  className="absolute right-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-sm bg-background/40 opacity-0 transition-opacity hover:bg-background/60 disabled:opacity-0 group-hover/showcase:opacity-100"
                  aria-label="scroll right"
                >
                  <img src="/icons/arrow.svg" alt="arrow-right" className="h-4 w-4 -rotate-90" />
                </Button>
              </div>
            </section>

            {/* Files section */}
            <section className="pt-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Breadcrumb */}
                <div className="flex items-center gap-1 text-[16px] font-medium text-foreground">
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={crumb.id ?? 'root'}>
                      {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                      <button
                        type="button"
                        onClick={() => handleNavigateToFolder(crumb.id, crumb.name)}
                        className={cn(
                          "hover:text-foreground/80 transition-colors",
                          index === breadcrumbs.length - 1 ? "text-foreground font-semibold" : "text-muted-foreground"
                        )}
                      >
                        {crumb.name}
                      </button>
                    </React.Fragment>
                  ))}
                </div>

                {/* Search and view toggle */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative w-full sm:w-[260px]">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/70" />
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
                      filesView === 'list' ? 'bg-background/40' : 'bg-background/20'
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
                      filesView === 'grid' ? 'bg-background/40' : 'bg-background/20'
                    )}
                    aria-label="grid view"
                  >
                    <img src="/icons/squares.svg" alt="squares" className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Grid view */}
              {filesView === 'grid' ? (
                <div className="mt-6">
                  {filteredFolders.length === 0 && filteredWorkflows.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="mb-4 rounded-lg border border-border bg-card/40 p-4">
                        <img src="https://app.weavy.ai/icons/folder.svg" alt="folder" className="h-12 w-12 opacity-60 invert" />
                      </div>
                      <h3 className="text-lg font-medium text-foreground">This folder is empty</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Create new files or move files here from other folders</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
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
                /* List view */
                <div className="mt-6">
                  {filteredFolders.length === 0 && filteredWorkflows.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="mb-4 rounded-lg border border-border bg-card/40 p-4">
                        <img src="https://app.weavy.ai/icons/folder.svg" alt="folder" className="h-12 w-12 opacity-60 invert" />
                      </div>
                      <h3 className="text-lg font-medium text-foreground">This folder is empty</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Create new files or move files here from other folders</p>
                    </div>
                  ) : (
                    <Table className="border-separate border-spacing-y-3">
                      <TableHeader className="[&_tr]:border-0">
                        <TableRow className="border-0">
                          <TableHead className="text-muted-foreground px-0">Name</TableHead>
                          <TableHead className="text-muted-foreground text-center">Files</TableHead>
                          <TableHead className="text-muted-foreground text-center">Last modified</TableHead>
                          <TableHead className="text-muted-foreground text-center">Created at</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* Folder rows */}
                        {filteredFolders.map((folder) => (
                          <ContextMenu key={folder.id}>
                            <ContextMenuTrigger asChild>
                              <TableRow
                                className="group border-0 hover:bg-transparent cursor-pointer"
                                onClick={() => handleNavigateToFolder(folder.id, folder.name)}
                              >
                                <TableCell className="rounded-l-md py-5 pl-4 pr-4 group-hover:bg-card/60">
                                  <div className="flex items-center gap-6">
                                    <div className="flex h-[74px] w-[120px] items-center justify-center rounded-md bg-muted/20">
                                      <img src="https://app.weavy.ai/icons/folder.svg" alt="folder" className="h-10 w-10 opacity-80 invert" />
                                    </div>
                                    <span className="text-[14px] font-medium">{folder.name}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-center group-hover:bg-card/60">{folder.fileCount}</TableCell>
                                <TableCell className="text-center group-hover:bg-card/60">{formatTimeAgo(folder.updatedAt)}</TableCell>
                                <TableCell className="rounded-r-md text-center group-hover:bg-card/60">{formatTimeAgo(folder.createdAt)}</TableCell>
                              </TableRow>
                            </ContextMenuTrigger>
                            <ContextMenuContent className="w-48 bg-card border-border">
                              <ContextMenuItem onClick={() => handleNavigateToFolder(folder.id, folder.name)}>Open</ContextMenuItem>
                              <ContextMenuSeparator />
                              <ContextMenuItem onClick={() => handleDeleteFolder(folder.id)} className="text-red-500 focus:text-red-500">Delete</ContextMenuItem>
                            </ContextMenuContent>
                          </ContextMenu>
                        ))}

                        {/* Workflow rows */}
                        {filteredWorkflows.map((workflow) => (
                          <ContextMenu key={workflow.id}>
                            <ContextMenuTrigger asChild>
                              <TableRow
                                className="group border-0 hover:bg-transparent cursor-pointer"
                                onClick={() => router.push(`/dashboard/workflow/${workflow.id}`)}
                              >
                                <TableCell className="rounded-l-md py-5 pl-4 pr-4 group-hover:bg-card/60">
                                  <div className="flex items-center gap-6">
                                    <div className="h-[74px] w-[120px] rounded-md bg-muted/20 overflow-hidden">
                                      <img
                                        src={workflow.thumbnail || 'https://app.weavy.ai/workflow-default-cover.png'}
                                        alt="workflow"
                                        className="h-full w-full object-cover invert"
                                      />
                                    </div>
                                    <span className="text-[14px] font-medium">{workflow.name}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-center group-hover:bg-card/60">-</TableCell>
                                <TableCell className="text-center group-hover:bg-card/60">{formatTimeAgo(workflow.updatedAt)}</TableCell>
                                <TableCell className="rounded-r-md text-center group-hover:bg-card/60">{formatTimeAgo(workflow.createdAt)}</TableCell>
                              </TableRow>
                            </ContextMenuTrigger>
                            <ContextMenuContent className="w-48 bg-card border-border">
                              <ContextMenuItem onClick={() => router.push(`/dashboard/workflow/${workflow.id}`)}>Open</ContextMenuItem>
                              <ContextMenuSeparator />
                              <ContextMenuItem onClick={() => handleDeleteWorkflow(workflow.id)} className="text-red-500 focus:text-red-500">Delete</ContextMenuItem>
                            </ContextMenuContent>
                          </ContextMenu>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              )}
            </section>
          </main>
        </div>
      </div>

      {/* Dialogs */}
      <MoveDialog
        open={moveDialogOpen}
        onOpenChange={setMoveDialogOpen}
        workflow={workflowToMove}
        folders={allFolders}
        selectedTarget={selectedMoveTarget}
        onSelectTarget={setSelectedMoveTarget}
        onMove={handleMoveWorkflow}
      />

      <CreateFolderDialog
        open={createFolderDialogOpen}
        onOpenChange={setCreateFolderDialogOpen}
        folderName={newFolderName}
        onFolderNameChange={setNewFolderName}
        onCreate={handleCreateFolder}
      />
    </div>
  );
}

/**
 * DashboardPage
 * 
 * The dashboard page wrapped in Suspense for search params
 */
export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="dark h-screen flex items-center justify-center bg-background"><div className="text-foreground/60">Loading...</div></div>}>
      <DashboardContent />
    </Suspense>
  );
}
