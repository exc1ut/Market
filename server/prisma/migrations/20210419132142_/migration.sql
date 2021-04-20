/*
  Warnings:

  - You are about to drop the column `sum` on the `Journal` table. All the data in the column will be lost.
  - You are about to drop the column `sum` on the `JournalProduct` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Journal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sellerId" INTEGER NOT NULL,
    "withoutSale" REAL NOT NULL DEFAULT 0,
    "sale" REAL NOT NULL DEFAULT 0,
    "total" REAL NOT NULL DEFAULT 0,
    "paid" REAL NOT NULL DEFAULT 0,
    FOREIGN KEY ("sellerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Journal" ("id", "date", "sellerId", "withoutSale", "sale", "paid") SELECT "id", "date", "sellerId", "withoutSale", "sale", "paid" FROM "Journal";
DROP TABLE "Journal";
ALTER TABLE "new_Journal" RENAME TO "Journal";
CREATE TABLE "new_JournalProduct" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "quantity" REAL NOT NULL,
    "sale" REAL NOT NULL DEFAULT 0,
    "total" REAL NOT NULL DEFAULT 0,
    "journalId" INTEGER NOT NULL,
    FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("journalId") REFERENCES "Journal" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_JournalProduct" ("id", "productId", "quantity", "sale", "journalId") SELECT "id", "productId", "quantity", "sale", "journalId" FROM "JournalProduct";
DROP TABLE "JournalProduct";
ALTER TABLE "new_JournalProduct" RENAME TO "JournalProduct";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
