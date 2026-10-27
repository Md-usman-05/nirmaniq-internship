# Tower Progress Tracker - Frontend Client

The frontend client for the Tower Progress Tracker, built with Next.js (App Router). This application provides an interactive dashboard for Project Managers to plan building structures and Site Engineers to log daily floor-by-floor construction progress.

## Tech Stack
* **Framework:** Next.js 13+ (App Router)
* **Styling:** Tailwind CSS & shadcn/ui
* **State Management:** TanStack React Query (Server State) & Zustand (Client State)

## Core Features
* **Role-Based UI:** Zustand globally stores the user's role, dynamically hiding destructive actions from unauthorized users.
* **Instant Cache Invalidation:** Uses TanStack React Query to seamlessly refetch and update the UI the moment a floor mutation succeeds, without a page reload.
* **Live Search:** Next.js state smoothly connects to the backend for case-insensitive, real-time project filtering.

## Local Development Setup

1. **Install Dependencies**
   ```bash
   npm install
Run the Development Server

Bash
npm run dev
The application will be available at http://localhost:3001