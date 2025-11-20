import { ipcRenderer } from "electron";
import { IReservationService } from "src/shared/Interface/IServices/IResevationService";

export function ReservationService() : IReservationService {
    return {
        getAllReservation : () => ipcRenderer.invoke("reservationRepository: getAllReservation")
    }
    
    
}