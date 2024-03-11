/*
  Warnings:

  - Added the required column `barcode` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "barcode" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mobile" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);
