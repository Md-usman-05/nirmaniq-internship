# Day 5: Git Workflows & UI Foundations

## Overview
This module covers advanced version control strategies and frontend UI fundamentals. The focus is on clean Git history management, semantic HTML5 structure, and responsive, CSS-only layouts without JavaScript dependencies.

## Exercises Completed

### Exercise 1: Advanced Git Kata
Executed a terminal-based workflow to simulate and resolve real-world version control scenarios.
* **Branching & Merging:** Created feature branches and intentionally triggered merge conflicts by modifying the same lines across different timelines.
* **Conflict Resolution:** Manually resolved `HEAD` conflicts, bypassing standard Windows UTF-16 encoding traps.
* **History Rewriting:** Utilized `git reset --soft` and interactive rebasing to squash multiple commits into a single, clean production commit.

### Exercise 2: Responsive Progress Card
Built a scalable dashboard component tracking project metrics.
* **Architecture:** Utilized the CSS Box Model and Flexbox to structure the project name, floor count, and dynamic risk badge.
* **Visuals:** Implemented a percentage-based progress bar and utilized CSS variables for consistent theming.

### Exercise 3: CSS-Only Mobile Navigation
Developed a fully responsive navigation header demonstrating advanced CSS state management and web accessibility.
* **The Checkbox Hack:** Engineered a functional mobile hamburger menu using an invisible `<input type="checkbox">` and the `~` sibling selector, achieving interactivity with zero JavaScript.
* **Accessibility (a11y):** Replaced generic `<div>` tags with semantic `<nav>`, `<main>`, and `<article>` elements. Ensured the hamburger menu is fully accessible via keyboard (`Tab` and `Enter` using `tabindex`).
* **Mobile-First Layout:** Applied base styles for 360px viewports, utilizing `@media` queries to scale the interface up for 768px (tablet) and 1024px (desktop) views via CSS Grid.