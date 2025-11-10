import Artist from "../artist";

export interface IArtistService {
    getAllArtist: () => Promise<Artist[]>,
    createArtist : (a: Artist) => Promise<void>,
    deleteArtist : (id: number) => Promise<void>,
    updateArtist: (id: number, a : Artist) => Promise<void>

    
}