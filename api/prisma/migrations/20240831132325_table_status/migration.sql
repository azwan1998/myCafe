/*
  Warnings:

  - You are about to alter the column `price` on the `prices` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - Added the required column `statusMeja` to the `mejas` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `historyLikes_id_customer_fkey` ON `historylikes`;

-- AlterTable
ALTER TABLE `mejas` ADD COLUMN `statusMeja` ENUM('available', 'cleaning', 'in_use', 'reserved', 'not_available') NOT NULL;

-- AlterTable
ALTER TABLE `prices` MODIFY `price` DECIMAL NOT NULL;
