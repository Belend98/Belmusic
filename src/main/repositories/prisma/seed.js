const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  await prisma.$executeRawUnsafe(`
    INSERT INTO type_artiste (Id_type_artiste, nom_type_artiste)
    VALUES (1, 'Chanteur'), (2, 'Rappeur'), (3, 'Slammeur')
    ON DUPLICATE KEY UPDATE nom_type_artiste = VALUES(nom_type_artiste);
  `);

  await prisma.$executeRawUnsafe(`
    INSERT INTO default_stack (Id_stack, Nom)
    VALUES (1, 'Rec'), (2, 'Live'), (3, 'Mix')
    ON DUPLICATE KEY UPDATE Nom = VALUES(Nom);
  `);

  await prisma.$executeRawUnsafe(`
    INSERT INTO studio (Id_studio, Nom_studio, Etat)
    VALUES (1, 'Studio A', 1), (2, 'Studio B', 1)
    ON DUPLICATE KEY UPDATE Nom_studio = VALUES(Nom_studio), Etat = VALUES(Etat);
  `);

  await prisma.$executeRawUnsafe(`
    INSERT INTO artiste (Id_artiste, Nom, Pr_nom, Email, T_l_phone, Id_type_artiste, Pseudo)
    VALUES (1, 'Dupont', 'Jean', 'jean.dupont@example.com', '0123456789', 1, 'jdup'), 
        (2, 'Marc', 'Petit', 'marc.petit@example.com', '0432568974', 3, 'Le M')
    ON DUPLICATE KEY UPDATE Email = VALUES(Email), Pseudo = VALUES(Pseudo);
  `);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });