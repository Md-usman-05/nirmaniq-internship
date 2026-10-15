import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuthSchema1792000000000 implements MigrationInterface {
  name = 'CreateAuthSchema1792000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(
      `CREATE TYPE users_role_enum AS ENUM ('SE', 'PE', 'PM', 'PD', 'CXO', 'TA', 'SA')`,
    );
    await queryRunner.query(
      `CREATE TYPE projects_status_enum AS ENUM ('PLANNING', 'ACTIVE', 'COMPLETED', 'ON_HOLD')`,
    );

    await queryRunner.query(`
      CREATE TABLE users (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        email text NOT NULL UNIQUE,
        password_hash text NOT NULL,
        name text NOT NULL,
        role users_role_enum NOT NULL DEFAULT 'SE',
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE refresh_tokens (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        token_hash text NOT NULL UNIQUE,
        expires_at timestamptz NOT NULL,
        revoked boolean NOT NULL DEFAULT false,
        created_at timestamptz NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE projects (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        name text NOT NULL,
        description text,
        status projects_status_enum NOT NULL DEFAULT 'PLANNING',
        owner_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(
      `CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id)`,
    );
    await queryRunner.query(
      `CREATE INDEX idx_projects_owner_id ON projects(owner_id)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS idx_projects_owner_id`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_refresh_tokens_user_id`);
    await queryRunner.query(`DROP TABLE IF EXISTS projects`);
    await queryRunner.query(`DROP TABLE IF EXISTS refresh_tokens`);
    await queryRunner.query(`DROP TABLE IF EXISTS users`);
    await queryRunner.query(`DROP TYPE IF EXISTS projects_status_enum`);
    await queryRunner.query(`DROP TYPE IF EXISTS users_role_enum`);
  }
}
