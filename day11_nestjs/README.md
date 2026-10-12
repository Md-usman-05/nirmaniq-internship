# Day 11 — NestJS Architecture & First API

NirmanIQ internship training — Day 11.

## Overview

Built the first backend API using NestJS — an Angular-inspired Node.js framework. Covered modules, controllers, providers, dependency injection, and the request lifecycle. Implemented a full CRUD for `projects` and a nested `towers` resource, both using an in-memory data store.

## Concepts Covered

- NestJS framework: Angular-inspired Node.js with TypeScript
- Modules — organize code by domain using `@Module()`
- Controllers — route handlers with `@Controller()`, `@Get()`, `@Post()`, `@Put()`, `@Delete()`, `@Param()`, `@Body()`, `@Query()`
- Services — business logic with `@Injectable()`
- Dependency Injection via constructor injection
- NestJS CLI: `nest generate module/controller/service`
- Comparison with Flask/Django: decorators, middleware, request lifecycle

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | NestJS 11 |
| Language | TypeScript |
| Validation | class-validator, class-transformer |
| DTO helper | @nestjs/mapped-types |
| Testing | Postman |
| Runtime | Node.js 20 |

## Exercises

### Exercise 1 — NestJS Project + Projects Module

- Scaffolded new NestJS project `day11_nestjs`
- Generated `projects` module, controller, service via NestJS CLI
- Wired `ProjectsModule` into `AppModule`

### Exercise 2 — CRUD Endpoints

Implemented 5 endpoints using an in-memory array as data store:

| Method | Route | Description |
|---|---|---|
| GET | `/projects` | List all projects |
| GET | `/projects/:id` | Get one project (404 if not found) |
| POST | `/projects` | Create a project with validation |
| PUT | `/projects/:id` | Partially update a project |
| DELETE | `/projects/:id` | Remove a project |

Validation rules on create/update:

- `name`: non-empty string
- `status`: one of `Active`, `Pending`, `Completed`, `On Hold`
- `progress`: integer 0–100
- `risk`: one of `Low`, `Medium`, `High`

`ValidationPipe` enabled globally in `main.ts` with `whitelist: true, forbidNonWhitelisted: true`.

### Exercise 3 — Postman Collection

- Created `postman_collection.json` with all 7 endpoints (5 projects + 2 towers)
- Includes sample request bodies for POST/PUT
- Collection variables: `baseUrl`, `projectId`
- Imported into Postman and verified all requests return the expected responses

### Exercise 4 — Towers Nested Resource

| Method | Route | Description |
|---|---|---|
| GET | `/projects/:projectId/towers` | List towers for a project |
| POST | `/projects/:projectId/towers` | Create a tower under a project |

Towers are scoped to a project via `projectId`. Routes are nested under the projects URL.

## File Structure
day11_nestjs/
├── src/
│ ├── main.ts
│ ├── app.module.ts
│ ├── app.controller.ts
│ ├── app.service.ts
│ ├── projects/
│ │ ├── projects.module.ts
│ │ ├── projects.controller.ts
│ │ ├── projects.service.ts
│ │ ├── project.entity.ts
│ │ └── dto/
│ │ ├── create-project.dto.ts
│ │ └── update-project.dto.ts
│ └── towers/
│ ├── towers.module.ts
│ ├── towers.controller.ts
│ ├── towers.service.ts
│ ├── tower.entity.ts
│ └── dto/
│ └── create-tower.dto.ts
├── test/
├── postman_collection.json
├── nest-cli.json
├── package.json
├── tsconfig.json
└── tsconfig.build.json

text

## Routes

| Method | Route | Response |
|---|---|---|
| GET | `/projects` | Array of 4 seed projects |
| GET | `/projects/:id` | Single project or 404 |
| POST | `/projects` | Created project with generated id |
| PUT | `/projects/:id` | Updated project |
| DELETE | `/projects/:id` | `{ deleted: true, id }` |
| GET | `/projects/:projectId/towers` | Array of towers for that project |
| POST | `/projects/:projectId/towers` | Created tower linked to project |

## Getting Started

```bash
npm install
npm run start:dev
Server runs on http://localhost:3000.

Build
bash
npm run build
Testing with Postman
Import postman_collection.json into Postman

Ensure the NestJS server is running

Run any of the 7 requests in the collection

Or use curl:

bash
curl http://localhost:3000/projects
curl http://localhost:3000/projects/1
curl http://localhost:3000/projects/1/towers
curl http://localhost:3000/projects/3/towers
Learnings
NestJS modules group related controllers and providers, keeping code organized by domain

Decorators make routing declarative and readable

Dependency injection simplifies testing and swapping implementations

DTOs with class-validator provide clean, declarative input validation

Nested routes let URLs reflect resource hierarchy — e.g. towers belong to projects

The NestJS CLI speeds up scaffolding of new modules, controllers, and services
