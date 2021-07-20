/*
  Warnings:

  - Added the required column `journalId` to the `JournalPayment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_JournalPayment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" REAL NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "journalId" INTEGER NOT NULL,
    FOREIGN KEY ("sellerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("journalId") REFERENCES "Journal" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_JournalPayment" ("id", "date", "price", "paymentMethod", "comment", "sellerId") SELECT "id", "date", "price", "paymentMethod", "comment", "sellerId" FROM "JournalPayment";
DROP TABLE "JournalPayment";
ALTER TABLE "new_JournalPayment" RENAME TO "JournalPayment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
