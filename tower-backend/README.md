# Tower Progress Tracker - Backend API

The RESTful API for the Tower Progress Tracker, built with NestJS and PostgreSQL. This backend handles authentication, strictly validates incoming data, enforces role-based access control, and manages the database state for construction projects and tower floor tracking.

## Tech Stack
* **Framework:** NestJS
* **Database:** PostgreSQL (via Docker)
* **ORM:** TypeORM
* **Authentication:** Passport.js (JWT)

## Core Features
* **JWT Authentication:** Issues secure, stateless tokens for user sessions.
* **Role-Based Guards:** Ensures Site Engineers (SE) can only update progress, while Project Managers (PM) have full CRUD authority.
* **Dynamic Calculations:** Automatically recalculates a tower's overall completion percentage whenever a floor's status is updated.

## Local Development Setup

1. **Install Dependencies**
   ```bash
   npm install
Start PostgreSQL
Ensure Docker is running, then spin up the database container:

Bash
docker-compose up -d
Run the Server

Bash
npm run start:dev
The API will be available at http://localhost:3000