import { ipcMain, ipcRenderer } from "electron";
import { artiste } from "src/main/repositories/prisma/generated/client";
import Artist from "src/shared/artist";
import { IArtistService } from "src/shared/Interface/IArtistService";


export function artistService(): IArtistService{
    return {
    getAllArtist : ()=> ipcRenderer.invoke("artistRepository:getAllArtists"),
    createArtist: (a: Artist) => ipcRenderer.invoke("artistRepository:createArtist", a),
    deleteArtist: (id: number)=>ipcRenderer.invoke("artistRepository:delete", id),
    updateArtist : (id: number, a : Artist) => ipcRenderer.invoke("artistRepository:update", id, a)
    }  

}