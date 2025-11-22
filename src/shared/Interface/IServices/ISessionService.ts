import  Session from "../IModel/session";

export interface ISessionService {
    getAllSessions(): Promise<Session[]>;
}
