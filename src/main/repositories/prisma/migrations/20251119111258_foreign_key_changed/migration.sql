-- CreateIndex
CREATE INDEX `Id_session` ON `réservation`(`Id_session`);

-- RenameIndex
ALTER TABLE `réservation` RENAME INDEX `réservation_ibfk_2` TO `Id_artiste`;
