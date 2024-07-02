/*
  Warnings:

  - You are about to drop the column `userId` on the `ArtBlock` table. All the data in the column will be lost.
  - Added the required column `username` to the `ArtBlock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ArtBlock" DROP CONSTRAINT "ArtBlock_userId_fkey";

-- AlterTable
ALTER TABLE "ArtBlock" DROP COLUMN "userId",
ADD COLUMN     "username" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ArtBlock" ADD CONSTRAINT "ArtBlock_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
