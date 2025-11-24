## Prérequis

Avant de commencer, les prérequis suivants sont nécessaires :

*   [Git](https://git-scm.com/)
*   [Node.js](https://nodejs.org/) (version recommandée : LTS)
*   [MariaDB](https://mariadb.org/) ou [MySQL](https://dev.mysql.com/downloads/)


## Installation (Base de données)

*   Assurez-vous que votre serveur de base de données (MySQL ou MariaDB) est lancé 
*   Ouvrez votre client SQL (recommandé : terminal Mysql) et exécutez la commande suivante : `CREATE DATABASE Belmusic;`

## Installation (Projet)

*   Ouvrez l'IDE de votre choix (recommandé : VS Code).
*   Clonez le dépôt en utilisant le lien suivant : `https://github.com/Belend98/Belmusic.git`
*   Installez les dépendances : `npm install`
*   Créez un fichier `.env` à la racine du projet.
    *   À la racine du projet, créez un nouveau fichier nommé `.env`. Le ("." est important avant le `env`)
*   Ajoutez une variable d'environnement avec les identifiants de la base de données dans le fichier `.env`
    *   Format : `DATABASE_URL="mysql://UTILISATEUR:MOT_DE_PASSE@HOTE:PORT/NOM_DE_LA_BASE"`
    *   Exemple : `DATABASE_URL="mysql://admin:admin@localhost:3306/belmusic"`
*   Faites une migration (création de la base de données à partir du schéma Prisma) en utilisant la commande suivante : `npx prisma migrate reset`. Cette commande génère un client et ajoute des données pour tester l'application. Sélectionnez 'yes' lors de la demande d'exécution de la commande.

    ### Option alternative : Création via script SQL
    Si vous ne souhaitez pas utiliser les migrations Prisma, vous pouvez initialiser la structure de la base de données via le script SQL fourni :
    1.  Assurez-vous d'avoir créé la base de données `Belmusic` (`CREATE DATABASE Belmusic;`).
    2.  Importez ou exécutez le fichier `database_schema.sql` (situé à la racine du projet) dans votre base de données pour créer les tables.
    3.  (Optionnel) Pour insérer des données de test, exécutez le fichier `database_data.sql` (situé à la racine du projet).
    4.  Générez le client Prisma nécessaire au fonctionnement de l'application : `npx prisma generate`.

## Lancement du projet

*   Commande pour lancer le projet : `npm start` ou cliquez sur le triangle `run` de la      commande `start` dans les scripts NPM juste en dessous de l'explorer.

