import { contextBridge} from 'electron'
import { artistService } from './artistService'
import IAllService from 'src/shared/Interface/IServices/IAllService'
import { ReservationService } from './reservationService'




contextBridge.exposeInMainWorld('api', {
	artistService : artistService(),
	reservationService : ReservationService(),

} as IAllService)



