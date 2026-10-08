# Day 9 — Tailwind CSS & shadcn/ui

## Overview

This project is a responsive NirmanIQ project portfolio built with Next.js, Tailwind CSS, and shadcn/ui components. It demonstrates a sortable project table, a validated project creation dialog, toast feedback, and a system-aware light and dark theme toggle.

## Concepts Covered

- Tailwind CSS utility-first styling and composing reusable interfaces from utilities
- Mobile-first responsive design with `sm:`, `md:`, and `lg:` breakpoints
- Dark mode with Tailwind's `dark:` variant, CSS custom properties, and system theme preference
- shadcn/ui as customizable, source-owned components built on accessible primitives
- Accessible, composable interactions with Radix/Base UI primitives and semantic HTML

## Tech Stack

| Technology | Purpose |
| --- | --- |
| Next.js 16 | App Router application framework |
| TypeScript | Typed application code |
| Tailwind CSS | Utility-first styling and responsive layouts |
| shadcn/ui | Customizable UI components |
| lucide-react | Interface icons |
| sonner | Toast notifications |
| next-themes | System-aware theme management |

## Exercises

### Exercise 1 — Install shadcn/ui components

- [x] Configure shadcn/ui and Tailwind CSS
- [x] Add Button, Card, Dialog, Table, Select, Input, and Badge components
- [x] Install Sonner for toast notifications

### Exercise 2 — Build the Project List

- [x] Display project name, status, progress, risk level, and last updated date
- [x] Sort every table column in ascending or descending order
- [x] Show status and risk badges and a progress bar
- [x] Allow horizontal scrolling on narrow screens

### Exercise 3 — Create Project dialog

- [x] Build the dialog with shadcn/ui Dialog, Input, and Select components
- [x] Require a name, status, and last updated date, with validation feedback
- [x] Add newly created projects to the table and show a Sonner toast

### Exercise 4 — Theme and project details

- [x] Add a light/dark theme toggle with system preference support
- [x] Add a project details route at `/projects/[id]`
- [x] Apply CSS-variable-based theme colors throughout the interface

## File Structure

```text
day9_tailwind_shadcn/
├── app/
│   ├── projects/
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── new-project-dialog.tsx
│   ├── project-table.tsx
│   ├── providers.tsx
│   ├── theme-toggle.tsx
│   └── ui/
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── select.tsx
│       └── table.tsx
├── lib/
│   ├── projects.ts
│   └── utils.ts
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── .gitignore
├── AGENTS.md
├── README.md
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
└── tsconfig.json
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Project portfolio landing page |
| `/projects` | Sortable project list, theme toggle, and project creation dialog |
| `/projects/[id]` | Project details with status, progress, risk, and last updated date |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To create a production build, run:

```bash
npm run build
```

## Learnings

- Utility classes make responsive styling quick to compose and review.
- Mobile-first breakpoints help layouts scale from narrow screens to desktops.
- CSS variables make consistent light and dark themes easier to maintain.
- Source-owned shadcn/ui components can be adapted to a project's design and interaction needs.
- Accessible primitives and semantic markup help create keyboard-friendly interfaces.

## Author

NirmanIQ Internship — Day 9
