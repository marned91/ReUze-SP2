import { authGuard } from '../../utils/authGuard.mjs'
import { setupMenuToggle } from '../../utils/menuToggle.mjs'
import { updateHeader } from '../../utils/updateHeader.mjs'

authGuard()
setupMenuToggle()
updateHeader()
