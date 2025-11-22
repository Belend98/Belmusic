import Studio from "src/shared/Interface/IModel/studio";
import { ref } from "vue";

export function useStudios() {
    const studios = ref<Studio[]>([]);

    const getAllStudios = async () => {
        studios.value = await window.api.studioService.getAllStudios();
    };

    return {
        studios,
        getAllStudios
    };
}
