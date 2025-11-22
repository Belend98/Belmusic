import Artist from "./artist";
import Stack from "./stack";
import Studio from "./studio";

import  Session  from "./session";

export interface Reservation {
    id_reservation? : number,
    etat? : boolean,
 
    artiste: Artist, 
    studio : Studio,
    stack : Stack
    session : Session
}