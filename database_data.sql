
SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO `type_artiste` (`Id_type_artiste`, `nom_type_artiste`) VALUES
(1, 'Chanteur '),
(2, 'Rappeur'),
(3, 'Slammeur');

INSERT INTO `default_stack` (`Id_stack`, `Nom`) VALUES
(1, 'Rec'),
(2, 'Live'),
(3, 'Mix');


INSERT INTO `studio` (`Id_studio`, `Nom_studio`, `Etat`) VALUES
(1, 'Studio A', 1),
(2, 'Studio B', 1);

INSERT INTO `artiste` (`Id_artiste`, `Nom`, `Prénom`, `Téléphone`, `Email`, `Id_type_artiste`, `Pseudo`) VALUES
(1, 'Dupont', 'Jean', '0487956325', 'jean.dupont@example.com', 1, 'jdup'),
(2, 'Marc', 'Ruffo', '0459768225', 'Marc.Ruffo@example.com', 3, 'Le M');

SET FOREIGN_KEY_CHECKS = 1;
