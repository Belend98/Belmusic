import { ipcMain, IpcMain } from "electron";
import { ArtistRepository } from "./artist_repository";
import Artist from "src/shared/artist";

export function registerArtistRepo(){
    const artistRepository = new ArtistRepository();

    ipcMain.handle("artistRepository:getAllArtists", (e, a)=> {
        return artistRepository.getAllArtists();
    } )
}