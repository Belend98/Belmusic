import { PrismaMariaDb } from "@prisma/adapter-mariadb"

import TypeArtist from "src/shared/Interface/IModel/typeArtist"
import { PrismaClient } from "../prisma/generated/client"

export class TypeArtistRepo {
    private dbclient: PrismaClient

    constructor() {
        let adapter = new PrismaMariaDb(process.env.DATABASE_URL)
        this.dbclient = new PrismaClient({ adapter })
    }

    public async getAllTypeArtist(): Promise<TypeArtist[]> {
        const typeArtists = await this.dbclient.type_artiste.findMany();
        return typeArtists.map((t) => {
            return {
                id_type_artiste: t.Id_type_artiste,
                nom: t.nom_type_artiste
            }
        })
    }
}


