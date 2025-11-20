import { IArtistService } from "./IArtistService";
import { IReservationService } from "./IResevationService";




export default interface IAllService{
  artistService: IArtistService;
  reservationService : IReservationService

};

declare global {

  interface Window {
    api: IAllService
  }
}

export {}
