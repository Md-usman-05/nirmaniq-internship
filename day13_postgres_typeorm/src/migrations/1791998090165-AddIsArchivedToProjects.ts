import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsArchivedToProjects1791998090165 implements MigrationInterface {
  name = 'AddIsArchivedToProjects1791998090165';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('projects');
    if (table && !table.columns.some((column) => column.name === 'is_archived')) {
      await queryRunner.query(`ALTER TABLE "projects" ADD COLUMN "is_archived" boolean NOT NULL DEFAULT false`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('projects');
    if (table && table.columns.some((column) => column.name === 'is_archived')) {
      await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "is_archived"`);
    }
  }
}
