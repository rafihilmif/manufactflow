import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1760709023508 implements MigrationInterface {
    name = 'Init1760709023508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_refresh_tokens" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "token_hash" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "expired_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_c5f5cf35bd8aabd1ebe9bb13409" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."departements_department_type_enum" AS ENUM('production', 'warehouse', 'finance', 'sales')`);
        await queryRunner.query(`CREATE TABLE "departements" ("id" SERIAL NOT NULL, "department_id" character varying NOT NULL, "department_type" "public"."departements_department_type_enum" NOT NULL, "cost_center_code" character varying NOT NULL, "manager_id" character varying, "is_active" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2c4850823d8f6ec267b042368da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."permissions_module_enum" AS ENUM('inventory', 'production', 'procurement')`);
        await queryRunner.query(`CREATE TYPE "public"."permissions_resource_enum" AS ENUM('products', 'orders', 'bom')`);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "permission_id" character varying NOT NULL, "module" "public"."permissions_module_enum" NOT NULL, "resource" "public"."permissions_resource_enum" NOT NULL, "action" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1717db2235a5b169822e7f753b1" UNIQUE ("permission_id"), CONSTRAINT "UQ_8b634526cdd01f2adba6c7ac07b" UNIQUE ("module"), CONSTRAINT "UQ_89456a09b598ce8915c702c5283" UNIQUE ("resource"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission_roles" ("id" SERIAL NOT NULL, "role_id" character varying NOT NULL, "permission_id" character varying NOT NULL, "granted_at" TIMESTAMP NOT NULL DEFAULT now(), "roleId" integer, "permissionId" integer, CONSTRAINT "PK_1c354345d93728c25adca19d717" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "role_id" character varying NOT NULL, "name" character varying NOT NULL, "level" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_09f4c8130b54f35925588a37b6a" UNIQUE ("role_id"), CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_users" ("id" SERIAL NOT NULL, "role_id" character varying NOT NULL, "user_id" character varying NOT NULL, "assigned_by" character varying, "assigned_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6b4286b64efea084922d1c709bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "user_id" character varying NOT NULL, "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "first_name" character varying, "last_name" character varying, "phone" character varying, "department_id" character varying, "manager_id" character varying, "is_active" boolean NOT NULL, "hire_date" TIMESTAMP NOT NULL, "photo" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_96aac72f1574b88752e9fb00089" UNIQUE ("user_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."company_locations_location_enum" AS ENUM('headquarters', 'plant', 'warehouse', 'office')`);
        await queryRunner.query(`CREATE TABLE "company_locations" ("id" SERIAL NOT NULL, "company_location_id" character varying NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "location" "public"."company_locations_location_enum" NOT NULL, "address" text NOT NULL, "province" character varying NOT NULL, "city" character varying NOT NULL, "is_active" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_affbd3edd478a9c524078ce171e" UNIQUE ("company_location_id"), CONSTRAINT "UQ_600591903948417829e2113228c" UNIQUE ("code"), CONSTRAINT "UQ_01cb6db799ea88454f010cc2a0c" UNIQUE ("name"), CONSTRAINT "PK_04c2470899b155ebb456f15e07c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "departements" ADD CONSTRAINT "FK_ae174cd8981af59aad6b2783209" FOREIGN KEY ("manager_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission_roles" ADD CONSTRAINT "FK_2ed76a7ef2fa565d019403a24f9" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission_roles" ADD CONSTRAINT "FK_86f6c7d1a377b78cef67a3c3d23" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_users" ADD CONSTRAINT "FK_790a8ca58c37fd1f31944ae65e2" FOREIGN KEY ("role_id") REFERENCES "roles"("role_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_users" ADD CONSTRAINT "FK_1dc3ce23874f906d8306186671a" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_users" DROP CONSTRAINT "FK_1dc3ce23874f906d8306186671a"`);
        await queryRunner.query(`ALTER TABLE "role_users" DROP CONSTRAINT "FK_790a8ca58c37fd1f31944ae65e2"`);
        await queryRunner.query(`ALTER TABLE "permission_roles" DROP CONSTRAINT "FK_86f6c7d1a377b78cef67a3c3d23"`);
        await queryRunner.query(`ALTER TABLE "permission_roles" DROP CONSTRAINT "FK_2ed76a7ef2fa565d019403a24f9"`);
        await queryRunner.query(`ALTER TABLE "departements" DROP CONSTRAINT "FK_ae174cd8981af59aad6b2783209"`);
        await queryRunner.query(`DROP TABLE "company_locations"`);
        await queryRunner.query(`DROP TYPE "public"."company_locations_location_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "role_users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "permission_roles"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP TYPE "public"."permissions_resource_enum"`);
        await queryRunner.query(`DROP TYPE "public"."permissions_module_enum"`);
        await queryRunner.query(`DROP TABLE "departements"`);
        await queryRunner.query(`DROP TYPE "public"."departements_department_type_enum"`);
        await queryRunner.query(`DROP TABLE "user_refresh_tokens"`);
    }

}
