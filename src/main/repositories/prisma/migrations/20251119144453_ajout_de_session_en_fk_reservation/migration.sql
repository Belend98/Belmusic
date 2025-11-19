-- AddForeignKey
ALTER TABLE `réservation` ADD CONSTRAINT `réservation_ifbk4` FOREIGN KEY (`Id_session`) REFERENCES `session`(`Id_session`) ON DELETE NO ACTION ON UPDATE NO ACTION;
