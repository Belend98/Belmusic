import TypeArtist from "src/shared/Interface/IModel/typeArtist";
import { ref } from "vue";

export function useTypeArtistes() {
    const typeArtistes = ref<TypeArtist[]>([]);

    const getAllTypeArtistes = async () => {
        typeArtistes.value = await window.api.typeArtistService.getAllTypeArtist();
    };

    return {
        typeArtistes,
        getAllTypeArtistes
    };
}
