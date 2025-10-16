import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableDepartmentAndJoinUsersTable1760541026005 implements MigrationInterface {
    name = 'CreateTableDepartmentAndJoinUsersTable1760541026005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."departements_department_type_enum" AS ENUM('production', 'warehouse', 'finance', 'sales')`);
        await queryRunner.query(`CREATE TABLE "departements" ("id" SERIAL NOT NULL, "department_id" character varying NOT NULL, "department_type" "public"."departements_department_type_enum" NOT NULL, "cost_center_code" character varying NOT NULL, "manager_id" integer, "is_active" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2c4850823d8f6ec267b042368da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "photo" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "departements" ADD CONSTRAINT "FK_ae174cd8981af59aad6b2783209" FOREIGN KEY ("manager_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "departements" DROP CONSTRAINT "FK_ae174cd8981af59aad6b2783209"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "photo" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "departements"`);
        await queryRunner.query(`DROP TYPE "public"."departements_department_type_enum"`);
    }

}
