/*
  Warnings:

  - You are about to drop the column `id_cafe` on the `orders` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `prices` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - Added the required column `id_cafe` to the `mejas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_id_cafe_fkey`;

-- AlterTable
ALTER TABLE `mejas` ADD COLUMN `id_cafe` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `id_cafe`;

-- AlterTable
ALTER TABLE `prices` MODIFY `price` DECIMAL NOT NULL;

-- AddForeignKey
ALTER TABLE `mejas` ADD CONSTRAINT `mejas_id_cafe_fkey` FOREIGN KEY (`id_cafe`) REFERENCES `cafes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
