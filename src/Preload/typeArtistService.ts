import { ipcRenderer } from "electron";
import { ITypeArtistService } from "src/shared/Interface/IServices/ITypeArtistService";

export function TypeArtistService(): ITypeArtistService {
    return {
        getAllTypeArtist: () => ipcRenderer.invoke("TypeArtistRepo:getAllTypeArtist")
    }
}
