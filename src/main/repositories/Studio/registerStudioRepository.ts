import { ipcMain } from "electron";
import { StudioRepo } from "./studioRepository";

export function registerStudioRepositories() {
    const studioRepository = new StudioRepo();

    ipcMain.handle("studioRepository: getAllStudios", (e) => {
        return studioRepository.getAllStudios();
    })
}
