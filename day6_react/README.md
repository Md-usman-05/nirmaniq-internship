# Day 6: React State & Props
This module transitions from imperative DOM manipulation to declarative UI using the React mental model. All exercises are built as functional components and strictly typed with TypeScript.
## Architecture & Exercises

1. **TaskList (Complex State & Immutability)**
   * Manages user input and array state using the `useState` hook.
   * Enforces React's immutability rule by utilizing `.map()` for toggling completion status and `.filter()` for deletions and view rendering, ensuring original arrays are never mutated directly.

2. **ProgressBar (Stateless & Prop-Driven)**
   * Operates as a pure function with no internal state.
   * Uses a TypeScript interface and a `Record` dictionary lookup to map strict union types (`'on-track' | 'at-risk' | 'high-risk' | 'critical'`) directly to dynamic inline CSS, avoiding complex if/else chains.

3. **FloorGrid (State Machines)**
   * Generates initial datasets dynamically using `Array.from`.
   * Implements a localized state machine object to dictate valid transitions (`not-started` → `in-progress` → `completed`).
   * Demonstrates targeted immutability by safely updating a single object within an array of 20 items.

## Tech Stack
* React + Vite
* TypeScript
* Inline CSS