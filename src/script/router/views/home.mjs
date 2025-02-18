import { authGuard } from '../../utils/authGuard.mjs'
import { setupTagNavigation } from '../../utils/goToTag.mjs'

authGuard()
setupTagNavigation()

console.log('home.mjs is loading')
