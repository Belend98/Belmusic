import Artist from "./artist";
import Stack from "./stack";
import Studio from "./studio";

export interface Reservation {
    id_reservation? : number,
    etat? : Boolean,
    id_artist: number,
    id_studio? : number, 
    id_session?: number,
    id_stack?: number,

    artiste: Artist, 
    studio : Studio,
    stack: Stack


    
}