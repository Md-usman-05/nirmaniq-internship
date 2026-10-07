# Day 8: Next.js App Router & Routing

This module transitions from plain client-side React to Next.js, focusing on Server-Side Rendering (SSR), file-based routing, and optimizing the critical rendering path.

## Architecture & Implementation

1. **App Router & Shared Layouts**
   * **`layout.tsx` & `Navigation.tsx`:** Implements a persistent global shell. Uses the `'use client'` directive to read the active URL via `usePathname()` and highlights the active route. Responsive design automatically converts the desktop sidebar into a mobile bottom-nav.
   * **`page.tsx`:** Server Components acting as the main entry points for the Dashboard (`/`) and Projects (`/projects`) routes.

2. **Dynamic & Nested Routing**
   * **`[id]/page.tsx` & `towers/[towerId]/page.tsx`:** Utilizes Next.js dynamic folder structures to build nested routes. 
   * **Async Params:** Both dynamic routes and search parameters (`?status=active`) are awaited as Promises, ensuring strict compatibility with Next.js dynamic rendering constraints.
   * **`instant = false`:** Applied to dynamic routes to explicitly manage server pre-rendering behavior and prevent instant-shell blocking errors.

3. **Error Handling & Streaming**
   * **`loading.tsx`:** Automatically intercepts server delays and streams a CSS-animated skeleton loader to the browser while the actual page compiles.
   * **`error.tsx`:** A Client Component error boundary that catches runtime crashes and provides a localized `reset()` function to recover without dropping the user's session.

## Tech Stack
* Next.js (App Router)
* React (Server & Client Components)
* TypeScript (Strict Mode)