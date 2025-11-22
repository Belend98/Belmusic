import { ipcMain } from "electron";
import { TypeArtistRepo } from "./typeArtistRespository";

export default function registerTypeArtistRepositories() {
    const typeArtist = new TypeArtistRepo();

    ipcMain.handle("TypeArtistRepo:getAllTypeArtist", e =>{
        return typeArtist.getAllTypeArtist();
    })



}