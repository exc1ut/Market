/*
  Warnings:

  - You are about to drop the column `data` on the `JournalPayment` table. All the data in the column will be lost.

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
    FOREIGN KEY ("sellerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_JournalPayment" ("id", "price", "paymentMethod", "comment", "sellerId") SELECT "id", "price", "paymentMethod", "comment", "sellerId" FROM "JournalPayment";
DROP TABLE "JournalPayment";
ALTER TABLE "new_JournalPayment" RENAME TO "JournalPayment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
