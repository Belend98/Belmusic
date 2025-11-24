CREATE TABLE `type_artiste` (
    `Id_type_artiste` INT NOT NULL,
    `nom_type_artiste` VARCHAR(50),
    PRIMARY KEY (`Id_type_artiste`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `artiste` (
    `Id_artiste` INT NOT NULL AUTO_INCREMENT,
    `Nom` VARCHAR(50) NOT NULL,
    `Prénom` VARCHAR(50) NOT NULL,
    `Téléphone` VARCHAR(15),
    `Email` VARCHAR(50) NOT NULL,
    `Id_type_artiste` INT NOT NULL,
    `Pseudo` VARCHAR(50),
    PRIMARY KEY (`Id_artiste`),
    INDEX `Id_type_artiste` (`Id_type_artiste`),
    CONSTRAINT `artiste_ibfk_1` FOREIGN KEY (`Id_type_artiste`) REFERENCES `type_artiste`(`Id_type_artiste`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `default_stack` (
    `Id_stack` INT NOT NULL,
    `Nom` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`Id_stack`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `equipement` (
    `id_equipement` INT NOT NULL,
    `Nom` VARCHAR(50) NOT NULL,
    `prix_location` DECIMAL(5, 2),
    PRIMARY KEY (`id_equipement`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `composition_stack` (
    `Id_stack` INT NOT NULL,
    `id_equipement` INT NOT NULL,
    PRIMARY KEY (`Id_stack`, `id_equipement`),
    INDEX `id_equipement` (`id_equipement`),
    CONSTRAINT `composition_stack_ibfk_1` FOREIGN KEY (`Id_stack`) REFERENCES `default_stack`(`Id_stack`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `studio` (
    `Id_studio` INT NOT NULL,
    `Nom_studio` VARCHAR(50) NOT NULL,
    `Etat` BOOLEAN NOT NULL,
    PRIMARY KEY (`Id_studio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `session` (
    `Id_session` INT NOT NULL AUTO_INCREMENT,
    `Heure_debut` TIME NOT NULL,
    `Heure_fin` TIME NOT NULL,
    `Date` DATE NOT NULL,
    PRIMARY KEY (`Id_session`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `réservation` (
    `Id_réservation` INT NOT NULL AUTO_INCREMENT,
    `Etat` BOOLEAN,
    `Id_stack` INT NOT NULL,
    `Id_artiste` INT NOT NULL,
    `Id_studio` INT NOT NULL,
    `Id_session` INT NOT NULL,
    PRIMARY KEY (`Id_réservation`),
    INDEX `Id_stack` (`Id_stack`),
    INDEX `Id_studio` (`Id_studio`),
    INDEX `Id_artiste` (`Id_artiste`),
    INDEX `Id_session` (`Id_session`),
    CONSTRAINT `réservation_ibfk_1` FOREIGN KEY (`Id_stack`) REFERENCES `default_stack`(`Id_stack`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `réservation_ibfk_2` FOREIGN KEY (`Id_artiste`) REFERENCES `artiste`(`Id_artiste`) ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT `réservation_ibfk_3` FOREIGN KEY (`Id_studio`) REFERENCES `studio`(`Id_studio`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `réservation_ifbk4` FOREIGN KEY (`Id_session`) REFERENCES `session`(`Id_session`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `facture` (
    `Id_facture` INT NOT NULL AUTO_INCREMENT,
    `Date_facture` DATE NOT NULL,
    `Montant` DECIMAL(10, 2) NOT NULL,
    `Statut` BOOLEAN NOT NULL,
    `Id_réservation` INT NOT NULL,
    PRIMARY KEY (`Id_facture`),
    UNIQUE INDEX `Id_réservation` (`Id_réservation`),
    CONSTRAINT `facture_ibfk_1` FOREIGN KEY (`Id_réservation`) REFERENCES `réservation`(`Id_réservation`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `paiement` (
    `Id_paiement` INT NOT NULL AUTO_INCREMENT,
    `Date_paiement` DATE NOT NULL,
    `mode_payement` VARCHAR(50),
    `Id_facture` INT NOT NULL,
    PRIMARY KEY (`Id_paiement`),
    UNIQUE INDEX `Id_facture` (`Id_facture`),
    CONSTRAINT `paiement_ibfk_1` FOREIGN KEY (`Id_facture`) REFERENCES `facture`(`Id_facture`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `service` (
    `Id_service` INT NOT NULL,
    `nom_service` VARCHAR(50),
    `Tarif_` DECIMAL(7, 2) NOT NULL,
    PRIMARY KEY (`Id_service`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `reservation_service` (
    `Id_réservation` INT NOT NULL,
    `Id_service` INT NOT NULL,
    PRIMARY KEY (`Id_réservation`, `Id_service`),
    INDEX `Id_service` (`Id_service`),
    CONSTRAINT `reservation_service_ibfk_1` FOREIGN KEY (`Id_réservation`) REFERENCES `réservation`(`Id_réservation`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `reservation_service_ibfk_2` FOREIGN KEY (`Id_service`) REFERENCES `service`(`Id_service`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `reservation_equipement` (
    `Id_réservation` INT NOT NULL,
    `id_equipement` INT NOT NULL,
    PRIMARY KEY (`Id_réservation`, `id_equipement`),
    INDEX `id_equipement` (`id_equipement`),
    CONSTRAINT `reservation_equipement_ibfk_1` FOREIGN KEY (`Id_réservation`) REFERENCES `réservation`(`Id_réservation`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `ingénieur_son` (
    `Id_Ingé` INT NOT NULL,
    `Nom` VARCHAR(50) NOT NULL,
    `Email` VARCHAR(50) NOT NULL,
    `Disponibilité` BOOLEAN NOT NULL,
    PRIMARY KEY (`Id_Ingé`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `studio_ingé` (
    `Id_Ingé` INT NOT NULL,
    `Id_studio` INT NOT NULL,
    PRIMARY KEY (`Id_Ingé`, `Id_studio`),
    INDEX `Id_studio` (`Id_studio`),
    CONSTRAINT `studio_ingé_ibfk_2` FOREIGN KEY (`Id_studio`) REFERENCES `studio`(`Id_studio`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
