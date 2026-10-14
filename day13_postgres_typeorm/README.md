# Day 13 — PostgreSQL & TypeORM

NirmanIQ internship training — Day 13.

## Overview

Migrated the NestJS API from in-memory arrays to PostgreSQL using TypeORM. Covered Postgres fundamentals (UUID, JSONB, TIMESTAMPTZ, ENUM, indexing), SQL refreshers (JOINs, subqueries, aggregations, window functions), TypeORM entities and relations, migrations, and NirmanIQ conventions (snake_case, UUID PKs, timestamps, no SELECT *).

## Concepts Covered

- PostgreSQL: schemas, UUID, JSONB, TIMESTAMPTZ, ENUM, indexes
- SQL: INNER/LEFT/RIGHT JOINs, subqueries, GROUP BY, window functions
- TypeORM: `@Entity`, `@PrimaryGeneratedColumn`, `@Column`, `@ManyToOne`, `@OneToMany`, repositories
- Migrations: versioned SQL, `migration:run`, `migration:revert`, no auto-sync in production
- NirmanIQ conventions: snake_case tables/columns, UUID PKs, `created_at`/`updated_at`, no SELECT *

## Tech Stack

| Layer | Tool |
|---|---|
| Database | PostgreSQL 16 (Docker) |
| ORM | TypeORM |
| Framework | NestJS 11 |
| Validation | class-validator |

## Exercises

### Exercise 1 — PostgreSQL in Docker

Container `postgres-local` running on `localhost:5432` with database `nirmaniq_training`, user `nirmaniq`.

### Exercise 2 — TypeORM Entities

- `ProjectEntity` (projects) — UUID PK, name, description, status enum, is_archived, timestamps, OneToMany towers
- `TowerEntity` (towers) — UUID PK, name, floors, status, project_id FK, timestamps, OneToMany floor_list
- `FloorEntity` (floors) — UUID PK, name, number, tower_id FK, timestamps

### Exercise 3 — Migrations

- Migration 1: creates `projects`, `towers`, `floors`, indexes on foreign keys
- Migration 2: adds `is_archived` to `projects`, then reverted and re-applied to verify

### Exercise 4 — TypeORM Repositories

All services inject `Repository<Entity>` and use `find`, `findOne`, `save`, `remove`, `createQueryBuilder`.

### Exercise 5 — Portfolio Report

- Raw SQL version in `projects.report.sql`
- QueryBuilder version exposed at `GET /projects/report/portfolio`
- Returns: project id, name, tower_count, avg_floor_completion_pct, highest_risk_tower

## File Structure
