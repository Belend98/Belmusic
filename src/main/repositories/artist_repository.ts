import Artist from "src/shared/artist";
import { artiste, PrismaClient } from "./prisma/generated/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";


export class ArtistRepository {

    private dbclient: PrismaClient;

    constructor() {
        let adapter = new PrismaMariaDb(process.env.DATABASE_URL);

        this.dbclient = new PrismaClient({ adapter });
    }
    public async getAllArtists(): Promise<Artist[]> {
        const artistes = await this.dbclient.artiste.findMany();

        return artistes.map((t) => {
            return ({
                id_artist: t.Id_artiste,
                nom: t.Nom,
                email: t.Email,
                telephone: t.T_l_phone,
                id_type_artist: t.Id_type_artiste,
                prenom: t.Pr_nom,

            }); //Ne pas mettre unknow, sinon ça bypass le contrat d'interface
        });
    }

    public async createArtist(a: Artist): Promise<void> {
        await this.dbclient.artiste.create({
            data: {
                Id_artiste: a.id_artist,
                Nom: a.nom,
                Pr_nom: a.prenom,
                Email: a.email,
                T_l_phone: a.telephone,
                Id_type_artiste: a.id_type_artist
            }
        })
    }

    public async deleteArtist(id: number): Promise<void> {
        await this.dbclient.artiste.delete({
            where: {
                Id_artiste: id
            }
        })
    }

    public async updateArtist(id: number, a: Artist): Promise<void> {
        await this.dbclient.artiste.update({
            where: {
                Id_artiste: a.id_artist



            },
            data: {
                Nom: a.nom,
                Pr_nom: a.prenom
            }

        })
    }
}

