import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablePermissionAndPermissionRolesRelation1760606796287 implements MigrationInterface {
    name = 'CreateTablePermissionAndPermissionRolesRelation1760606796287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."permission_module_enum" AS ENUM('inventory', 'production', 'procurement')`);
        await queryRunner.query(`CREATE TYPE "public"."permission_resource_enum" AS ENUM('products', 'orders', 'bom')`);
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "permission_id" character varying NOT NULL, "module" "public"."permission_module_enum" NOT NULL, "resource" "public"."permission_resource_enum" NOT NULL, "action" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_aaa6d61e22fb453965ae6157ce5" UNIQUE ("permission_id"), CONSTRAINT "UQ_48c2c77b01e77d2105fffc87ec1" UNIQUE ("module"), CONSTRAINT "UQ_a54f03e458b32ac6811fee6332c" UNIQUE ("resource"), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission_role" ("id" SERIAL NOT NULL, "role_id" character varying NOT NULL, "permission_id" character varying NOT NULL, "granted_at" TIMESTAMP NOT NULL DEFAULT now(), "roleId" integer, "permissionId" integer, CONSTRAINT "PK_383892d758d08d346f837d3d8b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "permission_role" ADD CONSTRAINT "FK_1dd59c61aec4fc206bc43a31153" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission_role" ADD CONSTRAINT "FK_1886001bdced4ea977b9f1b97c1" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission_role" DROP CONSTRAINT "FK_1886001bdced4ea977b9f1b97c1"`);
        await queryRunner.query(`ALTER TABLE "permission_role" DROP CONSTRAINT "FK_1dd59c61aec4fc206bc43a31153"`);
        await queryRunner.query(`DROP TABLE "permission_role"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TYPE "public"."permission_resource_enum"`);
        await queryRunner.query(`DROP TYPE "public"."permission_module_enum"`);
    }

}
