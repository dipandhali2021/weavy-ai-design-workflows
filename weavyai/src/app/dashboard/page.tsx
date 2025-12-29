'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
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
import { cn } from '@/lib/utils';
import { getIsAuthenticated } from '@/lib/auth';
import { BsDiscord } from 'react-icons/bs';
import { PiUsers } from 'react-icons/pi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

type ShowcaseItem = {
  title: string;
  imageUrl: string;
};

type FileItem = {
  title: string;
  lastEdited: string;
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

const fileItems: FileItem[] = [
  { title: 'untitled', lastEdited: 'Last edited 3 days ago' },
  { title: 'My First Weavy', lastEdited: 'Last edited 3 days ago' },
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

function FileCard({ item }: { item: FileItem }) {
  const router = useRouter();

  return (
    <div className="space-y-2" draggable>
      <button
        type="button"
        onClick={() => router.push('/dashboard/workflow')}
        className="block w-full overflow-hidden rounded-md border border-border bg-card shadow-xs"
      >
        <div className="h-[220px] w-full bg-background/40">
          <img
            src="https://app.weavy.ai/workflow-default-cover.png"
            alt="workflow cover"
            className="h-full w-full object-cover invert"
          />
        </div>
      </button>

      <div>
        <div className="text-[16px] font-medium text-foreground">
          {item.title}
        </div>
        <div className="text-[14px] text-muted-foreground">
          {item.lastEdited}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();

  const [files, setFiles] = React.useState<FileItem[]>(fileItems);

  React.useEffect(() => {
    if (!getIsAuthenticated()) router.replace('/signin');
  }, [router]);

  const handleCreateNewFile = React.useCallback(() => {
    setFiles((prev) => {
      const nextIndex = prev.length + 1;
      const title = prev.some((f) => f.title === 'untitled')
        ? `untitled ${nextIndex}`
        : 'untitled';
      return [{ title, lastEdited: 'Just now' }, ...prev];
    });
  }, []);

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

  const listTimeLabel = React.useCallback((label: string) => {
    return label.replace(/^Last edited\s+/i, '');
  }, []);

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
                  <img
                    alt="user.displayName"
                    src="https://lh3.googleusercontent.com/a/ACg8ocKLQV0fwIA3-izVDIGno9D2HhJ_F5exZkmy3w3y1J6eJvw6sg=s96-c"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="truncate text-[14px] font-medium">
                  Methyl Blue
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
                  <SidebarNavItem
                    active
                    label="My Files"
                    icon={
                      <img
                        src="https://app.weavy.ai/icons/files.svg"
                        alt="files"
                        className="h-5 w-5 invert"
                      />
                    }
                    trailing={<PlusIcon className="h-4 w-4" />}
                  />

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
              Methyl Blue&apos;s Workspace
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
                <div className="text-[16px] font-medium text-foreground">
                  My files
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative w-full sm:w-[260px]">
                    <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/70" />
                    <Input
                      placeholder="Search"
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
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {files.map((item) => (
                    <FileCard key={item.title} item={item} />
                  ))}
                </div>
              ) : (
                <div className="mt-6">
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
                      {files.map((item) => (
                        <TableRow
                          key={item.title}
                          className="group border-0 hover:bg-transparent"
                        >
                          <TableCell className="rounded-l-md  py-5 pl-4 pr-4 group-hover:bg-card/60">
                            <div className="flex items-center gap-6">
                              <div className="h-[74px] w-[150px] overflow-hidden rounded-md bg-muted/20">
                                <img
                                  src="https://app.weavy.ai/workflow-default-cover.png"
                                  alt="workflow cover"
                                  className="h-full w-full object-cover invert"
                                />
                              </div>
                              <div className="text-[16px] font-medium text-foreground">
                                {item.title}
                              </div>
                            </div>
                          </TableCell>

                          <TableCell className=" py-5 text-center text-muted-foreground group-hover:bg-card/60">
                            —
                          </TableCell>

                          <TableCell className=" py-5 text-center text-foreground group-hover:bg-card/60">
                            {listTimeLabel(item.lastEdited)}
                          </TableCell>

                          <TableCell className="rounded-r-md  py-5 text-center text-foreground group-hover:bg-card/60">
                            {listTimeLabel(item.lastEdited)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="mt-8 flex items-center justify-end gap-2 text-[14px] text-muted-foreground">
                    <span>
                      1–{files.length} of {files.length}
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
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
