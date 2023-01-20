import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFieldPointIdInOrdersTable1666862976488 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" ADD "productId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "carts" ADD "count" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "pointId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'process'`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_9c77aaa5bc26f66159661ffd808" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_69828a178f152f157dcf2f70a89" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_69828a178f152f157dcf2f70a89"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_9c77aaa5bc26f66159661ffd808"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "pointId"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "count"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP COLUMN "productId"`);
    }
}
