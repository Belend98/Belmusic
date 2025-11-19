import { ipcRenderer } from "electron";
import Artist from "src/shared/Interface/IModel/artist";
import { IArtistService } from "src/shared/Interface/IServices/IArtistService";



export function artistService(): IArtistService{
    return {
    getAllArtists : ()=> ipcRenderer.invoke("artistRepository:getAllArtists"),
    createArtist: (a: Artist) => ipcRenderer.invoke("artistRepository:createArtist", a),
    deleteArtist: (id: number)=>ipcRenderer.invoke("artistRepository:delete", id),
    updateArtist : (id: number, a : Artist) => ipcRenderer.invoke("artistRepository:update", id, a),
    getArtistById: (id: number) => ipcRenderer.invoke("artistRepository:getArtistById", id)
    }  

}