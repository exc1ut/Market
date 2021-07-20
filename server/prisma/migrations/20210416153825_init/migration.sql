-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" INTEGER,
    "address" TEXT,
    "birthData" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" TEXT,
    "inn" INTEGER DEFAULT 0,
    "kpp" INTEGER DEFAULT 0,
    "card" TEXT,
    "role" INTEGER NOT NULL DEFAULT 0,
    "password" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_User" ("id", "email", "name", "phone", "address", "birthData", "comment", "inn", "kpp", "card", "role") SELECT "id", "email", "name", "phone", "address", "birthData", "comment", "inn", "kpp", "card", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
