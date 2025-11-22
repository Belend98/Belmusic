import { ipcRenderer } from "electron";
import { IStudioService } from "src/shared/Interface/IServices/IStudioService";

export function StudioService(): IStudioService {
    return {
        getAllStudios: () => ipcRenderer.invoke("studioRepository: getAllStudios")
    }
}
