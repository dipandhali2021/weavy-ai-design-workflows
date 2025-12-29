---
agent: agent
description: Migrate the existing Next.js project to a brand-new Next.js (latest) project with clean structure, minimal client components, and zero build/lint/type errors.
model: GPT-5.2
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'context7/*', 'memory/*', 'agent', 'todo']
---


## Task

Create a brand-new Next.js (latest) project inside a new folder: `weavyai/`.
Rebuild the site by migrating the existing clone’s pages/components into the new project with clean structure, minimal client components, and **zero build/lint/type errors**. so first read the entire codebase line by line.

## Product Definition (What This Project Does)

This project is a UI clone / prototype of a creator platform with:

- **Unified AI Model Access**: A single interface that surfaces multiple AI models (e.g., Flux Pro, Kling, Luma, Runway Gen-4, SD 3.5, Ideogram) so users can choose and combine them.
- **Node-Based Workflow Builder**: A node graph experience for building scalable, non-linear AI generation workflows (conceptually similar to node tools in pro creative software).

## Required User Journey (Must Be Supported)

1. User lands on the marketing site at `/`.
2. User clicks a **Sign in** CTA and is taken to `/signin`.
3. User chooses **Sign in with Google**.
4. After successful sign-in, user is routed to `/dashboard`.
5. In the dashboard, user can create a new workflow file (a new workflow entry).
6. User opens that workflow and lands on `/dashboard/workflow` where the workflow builder UI is visible.

Notes:

- This is a frontend rebuild/migration task. Authentication can be implemented as a UI-only flow if required secrets/providers are unavailable, but the UI route transitions and states must work without runtime errors.

## Hard Constraints

- Package manager: **bun only** (use `bun install`, `bun run dev`, `bun run build`, etc.).
- Use **Next.js App Router** with **TypeScript**, **Tailwind CSS**, and **ESLint**.
- Use a `src/` directory and an import alias **`@/*`**.
- Preserve the existing visual design as closely as possible.
- Do not invent new themes, colors, fonts, shadows, pages, modals, or UX features.
- Prefer **React Server Components** by default; add `'use client'` only when hooks/event handlers are required.
- Keep changes isolated to `weavyai/` (do not refactor the old project unless strictly required for shared assets).

## Source Material (Existing Repo)

Use the current workspace as the migration source (components, pages, styles, assets). Copy/adapt code from:

- `src/app/**` (routes)
- `src/components/**` (sections, UI primitives, workflow)
- `src/lib/**`, `src/hooks/**`
- `public/**`

## Target Structure (Inside weavyai/)

- `weavyai/src/app/` (routes: `/`, `/signin`, `/dashboard`, `/dashboard/workflow`)
- `weavyai/src/components/ui/` (shadcn/radix primitives)
- `weavyai/src/components/sections/` (marketing sections)
- `weavyai/src/components/workflow/` (workflow builder + nodes)
- `weavyai/src/lib/` (utilities)
- `weavyai/src/hooks/` (custom hooks)
- `weavyai/public/` (assets)

## Migration Order (Keep the project green after each step)

1. Scaffold Next.js app in `weavyai/` with TS + App Router + Tailwind + ESLint + `src/` + `@/*`.
2. Migrate base styling and layout (`globals.css`, root `layout.tsx`, fonts if any).
3. Migrate UI primitives first (`components/ui`) so other components compile.
4. Migrate shared sections (`components/sections`) and shared layout parts (navbar/footer).
5. Migrate workflow components (`components/workflow`). Ensure client boundaries are minimal.
6. Migrate routes one-by-one under `weavyai/src/app/**` and fix imports to `@/*`.
7. Migrate `public/` assets and fix any paths.
8. Align dependencies (only what’s actually used). Remove unused deps.

## Quality, Validation, and Security

- Add input validation for any form inputs (e.g., sign-in) using a schema validator (Zod preferred).
- Never trust user input; validate/normalize before use.
- Do not expose secrets; only use `NEXT_PUBLIC_*` for safe public values.
- Use guard clauses and early returns for invalid states.
- Avoid unnecessary `useEffect` and global state.
- remember to use tailwindcss properly setting its global file properly.

## Acceptance Criteria (Must Pass)

- `cd weavyai && bun install`
- `cd weavyai && bun run lint` passes with zero errors.
- `cd weavyai && bun run build` succeeds.
- TypeScript has zero errors (via Next build and/or an explicit typecheck script if present).
- The following routes render without runtime errors:
  - `/`
  - `/signin`
  - `/dashboard`
  - `/dashboard/workflow`

## User Flow Acceptance (Must Work)

- From `/`, the Sign in CTA navigates to `/signin`.
- On `/signin`, the **Sign in with Google** action transitions to an authenticated state and navigates to `/dashboard` (real OAuth if configured; otherwise a safe mocked/dev flow).
- On `/dashboard`, user can create a new workflow entry, and navigating/opening it loads the workflow builder page at `/dashboard/workflow`.

## Deliverables

- A fully working Next.js project in `weavyai/` that reproduces the UI using clean, maintainable code.
- No failing lint/build/type checks.
- Minimal `'use client'` usage with clear component boundaries.
