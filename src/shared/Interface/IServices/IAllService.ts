import { IArtistService } from "./IArtistService";
import { IReservationService } from "./IResevationService";
import { ISessionService } from "./ISessionService";
import { IStackService } from "./IStackService";
import { IStudioService } from "./IStudioService";

export default interface IAllService{
  artistService: IArtistService;
  reservationService : IReservationService;
  sessionService : ISessionService;
  stackService : IStackService;
  studioService : IStudioService;
};

declare global {

  interface Window {
    api: IAllService
  }
}

export {}
