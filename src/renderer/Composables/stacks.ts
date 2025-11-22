import Stack from "src/shared/Interface/IModel/stack";
import { ref } from "vue";

export function useStacks() {
    const stacks = ref<Stack[]>([]);

    const getAllStacks = async () => {
        stacks.value = await window.api.stackService.getAllStacks();
    };

    return {
        stacks,
        getAllStacks
    };
}
