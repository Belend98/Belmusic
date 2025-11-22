import { ipcRenderer } from "electron";
import { ISessionService } from "src/shared/Interface/IServices/ISessionService";

export function SessionService(): ISessionService {
    return {
        getAllSessions: () => ipcRenderer.invoke("sessionRepository: getAllSessions")
    }
}
