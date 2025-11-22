import { ipcRenderer } from "electron";
import { IStackService } from "src/shared/Interface/IServices/IStackService";

export function StackService(): IStackService {
    return {
        getAllStacks: () => ipcRenderer.invoke("stackRepository: getAllStacks")
    }
}
