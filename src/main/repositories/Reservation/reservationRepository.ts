import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { Reservation } from "src/shared/Interface/IModel/reservation";
import { PrismaClient } from "../prisma/generated/client";



export class ReservationRepo {
    private dbclient: PrismaClient

    constructor() {
        let adapter = new PrismaMariaDb(process.env.DATABASE_URL)

        this.dbclient = new PrismaClient({ adapter })
    }

    // public async getAllReservation(): Promise<Reservation[]> {
    //     const reservations = await this.dbclient.r_servation.findMany();

    //     return reservations.map((t) => {
    //         return {


    //         }

    //     })



    // }

}

