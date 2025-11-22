import Artist from "src/shared/Interface/IModel/artist";
import { ref } from "vue";

export function useArtists() {
    const artists = ref<Artist[]>([]);

    const getAllArtists = async () => {
        artists.value = await window.api.artistService.getAllArtists();
    };

    const createArtist = async (a: Artist) => {
        await window.api.artistService.createArtist(a);
        await getAllArtists();
    };

    const updateArtist = async (id: number, a: Artist) => {
        await window.api.artistService.updateArtist(id, a);
        await getAllArtists();
    };

    const deleteArtist = async (id: number) => {
        await window.api.artistService.deleteArtist(id);
        await getAllArtists();
    };

    const getArtistById = async (id: number) => {
        return await window.api.artistService.getArtistById(id);
    };

    return {
        artists,
        getAllArtists,
        createArtist,
        updateArtist,
        deleteArtist,
        getArtistById
    }
}

