import Session from "src/shared/Interface/IModel/session";
import { ref } from "vue";

export function useSessions() {
    const sessions = ref<Session[]>([]);

    const getAllSessions = async () => {
        sessions.value = await window.api.sessionService.getAllSessions();
    };

    return {
        sessions,
        getAllSessions
    };
}
