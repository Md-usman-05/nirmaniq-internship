# NirmanIQ Day 17: Data Tables, Pagination & Search

This repository contains the completed exercises for Day 17 of the NirmanIQ enterprise curriculum. The core objective of this module is to build high-performance, production-ready data tables using custom UI primitives and server-state management, avoiding heavy third-party grid libraries.

## Tech Stack
* **Framework:** Next.js (App Router)
* **Server State Management:** React Query (`@tanstack/react-query`)
* **Styling & UI:** Tailwind CSS, shadcn/ui (`<Table>`, `<Button>`)
* **Language:** TypeScript

## Exercises Completed

**Exercise 1: Server-Side Pagination & Sorting**
* Built a custom `Activity Log` table from scratch using shadcn/ui primitives.
* Implemented server-side pagination handling variable limits (10, 25, 50 rows per page).
* Configured column header sorting (Ascending/Descending).
* Integrated React Query with `keepPreviousData` to eliminate screen flickering during page transitions.

**Exercise 2: Multi-Column Filters**
* Added complex filtering capabilities including a Status dropdown, User dropdown, and Date picker.
* Passed filter states into the React Query `queryKey` to automatically trigger server re-fetches without manual `useEffect` hooks.

**Exercise 3: URL-Synced State (Single Source of Truth)**
* Refactored local React state (`useState`) to utilize the browser's URL via Next.js `useSearchParams` and `useRouter`.
* Ensured all pagination, sorting, and filter states survive page refreshes and can be shared via direct links.

**Exercise 4: Row Selection & Bulk Mutations**
* Implemented individual and "Select All" checkbox functionality.
* Created a mock backend mutation function for bulk Approval/Rejection.
* Utilized React Query's `useMutation` and `queryClient.invalidateQueries()` to process updates and automatically refresh the table data upon success.

## Data Simulation
The project utilizes an in-memory mock database generating **550+ simulated records** to accurately test server-side pagination performance, sorting algorithms, and bulk state updates.

## Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
Run the Development Server:

Bash
npm run dev
Navigate to the Exercises:

Exercise 1: http://localhost:3000/exercise-1

Exercise 2: http://localhost:3000/exercise-2

Exercise 3: http://localhost:3000/exercise-3

Exercise 4: http://localhost:3000/exercise-4