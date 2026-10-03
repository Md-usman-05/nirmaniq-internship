# Day 4: Advanced TypeScript & Strict Environment Configuration

## Overview
This repository contains the exercises and configurations for Day 4 of the TypeScript internship sprint. The focus of this module is on advanced type safety and establishing an enterprise-grade, strict development environment using TypeScript, ESLint, and Prettier.

## Exercises Completed

### Exercise 1: CRUD Type System
Implemented a type-safe Data Transfer Object (DTO) structure for a project management resource.
* **`CreateProjectDto`**: Enforces required fields for project creation.
* **`UpdateProjectDto`**: Utilizes TypeScript's `Partial<T>` utility type to make all fields optional for update operations.
* **`ProjectResponse`**: Extends the base structure with database-generated fields (`id`, `createdAt`, `updatedAt`).

### Exercise 2: Discriminated Unions & Type Guards
Built a robust API response handler to safely manage varying states.
* Defined an `APIResponse` union type combining `SuccessResponse`, `ErrorResponse`, and `ValidationError`.
* Implemented a `handleResponse` function utilizing a `switch` statement on the `status` literal.
* Applied the `never` type for exhaustive checking, ensuring the compiler catches any unhandled response variants.

### Exercise 3: Strict Tooling Setup
Configured a production-ready Node.js/TypeScript environment from scratch.
* **`tsconfig.json`**: Configured for `ES2022` targeting, strict mode enabled, and output directed to an isolated `./dist` folder.
* **`.eslintrc.json`**: Integrated `@typescript-eslint` rules specifically targeting common pitfalls (e.g., banning `any`, enforcing `const`, requiring explicit return types, and strict equality `===`).
* **`.prettierrc`**: Established baseline formatting rules (single quotes, mandatory semicolons).

### Exercise 4: Linting Implementation
Validated the strict environment by intentionally introducing and resolving code quality violations.
* Configured NPM scripts (`npm run lint` and `npm run build`) to streamline the testing and compilation pipeline.
* Successfully refactored `badCode.ts` to clear all ESLint warnings and errors, resulting in a zero-warning build.

## Commands

To verify the integrity of the code and environment, run the following commands from the root directory:

```bash
# Check code for linting and formatting errors
npm run lint

# Compile TypeScript to JavaScript in the /dist directory
npm run build