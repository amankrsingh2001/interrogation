/*
  Warnings:

  - You are about to drop the column `techStack` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Project` table. All the data in the column will be lost.
  - Added the required column `createAt` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "techStack",
DROP COLUMN "title",
ADD COLUMN     "createAt" TEXT NOT NULL,
ADD COLUMN     "langUse" TEXT[],
ADD COLUMN     "name" TEXT NOT NULL;
