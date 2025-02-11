import { updateHeader } from '../../utils/updateHeader.mjs'
import { authGuard } from '../../utils/authGuard.mjs'
import { setupMenuToggle } from '../../utils/menuToggle.mjs'

authGuard()
updateHeader()
setupMenuToggle()
