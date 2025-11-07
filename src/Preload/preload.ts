import { contextBridge, ipcRenderer } from 'electron'

// Expose a small, safe API to the renderer process.
contextBridge.exposeInMainWorld('api', {
	getAllArtists: async (): Promise<any[]> => {
		// call the IPC handler registered in registerartistRepositories
		return await ipcRenderer.invoke('artistRepository:getAllArtists')
	},
})
