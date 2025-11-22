import TypeArtist from "../IModel/typeArtist";

export interface ITypeArtistService {
    getAllTypeArtist(): Promise<TypeArtist[]>;
}
