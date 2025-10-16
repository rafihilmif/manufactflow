import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUsers1760539520903 implements MigrationInterface {
  name = 'CreateTableUsers1760539520903';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "employee_id" character varying NOT NULL, "password_hash" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "phone" character varying NOT NULL, "department_id" character varying NOT NULL, "manager_id" character varying NOT NULL, "is_active" boolean NOT NULL, "hire_date" TIMESTAMP NOT NULL, "photo" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
