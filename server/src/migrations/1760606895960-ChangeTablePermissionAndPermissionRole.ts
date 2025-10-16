import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTablePermissionAndPermissionRole1760606895960 implements MigrationInterface {
    name = 'ChangeTablePermissionAndPermissionRole1760606895960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."permissions_module_enum" AS ENUM('inventory', 'production', 'procurement')`);
        await queryRunner.query(`CREATE TYPE "public"."permissions_resource_enum" AS ENUM('products', 'orders', 'bom')`);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "permission_id" character varying NOT NULL, "module" "public"."permissions_module_enum" NOT NULL, "resource" "public"."permissions_resource_enum" NOT NULL, "action" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1717db2235a5b169822e7f753b1" UNIQUE ("permission_id"), CONSTRAINT "UQ_8b634526cdd01f2adba6c7ac07b" UNIQUE ("module"), CONSTRAINT "UQ_89456a09b598ce8915c702c5283" UNIQUE ("resource"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission_roles" ("id" SERIAL NOT NULL, "role_id" character varying NOT NULL, "permission_id" character varying NOT NULL, "granted_at" TIMESTAMP NOT NULL DEFAULT now(), "roleId" integer, "permissionId" integer, CONSTRAINT "PK_1c354345d93728c25adca19d717" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "permission_roles" ADD CONSTRAINT "FK_2ed76a7ef2fa565d019403a24f9" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission_roles" ADD CONSTRAINT "FK_86f6c7d1a377b78cef67a3c3d23" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission_roles" DROP CONSTRAINT "FK_86f6c7d1a377b78cef67a3c3d23"`);
        await queryRunner.query(`ALTER TABLE "permission_roles" DROP CONSTRAINT "FK_2ed76a7ef2fa565d019403a24f9"`);
        await queryRunner.query(`DROP TABLE "permission_roles"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP TYPE "public"."permissions_resource_enum"`);
        await queryRunner.query(`DROP TYPE "public"."permissions_module_enum"`);
    }

}
