import { ipcRenderer } from "electron";
import { IReservationService } from "src/shared/Interface/IServices/IResevationService";
import { Reservation } from "src/shared/Interface/IModel/reservation";

export function ReservationService() : IReservationService {
    return {
        getAllReservation : () => ipcRenderer.invoke("reservationRepository: getAllReservation"), 
        getReservationById : (id: number) => ipcRenderer.invoke("reservationRepository: getReservationbyId", id),
        createReservation : (r: Reservation) => ipcRenderer.invoke("reservationRepository: createReservation ", r),
        deleteReservation : (id: number) => ipcRenderer.invoke("reservationRepository: deleteReservation", id),
        updateReservation : (id: number, r: Reservation) => ipcRenderer.invoke("reservationRepository: updateReservation", id, r),
        toggleReservation : (id: number) => ipcRenderer.invoke("reservationRepository: toggleReservation", id)
    }
    
    
}