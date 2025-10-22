import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1761107864518 implements MigrationInterface {
    name = 'InitDB1761107864518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_refresh_tokens" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "token_hash" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "expired_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_c5f5cf35bd8aabd1ebe9bb13409" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "departements" ("id" SERIAL NOT NULL, "department_id" character varying NOT NULL, "name" character varying NOT NULL, "cost_center_code" character varying NOT NULL, "manager_id" character varying, "is_active" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ac0480fbdc3432b52c98054aaed" UNIQUE ("name"), CONSTRAINT "PK_2c4850823d8f6ec267b042368da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "role_id" character varying NOT NULL, "name" character varying NOT NULL, "level" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_09f4c8130b54f35925588a37b6a" UNIQUE ("role_id"), CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_users" ("id" SERIAL NOT NULL, "role_id" character varying NOT NULL, "user_id" character varying NOT NULL, "assigned_by" character varying, "assigned_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6b4286b64efea084922d1c709bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "user_id" character varying NOT NULL, "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "first_name" character varying, "last_name" character varying, "phone" character varying, "department_id" character varying, "manager_id" character varying, "is_active" boolean NOT NULL, "hire_date" TIMESTAMP NOT NULL, "photo" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_96aac72f1574b88752e9fb00089" UNIQUE ("user_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."branchs_location_enum" AS ENUM('headquarters', 'plant', 'warehouse', 'office')`);
        await queryRunner.query(`CREATE TABLE "branchs" ("id" SERIAL NOT NULL, "branch_id" character varying NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "location" "public"."branchs_location_enum" NOT NULL, "address" text NOT NULL, "province" character varying NOT NULL, "city" character varying NOT NULL, "is_active" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9efc010964bbc4a949ec759f913" UNIQUE ("branch_id"), CONSTRAINT "UQ_f7deb66267f6f3b518cc1cbfabd" UNIQUE ("code"), CONSTRAINT "UQ_9553b92c0e363ae6c45f4e31250" UNIQUE ("name"), CONSTRAINT "PK_c2a14f542feef68e3968ce1766c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "departements" ADD CONSTRAINT "FK_ae174cd8981af59aad6b2783209" FOREIGN KEY ("manager_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_users" ADD CONSTRAINT "FK_790a8ca58c37fd1f31944ae65e2" FOREIGN KEY ("role_id") REFERENCES "roles"("role_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_users" ADD CONSTRAINT "FK_1dc3ce23874f906d8306186671a" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_users" DROP CONSTRAINT "FK_1dc3ce23874f906d8306186671a"`);
        await queryRunner.query(`ALTER TABLE "role_users" DROP CONSTRAINT "FK_790a8ca58c37fd1f31944ae65e2"`);
        await queryRunner.query(`ALTER TABLE "departements" DROP CONSTRAINT "FK_ae174cd8981af59aad6b2783209"`);
        await queryRunner.query(`DROP TABLE "branchs"`);
        await queryRunner.query(`DROP TYPE "public"."branchs_location_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "role_users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "departements"`);
        await queryRunner.query(`DROP TABLE "user_refresh_tokens"`);
    }

}
