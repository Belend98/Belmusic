import { ipcMain } from "electron";
import { StackRepo } from "./stackRepository";

export function registerStackRepositories() {
    const stackRepository = new StackRepo();

    ipcMain.handle("stackRepository: getAllStacks", (e) => {
        return stackRepository.getAllStacks();
    })
}
