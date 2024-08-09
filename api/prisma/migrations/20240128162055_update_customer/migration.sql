/*
  Warnings:

  - You are about to drop the column `email` on the `historylikes` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `orders` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `prices` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - Added the required column `id_customer` to the `historyLikes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_customer` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `historylikes` DROP COLUMN `email`,
    ADD COLUMN `id_customer` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `email`,
    ADD COLUMN `id_customer` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `prices` MODIFY `price` DECIMAL NOT NULL;

-- CreateTable
CREATE TABLE `customers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_id_customer_fkey` FOREIGN KEY (`id_customer`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historyLikes` ADD CONSTRAINT `historyLikes_id_customer_fkey` FOREIGN KEY (`id_customer`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
