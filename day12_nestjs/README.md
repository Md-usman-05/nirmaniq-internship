# Day 12 — DTOs, Validation & Error Handling

NirmanIQ internship training — Day 12.

## Overview

Extended the NestJS API with proper Data Transfer Objects, declarative validation using class-validator, whitelisting to prevent mass assignment, a custom exception with a global exception filter that returns a consistent error shape, and nested DTO validation for the towers resource.

## Concepts Covered

- DTOs (Data Transfer Objects) — separate input validation from domain models
- `class-validator` decorators: `@IsString()`, `@IsEnum()`, `@Min()`, `@Max()`, `@MinLength()`, `@MaxLength()`, `@IsOptional()`, `@ValidateNested()`
- `class-transformer`: `@Exclude()`, `@Expose()`, `@Transform()`, `@Type()`
- `ValidationPipe` with `whitelist: true, forbidNonWhitelisted: true` for mass assignment protection
- Exception filters: `HttpException`, `NotFoundException`, custom exceptions
- Global exception filter producing consistent error responses

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | NestJS 11 |
| Language | TypeScript |
| Validation | class-validator, class-transformer |
| DTO helper | @nestjs/mapped-types |

## Exercises

### Exercise 1 — DTOs for All Project Endpoints

- `CreateProjectDto` — validated input for POST /projects
- `UpdateProjectDto` — partial version via `PartialType`
- `ProjectResponseDto` — outgoing shape with `@Exclude()` and `@Expose()`
- Global `ValidationPipe` with `whitelist: true` and `forbidNonWhitelisted: true`

### Exercise 2 — Validation Rules

| Field | Rule |
|---|---|
| `name` | string, required, 3–100 characters, trimmed |
| `description` | string, optional, max 500 characters |
| `status` | enum: `PLANNING` \| `ACTIVE` \| `COMPLETED` \| `ON_HOLD` |
| `towerCount` | integer, 1–50 |

### Exercise 3 — Custom Exception + Global Filter

- `AppException` extends `HttpException` for app-specific errors
- `AppExceptionFilter` catches every exception and returns the same shape:

```json
{
  "statusCode": 400,
  "message": ["..."],
  "error": "Bad Request",
  "timestamp": "2026-10-13T17:41:37.869Z",
  "path": "/projects"
}
Registered globally in main.ts via app.useGlobalFilters(new AppExceptionFilter())

Exercise 4 — Validation Tests
Verified via Postman and PowerShell — every invalid request returns 400 with descriptive messages:

Test	Message
Empty body	8 messages (all required fields)
Name too short	name must be longer than or equal to 3 characters
Invalid status	status must be one of the following values: PLANNING, ACTIVE, COMPLETED, ON_HOLD
TowerCount too high	towerCount must not be greater than 50
Extra field	property hacked should not exist
Missing project	404 Project 999 not found
Exercise 5 — Nested Validation
FloorDto with @IsString(), @MinLength(2), @IsInt(), @Min(1), @Max(200)

CreateTowerDto uses @ValidateNested({ each: true }) with @Type(() => FloorDto) to validate each floor object

Errors are returned with full paths: floorList.0.name must be longer than or equal to 2 characters

File Structure
text
day12_nestjs/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   ├── common/
│   │   ├── exceptions/
│   │   │   └── app.exception.ts
│   │   └── filters/
│   │       └── app-exception.filter.ts
│   ├── projects/
│   │   ├── projects.module.ts
│   │   ├── projects.controller.ts
│   │   ├── projects.service.ts
│   │   └── dto/
│   │       ├── create-project.dto.ts
│   │       ├── update-project.dto.ts
│   │       └── project-response.dto.ts
│   └── towers/
│       ├── towers.module.ts
│       ├── towers.controller.ts
│       ├── towers.service.ts
│       ├── tower.entity.ts
│       └── dto/
│           ├── floor.dto.ts
│           └── create-tower.dto.ts
├── test/
├── postman_collection.json
├── package.json
└── tsconfig.json
Routes
Method	Route	Validation
GET	/projects	—
GET	/projects/:id	404 if missing
POST	/projects	CreateProjectDto
PUT	/projects/:id	UpdateProjectDto
DELETE	/projects/:id	404 if missing
GET	/projects/:projectId/towers	—
POST	/projects/:projectId/towers	CreateTowerDto (nested floors)
Getting Started
bash
npm install
npm run start:dev
Server runs on http://localhost:3000.

Build
bash
npm run build
Example Requests
Valid create
bash
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Airport Terminal\",\"description\":\"New project\",\"status\":\"ACTIVE\",\"towerCount\":10}"
Invalid — name too short
bash
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"AB\",\"status\":\"ACTIVE\",\"towerCount\":5}"
Response:

json
{
  "statusCode": 400,
  "message": ["name must be longer than or equal to 3 characters"],
  "error": "Bad Request",
  "timestamp": "2026-10-13T17:41:37.902Z",
  "path": "/projects"
}
Nested tower with floors
bash
curl -X POST http://localhost:3000/projects/1/towers \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Tower C\",\"floors\":25,\"status\":\"Planned\",\"floorList\":[{\"name\":\"Ground\",\"number\":1},{\"name\":\"First\",\"number\":2}]}"
Learnings
DTOs decouple API input validation from internal domain models

class-validator + class-transformer provide declarative validation with useful error messages

whitelist + forbidNonWhitelisted protects against mass assignment attacks

Global exception filters enforce a consistent error contract across all endpoints

@ValidateNested() + @Type() enable validation of nested arrays of objects with full path reporting