import { ipcMain } from "electron";
import { SessionRepo } from "./sessionRepository";

export function registerSessionRepositories() {
    const sessionRepository = new SessionRepo();

    ipcMain.handle("sessionRepository: getAllSessions", (e) => {
        return sessionRepository.getAllSessions();
    })
}
