import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1666852841293 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "carts" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "conpositions" ("id" SERIAL NOT NULL, "orderId" integer NOT NULL, "cartId" integer NOT NULL, "productId" integer NOT NULL, "pointId" integer NOT NULL, "name" character varying NOT NULL, "count" integer NOT NULL, "cost" integer NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_740d61a906941bc62e2d7f43627" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favourites" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_173e5d5cc35490bf1de2d2d3739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "date" TIMESTAMP, "status" character varying NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cost" integer NOT NULL, "amount" integer NOT NULL, "description" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "category" character varying NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "productId" integer NOT NULL, "path" character varying NOT NULL, CONSTRAINT "UQ_b27820f9c4eb00f2afc4e5b6162" UNIQUE ("path"), CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "token" character varying NOT NULL, CONSTRAINT "UQ_6a8ca5961656d13c16c04079dd3" UNIQUE ("token"), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "surname" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images_users" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_fd28ba4222784f1bbd0b2f64c7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_7af50639264735c79e918af6089" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE TABLE "order-item" ("id" SERIAL NOT NULL, "productId" integer NOT NULL, "orderId" integer NOT NULL, "name" character varying NOT NULL, "count" integer NOT NULL, "cost" integer NOT NULL, "removed" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_e06b16183c1f2f8b09f359ed572" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_7af50639264735c79e918af6089"`);
        await queryRunner.query(`DROP TABLE "images_users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "favourites"`);
        await queryRunner.query(`DROP TABLE "conpositions"`);
        await queryRunner.query(`DROP TABLE "carts"`);
    }
}
