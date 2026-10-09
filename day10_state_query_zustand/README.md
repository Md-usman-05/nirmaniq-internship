# Day 10 — State Management & Data Fetching

NirmanIQ internship training — Day 10.

## Overview

Covered TanStack React Query for server state and Zustand for client-side UI state. Built a Project Dashboard demonstrating caching, invalidation, optimistic updates, and persisted UI stores.

## Concepts Covered

- TanStack React Query: `useQuery`, `useMutation`, `QueryClient`, `QueryClientProvider`
- Automatic caching, refetching, stale-while-revalidate
- Query keys as cache identity + invalidation with `queryClient.invalidateQueries()`
- Mutations with `onSuccess`, `onMutate`, `onError` — optimistic updates + rollback
- Zustand for client-only UI state (vs Redux and Context API)
- Zustand `persist` middleware for auth token
- React Query for server state + Zustand for UI state (NirmanIQ convention)

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Server State | TanStack React Query |
| Client State | Zustand |
| Icons | lucide-react |
| Toasts | Sonner |

## Exercises

### Exercise 1 — TanStack React Query + useProjects

- Configured `QueryClient` in `app/providers.tsx` with `staleTime` and disabled focus refetching.
- Mounted `ReactQueryDevtools`.
- `useProjects()` hook wrapping `useQuery` against a mock API.
- Loading, error, and data states displayed on `/projects`.

### Exercise 2 — useCreateProject mutation

- `useCreateProject()` hook wrapping `useMutation`.
- `onMutate` inserts an optimistic project immediately.
- `onError` rolls back to the previous snapshot.
- `onSuccess` invalidates `["projects"]` so the list auto-refreshes.

### Exercise 3 — Zustand stores

- `useAuthStore` — `user`, `token`, `isAuthenticated`, `login`, `logout`.
  Persisted to localStorage under key `nirmaniq-auth`.
- `useUIStore` — `sidebarOpen`, `selectedFilters`, `viewMode` with `toggleSidebar`, `setSelectedFilters`, `setViewMode`.

### Exercise 4 — Wire Project List

- React Query fetches projects and stats.
- Zustand controls filters and view mode (Table / Grid).
- Page combines both: filtered list, toggleable layout, live stats.

## File Structure
day10_state_query_zustand/
├── app/
│ ├── layout.tsx
│ ├── providers.tsx
│ ├── page.tsx
│ ├── globals.css
│ └── projects/
│ └── page.tsx
├── components/
│ ├── ui/
│ │ ├── badge.tsx
│ │ ├── button.tsx
│ │ ├── card.tsx
│ │ ├── dialog.tsx
│ │ ├── input.tsx
│ │ ├── progress.tsx
│ │ ├── select.tsx
│ │ └── table.tsx
│ ├── filters.tsx
│ ├── new-project-dialog.tsx
│ ├── project-list.tsx
│ ├── project-table.tsx
│ └── stats-cards.tsx
├── hooks/
│ ├── use-create-project.ts
│ └── use-projects.ts
├── lib/
│ ├── mock-api.ts
│ ├── projects.ts
│ └── utils.ts
├── store/
│ ├── auth-store.ts
│ └── ui-store.ts
├── next.config.ts
├── postcss.config.mjs
├── package.json
└── tsconfig.json