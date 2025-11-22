import { Reservation } from "src/shared/Interface/IModel/reservation";
import { ref } from "vue";

export function useReservations() {
    const reservations = ref<Reservation[]>([]);

    const getAllReservations = async () => {
        reservations.value = await window.api.reservationService.getAllReservation();
    };

    const getReservationById = async (id: number) => {
        return await window.api.reservationService.getReservationById(id);
    };

    const createReservation = async (r: Reservation) => {
        await window.api.reservationService.createReservation(r);
        await getAllReservations();
    };

    const updateReservation = async (id: number, r: Reservation) => {
        await window.api.reservationService.updateReservation(id, r);
        await getAllReservations();
    };

    const deleteReservation = async (id: number) => {
        await window.api.reservationService.deleteReservation(id);
        await getAllReservations();
    };

    const toggleReservation = async (id: number) => {
        await window.api.reservationService.toggleReservation(id);
        await getAllReservations();
    };

    return {
        reservations,
        getAllReservations,
        getReservationById,
        createReservation,
        updateReservation,
        deleteReservation,
        toggleReservation
    };
}
