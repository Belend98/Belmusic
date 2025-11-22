import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import Studio from "src/shared/Interface/IModel/studio";
import { PrismaClient } from "../prisma/generated/client";

export class StudioRepo {
    private dbclient: PrismaClient

    constructor() {
        let adapter = new PrismaMariaDb(process.env.DATABASE_URL)
        this.dbclient = new PrismaClient({ adapter })
    }

    public async getAllStudios(): Promise<Studio[]> {
        const studios = await this.dbclient.studio.findMany();
        return studios.map(s => ({
            id_studio: s.Id_studio,
            nom: s.Nom_studio,
            etat: s.Etat
        }));
    }
}
