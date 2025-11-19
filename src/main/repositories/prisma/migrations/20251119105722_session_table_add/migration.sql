/*
  Warnings:

  - You are about to drop the column `Date_` on the `réservation` table. All the data in the column will be lost.
  - You are about to drop the column `Heure_début` on the `réservation` table. All the data in the column will be lost.
  - You are about to drop the column `Heure_fin` on the `réservation` table. All the data in the column will be lost.
  - Added the required column `Id_session` to the `réservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `réservation` DROP COLUMN `Date_`,
    DROP COLUMN `Heure_début`,
    DROP COLUMN `Heure_fin`,
    ADD COLUMN `Id_session` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `session` (
    `Id_session` INTEGER NOT NULL AUTO_INCREMENT,
    `Heure_debut` TIME(0) NOT NULL,
    `Heure_fin` TIME(0) NOT NULL,
    `Date` DATE NOT NULL,

    PRIMARY KEY (`Id_session`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
