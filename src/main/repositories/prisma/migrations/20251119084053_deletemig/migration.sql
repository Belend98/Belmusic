-- DropForeignKey
ALTER TABLE `réservation` DROP FOREIGN KEY `réservation_ibfk_2`;

-- AddForeignKey
ALTER TABLE `réservation` ADD CONSTRAINT `réservation_ibfk_2` FOREIGN KEY (`Id_artiste`) REFERENCES `artiste`(`Id_artiste`) ON DELETE CASCADE ON UPDATE NO ACTION;
