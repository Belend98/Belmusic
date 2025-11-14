import Artist from "../artist";

export interface IArtistService {
    getAllArtists: () => Promise<Artist[]>,
    createArtist : (a: Artist) => Promise<void>,
    deleteArtist : (id: number) => Promise<void>,
    updateArtist: (id: number, a : Artist) => Promise<void>
    getArtistById: (id: number) => Promise<Artist>

    
}