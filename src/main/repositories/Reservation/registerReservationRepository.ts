import { ipcMain } from "electron";
import { ReservationRepo } from "./reservationRepository";
import { Reservation } from "src/shared/Interface/IModel/reservation";

export function registerReservationRepositories() {
    const reservationRepository = new ReservationRepo();

    ipcMain.handle("reservationRepository: getAllReservation", (e, a) => {
        return reservationRepository.getAllReservation();
    })

    ipcMain.handle("reservationRepository: getReservationbyId", (e, id: number) => {
        return reservationRepository.getReservationById(id);
    })

    ipcMain.handle("reservationRepository: createReservation ", (e, r: Reservation) => {
        return reservationRepository.createReservation(r)
    })

    ipcMain.handle("reservationRepository: deleteReservation", (e, id: number) => {
        return reservationRepository.deleteReservation(id);
    })

    ipcMain.handle("reservationRepository: updateReservation", (e, id: number, r: Reservation) => {
        return reservationRepository.updateReservation(id, r);
    })

    ipcMain.handle("reservationRepository: toggleReservation", (e, id: number) => {
        return reservationRepository.toggleReservation(id);
    })
}