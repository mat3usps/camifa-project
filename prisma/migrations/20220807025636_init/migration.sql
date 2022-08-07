/*
  Warnings:

  - You are about to alter the column `initialBalance` on the `BankAccount` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BankAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "bankName" TEXT,
    "color" TEXT,
    "description" TEXT,
    "initialBalance" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL DEFAULT 'checking',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "accountId" TEXT NOT NULL,
    CONSTRAINT "BankAccount_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_BankAccount" ("accountId", "bankName", "color", "description", "id", "initialBalance", "isActive", "isDeleted", "name", "type") SELECT "accountId", "bankName", "color", "description", "id", "initialBalance", "isActive", "isDeleted", "name", "type" FROM "BankAccount";
DROP TABLE "BankAccount";
ALTER TABLE "new_BankAccount" RENAME TO "BankAccount";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
