/*
  Warnings:

  - You are about to drop the column `id_customer` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `meja` on the `orders` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `prices` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_meja` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `historylikes` DROP FOREIGN KEY `historyLikes_id_customer_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_id_customer_fkey`;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `id_customer`,
    DROP COLUMN `meja`,
    ADD COLUMN `id_meja` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `prices` MODIFY `price` DECIMAL NOT NULL;

-- DropTable
DROP TABLE `customers`;

-- CreateTable
CREATE TABLE `mejas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `noMeja` INTEGER NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_id_meja_fkey` FOREIGN KEY (`id_meja`) REFERENCES `mejas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
