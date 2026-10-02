# Day 3: TypeScript Essentials
## Overview
This module transitions the workspace from dynamically typed JavaScript to strictly typed TypeScript. The focus is on leveraging compile-time type checking to catch bugs before execution, designing robust data models, and implementing advanced type safety patterns.
## Core Concepts
* **Interfaces vs. Types:** Using `interface` for object shapes (like data models) and `type` for unions and aliases.
* **Strict Mode (`tsc --strict`):** Enforcing strict null checks and eliminating implicit `any` types to guarantee code safety.
* **Generics (`<T>`):** Building reusable, type-safe data structures and functions that adapt to the types passed into them.
* **Discriminated Unions:** Modeling mutually exclusive states (e.g., pending, in-progress, completed) using a common literal type field to enable exhaustive `switch` statements.
## Practical Exercises
1. **`ex1_data_model.ts`:** Modeled a hierarchical construction project dataset using nested interfaces (`Project`, `Tower`, `Floor`, `Room`, `ProgressEntry`).
2. **`ex2_day1_rewrites.ts`:** Refactored five JavaScript algorithms from Day 1 into strict TypeScript, adding parameter, return, and generic type annotations.
3. **`ex3_generic_map.ts`:** Implemented a `TypeSafeMap` class utilizing generics to ensure data retrieved from the store maintains its intended type signature.
4. **`ex4_discriminated_unions.ts`:** Built a type-safe `processTask` function handling a `NirmanIQTask` union, ensuring all possible task states are explicitly handled.