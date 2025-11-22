import { contextBridge} from 'electron'
import { artistService } from './artistService'
import IAllService from 'src/shared/Interface/IServices/IAllService'
import { ReservationService } from './reservationService'
import { StudioService } from './studioService'
import { StackService } from './stackService'
import { SessionService } from './sessionService'




contextBridge.exposeInMainWorld('api', {
	artistService : artistService(),
	reservationService : ReservationService(),
	studioService : StudioService(),
	stackService: StackService(),
	sessionService : SessionService()
	

} as IAllService)



