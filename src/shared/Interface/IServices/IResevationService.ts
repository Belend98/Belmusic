import { Reservation } from "../IModel/reservation";

export interface IReservationService{
    getAllReservation(): Promise<Reservation[]>,
    
    
}