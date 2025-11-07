import Artist from "src/shared/artist";
import { PrismaClient } from "./prisma/generated/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

export class ArtistRepository {

    private dbclient: PrismaClient;
    constructor() {
        let adapter = new PrismaMariaDb(process.env.DATABASE_URL);

        this.dbclient = new PrismaClient({adapter});
    }

    /**
     * Récupère tous les artistes et les mappe vers l'interface `Artist`.
     */


    public async getAllArtists(): Promise<Artist[]> {
        const artistes = await this.dbclient.artiste.findMany();

        return artistes.map((t: any) => {
            // Map fields from Prisma model to the frontend/shared interface
            return ({
                id_artist: t.Id_artiste,
                Nom: t.Nom,
                Email: t.Email,
                id_type_artist: t.Id_type_artiste,
                // 'Prénom' contains a non-ASCII character; use a quoted key to be explicit
                'Prénom': t.Pr_nom,
            } as unknown) as Artist;
        });
    }
}
