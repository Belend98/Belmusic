import { IArtistService } from "./IArtistService";




export default interface IAllService{
  artistService: IArtistService;

};

declare global {

  interface Window {
    api: IAllService
  }
}

export {}
