/*
  Warnings:

  - You are about to alter the column `price` on the `prices` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `prices` MODIFY `price` DECIMAL NOT NULL;
