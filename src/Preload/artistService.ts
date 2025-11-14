import { ipcRenderer } from "electron";

import Artist from "src/shared/artist";
import { IArtistService } from "src/shared/Interface/IArtistService";


export function artistService(): IArtistService{
    return {
    getAllArtists : ()=> ipcRenderer.invoke("artistRepository:getAllArtists"),
    createArtist: (a: Artist) => ipcRenderer.invoke("artistRepository:createArtist", a),
    deleteArtist: (id: number)=>ipcRenderer.invoke("artistRepository:delete", id),
    updateArtist : (a : Artist) => ipcRenderer.invoke("artistRepository:update", a)
    }  

}