import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { Reservation } from "src/shared/Interface/IModel/reservation";
import { PrismaClient } from "../prisma/generated/client";



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
                session : true
            }
        })

        return reservations.map((res) => {
            return {
                id_reservation: res.Id_r_servation,
                etat: res.Etat,
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
                },
                
                session : {
                    id_session: res.Id_session,
                    date : res.session.Date,
                    heure_debut : res.session.Heure_debut,
                    heure_fin : res.session.Heure_fin
                }
            }
        }
        )
    }

    public async getReservationById(id : number) : Promise <Reservation> {
        const reservation  = await this.dbclient.r_servation.findUnique({
            where : {
                Id_r_servation : id

            },
            include: {
                artiste: true,
                studio: true,
                default_stack: true,
                session: true
            }
        })

        return {
            id_reservation: reservation.Id_r_servation,
            etat: reservation.Etat,
            artiste: {
                id_artist: reservation.artiste.Id_artiste,
                nom: reservation.artiste.Nom,
                prenom: reservation.artiste.Pr_nom,
                pseudo: reservation.artiste.Pseudo,
                email: reservation.artiste.Email,
                telephone: reservation.artiste.T_l_phone,
                id_type_artist: reservation.artiste.Id_type_artiste
            },
            studio: {
                id_studio: reservation.studio.Id_studio,
                etat: reservation.studio.Etat,
                nom: reservation.studio.Nom_studio
            },
            stack: {
                id_stack: reservation.default_stack.Id_stack,
                nom: reservation.default_stack.Nom
            },
            session: {
                id_session: reservation.session.Id_session,
                date: reservation.session.Date,
                heure_debut: reservation.session.Heure_debut,
                heure_fin: reservation.session.Heure_fin
            }
        }
    }

    public async createReservation(r: Reservation): Promise<Reservation> {
        const sessionDate = new Date(r.session.date);
        const startInput = new Date(r.session.heure_debut);
        const endInput = new Date(r.session.heure_fin);

        
        const getMinutes = (d: Date) => d.getHours() * 60 + d.getMinutes();
        const newStart = getMinutes(startInput);
        const newEnd = getMinutes(endInput);

        
        const existingReservations = await this.dbclient.r_servation.findMany({
            where: {
                Id_studio: r.studio.id_studio,
                session: {
                    Date: sessionDate
                }
            },
            include: {
                session: true
            }
        });

        for (const res of existingReservations) {
            const existingStart = getMinutes(res.session.Heure_debut);
            const existingEnd = getMinutes(res.session.Heure_fin);

            
            if (newStart < existingEnd && newEnd > existingStart) {
                throw new Error("Impossible de réserver : le studio est déjà occupé sur ce créneau.");
            }
        }

        const newRes = await this.dbclient.r_servation.create({
            data: {
                Etat: true,
                artiste: {
                    connect: { Id_artiste: r.artiste.id_artist }
                },
                studio: {
                    connect: { Id_studio: r.studio.id_studio }
                },
                default_stack: {
                    connect: { Id_stack: r.stack.id_stack }
                },
                session: {
                    create: {
                        Date: new Date(r.session.date),
                        Heure_debut: new Date(r.session.heure_debut),
                        Heure_fin: new Date(r.session.heure_fin)
                    }
                }
            },
            include: {
                artiste: true,
                studio: true,
                default_stack: true,
                session : true
            }
        });

        return {
            id_reservation: newRes.Id_r_servation,
            etat: newRes.Etat,
            
            artiste: {
                id_artist: newRes.artiste.Id_artiste,
                nom: newRes.artiste.Nom,
                prenom: newRes.artiste.Pr_nom,
                pseudo: newRes.artiste.Pseudo,
                email: newRes.artiste.Email,
                telephone: newRes.artiste.T_l_phone,
                id_type_artist: newRes.artiste.Id_type_artiste
            },
            studio: {
                id_studio: newRes.studio.Id_studio,
                etat: newRes.studio.Etat,
                nom: newRes.studio.Nom_studio
            },
            stack: {
                id_stack: newRes.default_stack.Id_stack,
                nom: newRes.default_stack.Nom
            },
            session: {
                id_session: newRes.session.Id_session,
                date: newRes.session.Date,
                heure_debut: newRes.session.Heure_debut,
                heure_fin: newRes.session.Heure_fin
            }
        };
    }




    public async updateReservation(id: number, r: Reservation): Promise<Reservation> {
        const updatedRes = await this.dbclient.r_servation.update({
            where: { Id_r_servation: id },
            data: {
                Etat: r.etat,
                artiste: {
                    connect: { Id_artiste: r.artiste.id_artist }
                },
                studio: {
                    connect: { Id_studio: r.studio.id_studio }
                },
                default_stack: {
                    connect: { Id_stack: r.stack.id_stack }
                },
                session: {
                    update: {
                        Date: new Date(r.session.date),
                        Heure_debut: new Date(r.session.heure_debut),
                        Heure_fin: new Date(r.session.heure_fin)
                    }
                }
            },
            include: {
                artiste: true,
                studio: true,
                default_stack: true,
                session: true
            }
        });

        return {
            id_reservation: updatedRes.Id_r_servation,
            etat: updatedRes.Etat,
            artiste: {
                id_artist: updatedRes.artiste.Id_artiste,
                nom: updatedRes.artiste.Nom,
                prenom: updatedRes.artiste.Pr_nom,
                pseudo: updatedRes.artiste.Pseudo,
                email: updatedRes.artiste.Email,
                telephone: updatedRes.artiste.T_l_phone,
                id_type_artist: updatedRes.artiste.Id_type_artiste
            },
            studio: {
                id_studio: updatedRes.studio.Id_studio,
                etat: updatedRes.studio.Etat,
                nom: updatedRes.studio.Nom_studio
            },
            stack: {
                id_stack: updatedRes.default_stack.Id_stack,
                nom: updatedRes.default_stack.Nom
            },
            session: {
                id_session: updatedRes.session.Id_session,
                date: updatedRes.session.Date,
                heure_debut: updatedRes.session.Heure_debut,
                heure_fin: updatedRes.session.Heure_fin
            }
        };
    }

    public async deleteReservation(id: number) : Promise<void> {
        const deletedRes = await this.dbclient.r_servation.delete({
            where : {
                Id_r_servation : id
            }
        })

        if (deletedRes.Id_session) {
            await this.dbclient.session.delete({
                where : {
                    Id_session : deletedRes.Id_session
                }
            })
        }
    }

    public async toggleReservation(id: number): Promise<boolean> {
        const currentState = await this.dbclient.r_servation.findUnique({
            where: { Id_r_servation: id },
            select: { Etat: true }
        });

        const newState = !currentState.Etat;

        await this.dbclient.r_servation.update({
            where: { Id_r_servation: id },
            data: { Etat: newState }
        });

        return newState;
    }
}



