import { contextBridge} from 'electron'
import { artistService } from './artistService'
import IAllService from 'src/shared/Interface/IAllService'



contextBridge.exposeInMainWorld('api', {
	artistService : artistService(),

} as IAllService)



