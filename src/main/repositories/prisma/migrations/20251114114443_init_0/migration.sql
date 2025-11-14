-- CreateTable
CREATE TABLE `artiste` (
    `Id_artiste` INTEGER NOT NULL AUTO_INCREMENT,
    `Nom` VARCHAR(50) NOT NULL,
    `Prénom` VARCHAR(50) NOT NULL,
    `Téléphone` VARCHAR(15) NULL,
    `Email` VARCHAR(50) NOT NULL,
    `Id_type_artiste` INTEGER NOT NULL,
    `Pseudo` VARCHAR(50) NULL,

    INDEX `Id_type_artiste`(`Id_type_artiste`),
    PRIMARY KEY (`Id_artiste`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `composition_stack` (
    `Id_stack` INTEGER NOT NULL,
    `id_equipement` INTEGER NOT NULL,

    INDEX `id_equipement`(`id_equipement`),
    PRIMARY KEY (`Id_stack`, `id_equipement`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `default_stack` (
    `Id_stack` INTEGER NOT NULL,
    `Nom` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`Id_stack`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equipement` (
    `id_equipement` INTEGER NOT NULL,
    `Nom` VARCHAR(50) NOT NULL,
    `prix_location` DECIMAL(5, 2) NULL,

    PRIMARY KEY (`id_equipement`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `facture` (
    `Id_facture` INTEGER NOT NULL AUTO_INCREMENT,
    `Date_facture` DATE NOT NULL,
    `Montant` DECIMAL(10, 2) NOT NULL,
    `Statut` BOOLEAN NOT NULL,
    `Id_réservation` INTEGER NOT NULL,

    UNIQUE INDEX `Id_réservation`(`Id_réservation`),
    PRIMARY KEY (`Id_facture`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ingénieur_son` (
    `Id_Ingé` INTEGER NOT NULL,
    `Nom` VARCHAR(50) NOT NULL,
    `Email` VARCHAR(50) NOT NULL,
    `Disponibilité` BOOLEAN NOT NULL,

    PRIMARY KEY (`Id_Ingé`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `paiement` (
    `Id_paiement` INTEGER NOT NULL AUTO_INCREMENT,
    `Date_paiement` DATE NOT NULL,
    `mode_payement` VARCHAR(50) NULL,
    `Id_facture` INTEGER NOT NULL,

    UNIQUE INDEX `Id_facture`(`Id_facture`),
    PRIMARY KEY (`Id_paiement`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservation_equipement` (
    `Id_réservation` INTEGER NOT NULL,
    `id_equipement` INTEGER NOT NULL,

    INDEX `id_equipement`(`id_equipement`),
    PRIMARY KEY (`Id_réservation`, `id_equipement`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservation_service` (
    `Id_réservation` INTEGER NOT NULL,
    `Id_service` INTEGER NOT NULL,

    INDEX `Id_service`(`Id_service`),
    PRIMARY KEY (`Id_réservation`, `Id_service`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `réservation` (
    `Id_réservation` INTEGER NOT NULL AUTO_INCREMENT,
    `Heure_début` TIME(0) NOT NULL,
    `Heure_fin` TIME(0) NOT NULL,
    `Date_` DATE NOT NULL,
    `Etat` BOOLEAN NULL,
    `Id_stack` INTEGER NOT NULL,
    `Id_artiste` INTEGER NOT NULL,
    `Id_studio` INTEGER NOT NULL,

    INDEX `Id_stack`(`Id_stack`),
    INDEX `Id_studio`(`Id_studio`),
    INDEX `réservation_ibfk_2`(`Id_artiste`),
    PRIMARY KEY (`Id_réservation`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service` (
    `Id_service` INTEGER NOT NULL,
    `nom_service` VARCHAR(50) NULL,
    `Tarif_` DECIMAL(7, 2) NOT NULL,

    PRIMARY KEY (`Id_service`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `studio` (
    `Id_studio` INTEGER NOT NULL,
    `Nom_studio` VARCHAR(50) NOT NULL,
    `Etat` BOOLEAN NOT NULL,

    PRIMARY KEY (`Id_studio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `studio_ingé` (
    `Id_Ingé` INTEGER NOT NULL,
    `Id_studio` INTEGER NOT NULL,

    INDEX `Id_studio`(`Id_studio`),
    PRIMARY KEY (`Id_Ingé`, `Id_studio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type_artiste` (
    `Id_type_artiste` INTEGER NOT NULL,
    `nom_type_artiste` VARCHAR(50) NULL,

    PRIMARY KEY (`Id_type_artiste`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `artiste` ADD CONSTRAINT `artiste_ibfk_1` FOREIGN KEY (`Id_type_artiste`) REFERENCES `type_artiste`(`Id_type_artiste`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `composition_stack` ADD CONSTRAINT `composition_stack_ibfk_1` FOREIGN KEY (`Id_stack`) REFERENCES `default_stack`(`Id_stack`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `facture` ADD CONSTRAINT `facture_ibfk_1` FOREIGN KEY (`Id_réservation`) REFERENCES `réservation`(`Id_réservation`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `paiement` ADD CONSTRAINT `paiement_ibfk_1` FOREIGN KEY (`Id_facture`) REFERENCES `facture`(`Id_facture`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reservation_equipement` ADD CONSTRAINT `reservation_equipement_ibfk_1` FOREIGN KEY (`Id_réservation`) REFERENCES `réservation`(`Id_réservation`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reservation_service` ADD CONSTRAINT `reservation_service_ibfk_1` FOREIGN KEY (`Id_réservation`) REFERENCES `réservation`(`Id_réservation`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reservation_service` ADD CONSTRAINT `reservation_service_ibfk_2` FOREIGN KEY (`Id_service`) REFERENCES `service`(`Id_service`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `réservation` ADD CONSTRAINT `réservation_ibfk_1` FOREIGN KEY (`Id_stack`) REFERENCES `default_stack`(`Id_stack`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `réservation` ADD CONSTRAINT `réservation_ibfk_2` FOREIGN KEY (`Id_artiste`) REFERENCES `artiste`(`Id_artiste`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `réservation` ADD CONSTRAINT `réservation_ibfk_3` FOREIGN KEY (`Id_studio`) REFERENCES `studio`(`Id_studio`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `studio_ingé` ADD CONSTRAINT `studio_ingé_ibfk_2` FOREIGN KEY (`Id_studio`) REFERENCES `studio`(`Id_studio`) ON DELETE NO ACTION ON UPDATE NO ACTION;
