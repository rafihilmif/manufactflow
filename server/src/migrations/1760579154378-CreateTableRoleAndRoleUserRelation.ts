import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableRoleAndRoleUserRelation1760579154378 implements MigrationInterface {
    name = 'CreateTableRoleAndRoleUserRelation1760579154378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "role_id" character varying NOT NULL, "name" character varying NOT NULL, "role_parent_id" character varying NOT NULL, "level" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_09f4c8130b54f35925588a37b6a" UNIQUE ("role_id"), CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_users" ("id" SERIAL NOT NULL, "role_id" integer NOT NULL, "user_id" integer NOT NULL, "assigned_by" character varying, "assigned_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_df976289a90ea9afcc64dc0ef3c" PRIMARY KEY ("id", "role_id", "user_id"))`);
        await queryRunner.query(`ALTER TABLE "role_users" ADD CONSTRAINT "FK_790a8ca58c37fd1f31944ae65e2" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_users" ADD CONSTRAINT "FK_1dc3ce23874f906d8306186671a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_users" DROP CONSTRAINT "FK_1dc3ce23874f906d8306186671a"`);
        await queryRunner.query(`ALTER TABLE "role_users" DROP CONSTRAINT "FK_790a8ca58c37fd1f31944ae65e2"`);
        await queryRunner.query(`DROP TABLE "role_users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
