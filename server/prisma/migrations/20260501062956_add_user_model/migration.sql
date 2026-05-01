/*
  Warnings:

  - You are about to drop the column `sellerEmail` on the `Ad` table. All the data in the column will be lost.
  - You are about to drop the column `sellerName` on the `Ad` table. All the data in the column will be lost.
  - You are about to drop the column `sellerPhone` on the `Ad` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Ad` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "city" TEXT,
    "profileImage" TEXT,
    "bio" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ad" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER,
    "city" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "mileage" INTEGER,
    "fuelType" TEXT,
    "transmission" TEXT,
    "engineCapacity" INTEGER,
    "condition" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "features" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Ad_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Ad" ("category", "city", "condition", "createdAt", "description", "engineCapacity", "features", "fuelType", "id", "images", "make", "mileage", "model", "price", "title", "transmission", "updatedAt", "year") SELECT "category", "city", "condition", "createdAt", "description", "engineCapacity", "features", "fuelType", "id", "images", "make", "mileage", "model", "price", "title", "transmission", "updatedAt", "year" FROM "Ad";
DROP TABLE "Ad";
ALTER TABLE "new_Ad" RENAME TO "Ad";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
