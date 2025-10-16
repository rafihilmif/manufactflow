import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueUserIdAndUpdateRelations1760544287762 implements MigrationInterface {
    name = 'AddUniqueUserIdAndUpdateRelations1760544287762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "user_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_96aac72f1574b88752e9fb00089" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "departements" DROP CONSTRAINT "FK_ae174cd8981af59aad6b2783209"`);
        await queryRunner.query(`ALTER TABLE "departements" DROP COLUMN "manager_id"`);
        await queryRunner.query(`ALTER TABLE "departements" ADD "manager_id" character varying`);
        await queryRunner.query(`ALTER TABLE "departements" ADD CONSTRAINT "FK_ae174cd8981af59aad6b2783209" FOREIGN KEY ("manager_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "departements" DROP CONSTRAINT "FK_ae174cd8981af59aad6b2783209"`);
        await queryRunner.query(`ALTER TABLE "departements" DROP COLUMN "manager_id"`);
        await queryRunner.query(`ALTER TABLE "departements" ADD "manager_id" integer`);
        await queryRunner.query(`ALTER TABLE "departements" ADD CONSTRAINT "FK_ae174cd8981af59aad6b2783209" FOREIGN KEY ("manager_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_96aac72f1574b88752e9fb00089"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_id"`);
    }

}
