/*
  Warnings:

  - You are about to drop the column `sellerId` on the `JournalPayment` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `JournalReturn` table. All the data in the column will be lost.
  - Added the required column `journalId` to the `JournalReturn` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Journal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sellerId" INTEGER NOT NULL,
    "withoutSale" REAL NOT NULL DEFAULT 0,
    "sale" REAL NOT NULL DEFAULT 0,
    "sum" REAL NOT NULL DEFAULT 0,
    "paid" REAL NOT NULL DEFAULT 0,
    FOREIGN KEY ("sellerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Journal" ("id", "date", "sellerId", "withoutSale", "sale", "sum", "paid") SELECT "id", "date", "sellerId", "withoutSale", "sale", "sum", "paid" FROM "Journal";
DROP TABLE "Journal";
ALTER TABLE "new_Journal" RENAME TO "Journal";
CREATE TABLE "new_JournalPayment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" REAL NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "journalId" INTEGER NOT NULL,
    FOREIGN KEY ("journalId") REFERENCES "Journal" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_JournalPayment" ("id", "date", "price", "paymentMethod", "comment", "journalId") SELECT "id", "date", "price", "paymentMethod", "comment", "journalId" FROM "JournalPayment";
DROP TABLE "JournalPayment";
ALTER TABLE "new_JournalPayment" RENAME TO "JournalPayment";
CREATE TABLE "new_JournalReturn" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" INTEGER NOT NULL,
    "sold" REAL NOT NULL,
    "returned" REAL NOT NULL,
    "journalId" INTEGER NOT NULL,
    FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("journalId") REFERENCES "Journal" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_JournalReturn" ("id", "date", "productId", "sold", "returned") SELECT "id", "date", "productId", "sold", "returned" FROM "JournalReturn";
DROP TABLE "JournalReturn";
ALTER TABLE "new_JournalReturn" RENAME TO "JournalReturn";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
