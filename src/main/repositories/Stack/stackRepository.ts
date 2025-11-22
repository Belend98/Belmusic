import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import Stack from "src/shared/Interface/IModel/stack";
import { PrismaClient } from "../prisma/generated/client";

export class StackRepo {
    private dbclient: PrismaClient

    constructor() {
        let adapter = new PrismaMariaDb(process.env.DATABASE_URL)
        this.dbclient = new PrismaClient({ adapter })
    }

    public async getAllStacks(): Promise<Stack[]> {
        const stacks = await this.dbclient.default_stack.findMany();
        return stacks.map(s => ({
            id_stack: s.Id_stack,
            nom: s.Nom
        }));
    }
}
