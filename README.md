## Prérequis

Avant de commencer, les prérequis suivants sont nécessaire :

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
    *   Sur VS Code : à la racine du projet, faites un clic droit "Nouveau fichier" puis entrez le nom `.env`.
*   Ajoutez une variable d'environnement avec les identifiants de la base de données.
    *   Format : `DATABASE_URL="mysql://UTILISATEUR:MOT_DE_PASSE@HOTE:PORT/NOM_DE_LA_BASE"`
    *   Exemple : `DATABASE_URL="mysql://root:root@localhost:3306/belmusic"`
*   Faites une migration (créer la base de données à partir du schéma Prisma) en utilisant la commande suivante : `npx prisma migrate reset`

## Lancement du projet

*   Commande pour lancer le projet : `npm start`


