# Day 2: Asynchronous JavaScript & The Event Loop
## Overview
This module explores JavaScript's non-blocking, single-threaded architecture. Unlike Python's Global Interpreter Lock (GIL) which halts execution during I/O operations, JavaScript delegates these tasks to the Event Loop, requiring specialized patterns to handle asynchronous data flows.
## Core Concepts
* **Evolution of Async Control:** Transitioning from deeply nested Callbacks to Promises, and finally to modern `async/await` syntax for synchronous-style readability.
* **Promise Concurrency:** 
  * `Promise.all()`: Parallel execution (fails fast if one promise rejects).
  * `Promise.allSettled()`: Parallel execution (waits for all, reports individual successes/failures).
  * `Promise.race()`: Returns the first completed promise.
* **Network Requests:** Utilizing the non-blocking `fetch()` API (requiring two `await` statements) compared to Python's synchronous `requests` library.
* **Error Handling:** Implementing `try/catch` blocks within asynchronous functions.
## Practical Exercises
1. **`ex1_parallel_fetch.js`**: A script that fetches data from three public APIs simultaneously using `Promise.all()`, merges the JSON payloads, and asynchronously writes the result to a local file.
2. **`ex2_retry_backoff.js`**: An exponential backoff network retry mechanism utilizing a custom non-blocking `sleep()` function (Promise + setTimeout) to handle failed requests without blocking the Event Loop.
3. **`ex3_task_queue.js`**: A concurrency queue simulating NirmanIQ's video processing pipeline. It processes an array of tasks with a strict concurrency limit of 3, utilizing `Promise.race()` to maintain maximum throughput without overwhelming system resources.
