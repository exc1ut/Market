-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "sale" REAL NOT NULL,
    "tax" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Category.name_unique" ON "Category"("name");
