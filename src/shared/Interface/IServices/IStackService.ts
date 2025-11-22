import Stack from "../IModel/stack";

export interface IStackService {
    getAllStacks(): Promise<Stack[]>;
}
