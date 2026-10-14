import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialSchema1791998090065 implements MigrationInterface {
  name = 'CreateInitialSchema1791998090065';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`CREATE TYPE projects_status_enum AS ENUM ('PLANNING', 'ACTIVE', 'COMPLETED', 'ON_HOLD')`);
    await queryRunner.query(`
      CREATE TABLE projects (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        name text NOT NULL,
        description text,
        status projects_status_enum NOT NULL DEFAULT 'PLANNING',
        is_archived boolean NOT NULL DEFAULT false,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(`
      CREATE TABLE towers (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        name text NOT NULL,
        floors int NOT NULL,
        status text NOT NULL,
        project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(`
      CREATE TABLE floors (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        name text NOT NULL,
        number int NOT NULL,
        tower_id uuid NOT NULL REFERENCES towers(id) ON DELETE CASCADE,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(`CREATE INDEX idx_towers_project_id ON towers(project_id)`);
    await queryRunner.query(`CREATE INDEX idx_floors_tower_id ON floors(tower_id)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS idx_floors_tower_id`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_towers_project_id`);
    await queryRunner.query(`DROP TABLE IF EXISTS floors`);
    await queryRunner.query(`DROP TABLE IF EXISTS towers`);
    await queryRunner.query(`DROP TABLE IF EXISTS projects`);
    await queryRunner.query(`DROP TYPE IF EXISTS projects_status_enum`);
  }
}