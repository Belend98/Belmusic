import { ipcMain } from "electron";
import { ReservationRepo } from "./reservationRepository";

export function registerReservationRepositories(){
    const reservationRepository = new ReservationRepo();
    
    // ipcMain.handle("reservationRepository: getAllReservation",(e,a) => {
    //     return reservationRepository.getAllReservation();
    // })



}