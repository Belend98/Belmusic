import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import  Session  from "src/shared/Interface/IModel/session";
import { PrismaClient } from "../prisma/generated/client";

export class SessionRepo {
    private dbclient: PrismaClient

    constructor() {
        let adapter = new PrismaMariaDb(process.env.DATABASE_URL)
        this.dbclient = new PrismaClient({ adapter })
    }

    public async getAllSessions(): Promise<Session[]> {
        const sessions = await this.dbclient.session.findMany();
        return sessions.map(s => ({
            id_session: s.Id_session,
            date: s.Date,
            heure_debut: s.Heure_debut,
            heure_fin: s.Heure_fin
        }));
    }
}
