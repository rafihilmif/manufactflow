import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBranchComponent1761120051874 implements MigrationInterface {
    name = 'UpdateBranchComponent1761120051874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "branchs" RENAME COLUMN "location" TO "type_location"`);
        await queryRunner.query(`ALTER TYPE "public"."branchs_location_enum" RENAME TO "branchs_type_location_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."branchs_type_location_enum" RENAME TO "branchs_location_enum"`);
        await queryRunner.query(`ALTER TABLE "branchs" RENAME COLUMN "type_location" TO "location"`);
    }

}
