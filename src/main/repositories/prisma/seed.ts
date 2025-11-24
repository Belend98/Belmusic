import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('initialisation ...');

  await prisma.type_artiste.upsert({
    where: { Id_type_artiste: 1 },
    update: {},
    create: {
      Id_type_artiste: 1,
      nom_type_artiste: 'Chanteur ',
    },
  });

  await prisma.type_artiste.upsert({
    where: { Id_type_artiste: 2 },
    update: {},
    create: {
      Id_type_artiste: 2,
      nom_type_artiste: 'Rappeur',
    },
  });
    await prisma.type_artiste.upsert({
    where: { Id_type_artiste: 3 },
    update: {},
    create: {
      Id_type_artiste: 3,
      nom_type_artiste: 'Slammeur',
    },
  });

  await prisma.default_stack.upsert({
    where: { Id_stack: 1 },
    update: {},
    create: {
      Id_stack: 1,
      Nom: 'Rec',
    },
  });

  await prisma.default_stack.upsert({
    where: { Id_stack: 2 },
    update: {},
    create: {
      Id_stack: 2,
      Nom: 'Live',
    },
  });

  await prisma.default_stack.upsert({
    where: { Id_stack: 3 },
    update: {},
    create: {
      Id_stack: 3,
      Nom: 'Mix',
    },
  });


  await prisma.studio.upsert({
    where: { Id_studio: 1 },
    update: {},
    create: {
      Id_studio: 1,
      Nom_studio: 'Studio A',
      Etat: true,
    },
  });

  await prisma.studio.upsert({
    where: { Id_studio: 2 },
    update: {},
    create: {
      Id_studio: 2,
      Nom_studio: 'Studio B',
      Etat: true,
    },
  });

  await prisma.artiste.upsert({
    where: { Id_artiste: 1 },
    update: {},
    create: {
      Id_artiste: 1,
      Nom: 'Dupont',
      Pr_nom: 'Jean',
      Email: 'jean.dupont@example.com',
      T_l_phone: '0487956325',
      Id_type_artiste: 1,
      Pseudo: 'jdup',
    },
  });

    await prisma.artiste.upsert({
    where: { Id_artiste: 2 },
    update: {},
    create: {
      Id_artiste: 2,
      Nom: 'Marc',
      Pr_nom: 'Ruffo',
      Email: 'Marc.Ruffo@example.com',
      T_l_phone: '0459768225',
      Id_type_artiste: 3,
      Pseudo: 'Le M',
    },
  });

  console.log('Fin');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
