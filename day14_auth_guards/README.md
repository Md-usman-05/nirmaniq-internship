# Day 14 — Authentication & Guards

NestJS example app for JWT authentication, refresh-token cookies, and role-based
access control.

## Setup

Install dependencies and configure PostgreSQL using these environment variables:

| Variable | Default |
| --- | --- |
| `DB_HOST` | `localhost` |
| `DB_PORT` | `5432` |
| `DB_USERNAME` | `nirmaniq` |
| `DB_PASSWORD` | `nirmaniq_dev` |
| `DB_DATABASE` | `nirmaniq_auth` |
| `JWT_SECRET` | `nirmaniq_dev_secret` |
| `PORT` | `3000` |

The database and tables must exist before starting the app; TypeORM schema
synchronization is disabled.

```bash
npm install
npm run build
npm run start:dev
```

Set `JWT_SECRET` and `DB_PASSWORD` to secure values outside local development.
The refresh-token cookie is `httpOnly` and uses the `secure` flag in production.

## Authentication routes

- `POST /auth/register` — create a user and issue tokens.
- `POST /auth/login` — verify credentials and issue tokens.
- `POST /auth/refresh` — rotate the refresh token from the `refresh_token` cookie.

Use the returned access token as a bearer token for protected endpoints.
Project routes demonstrate role-based authorization:

- `GET /projects` and `GET /projects/:id` — authenticated users.
- `POST /projects` — PM role and higher (`PM`, `PE`, `SE`, `CXO`).
- `PUT /projects/:id` — PE role only.
- `DELETE /projects/:id` — SA role only.

## Tests

```bash
npm test -- --runInBand
npm run test:e2e
```
