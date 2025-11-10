import { contextBridge, ipcRenderer } from 'electron'


contextBridge.exposeInMainWorld('api', {
	getAllArtists: async (): Promise<any[]> => {
		return await ipcRenderer.invoke('artistRepository:getAllArtists')
	},
}),

contextBridge.exposeInMainWorld('api', {
	createArtist: async (): Promise<void> =>{
		return await ipcRenderer.invoke('artistRepository:createArtist')
	}
} )

