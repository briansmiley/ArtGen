/*
  Warnings:

  - You are about to drop the column `username` on the `ArtBlock` table. All the data in the column will be lost.
  - Added the required column `userId` to the `ArtBlock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ArtBlock" DROP CONSTRAINT "ArtBlock_username_fkey";

-- AlterTable
ALTER TABLE "ArtBlock" DROP COLUMN "username",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ArtBlock" ADD CONSTRAINT "ArtBlock_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
