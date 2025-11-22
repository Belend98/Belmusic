import { Reservation } from "../IModel/reservation";

export interface IReservationService{
    getAllReservation(): Promise<Reservation[]>,
    getReservationById(id: number): Promise<Reservation>,
    createReservation(r: Reservation): Promise<Reservation>,
    deleteReservation(id: number): Promise<void>,
    updateReservation(id: number, r: Reservation): Promise<Reservation>,
    toggleReservation(id: number): Promise<boolean>
}