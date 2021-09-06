import {MigrationInterface, QueryRunner} from "typeorm";

export class ratingModelUpdate1630797912837 implements MigrationInterface {
    name = 'ratingModelUpdate1630797912837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_06f6588091a01a9d3b9a91c7960"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "ratingId"`);
        await queryRunner.query(`ALTER TABLE "rating" ADD "appointmentId" integer`);
        await queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_8fc1d55ba0d2e73a71278eb24e3" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_8fc1d55ba0d2e73a71278eb24e3"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP COLUMN "appointmentId"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "ratingId" uuid`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_06f6588091a01a9d3b9a91c7960" FOREIGN KEY ("ratingId") REFERENCES "rating"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
