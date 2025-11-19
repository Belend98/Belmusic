import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { Reservation } from "src/shared/Interface/IModel/reservation";
import { PrismaClient } from "../prisma/generated/client";
import Artists from "src/renderer/Component/ArtistComponenent/artists.vue";



export class ReservationRepo {
    private dbclient: PrismaClient

    constructor() {
        let adapter = new PrismaMariaDb(process.env.DATABASE_URL)

        this.dbclient = new PrismaClient({ adapter })
    }

    public async getAllReservation(): Promise<Reservation[]> {
        const reservations = await this.dbclient.r_servation.findMany({
            include: {
                artiste: true,
                studio: true,
                default_stack: true,
            }
        })

        return reservations.map((res) => {
            return {
                id_reservation: res.Id_r_servation,
                etat: res.Etat,
                id_artist: res.Id_artiste,
                id_session: res.Id_session,
                id_stack: res.Id_stack,

                artiste: {
                    id_artist: res.Id_artiste,
                    nom: res.artiste.Nom,
                    email: res.artiste.Email,
                    prenom: res.artiste.Pr_nom,
                    telephone: res.artiste.T_l_phone,
                    pseudo: res.artiste.Pseudo,
                    id_type_artist: res.artiste.Id_type_artiste
                },

                studio: {
                    id_studio: res.Id_studio,
                    etat: res.studio.Etat,
                    nom: res.studio.Nom_studio
                },

                stack: {
                    id_stack: res.Id_stack,
                    nom : res.default_stack.Nom
                }
            }

        }
        )
    }

}

