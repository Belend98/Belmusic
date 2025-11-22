import Studio from "../IModel/studio";

export interface IStudioService {
    getAllStudios(): Promise<Studio[]>;
}
