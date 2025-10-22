import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedTableBranchAndUsers1761117963475 implements MigrationInterface {
    name = 'UpdatedTableBranchAndUsers1761117963475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "branch_id" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_5a58f726a41264c8b3e86d4a1de" FOREIGN KEY ("branch_id") REFERENCES "branchs"("branch_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_5a58f726a41264c8b3e86d4a1de"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "branch_id"`);
    }

}
