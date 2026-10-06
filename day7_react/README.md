# Day 7: React Hooks & Side Effects
This module focuses on managing side effects, optimizing performance, and abstracting reusable logic through Custom Hooks. 
## Architecture & Implementation
1. **Custom Hooks (`hooks.ts`)**
   * **`useFetch<T>`:** A generic, type-safe data fetching hook implementing modern `async/await` syntax, loading states, and robust error handling to replace basic `useEffect` fetch chains.
   * **`useDebounce`:** Manages input delays using `setTimeout` and cleanup functions to intercept rapid state changes and minimize unnecessary renders.
   * **`useLocalStorage`:** Synchronizes internal React state with browser storage to persist UI preferences.
2. **Project Dashboard (`ProjectDashboard.tsx`)**
   * Consumes `useFetch` to request JSON data immediately on component mount while handling graceful fallbacks for loading and error states.
   * Implements `useLocalStorage` to persist the user's preferred layout view (grid vs. list) across browser refreshes.
3. **Activity Search (`ActivitySearch.tsx`)**
   * Demonstrates performance optimization for client-side text filtering.
   * Utilizes `useDebounce` to delay search execution and `useMemo` to cache the filtered array of 100 construction activities, preventing heavy UI recalculations on every single keystroke.
## Tech Stack
* React + Vite
* TypeScript (Strict Mode)
* Functional Hooks (`useEffect`, `useState`, `useMemo`)