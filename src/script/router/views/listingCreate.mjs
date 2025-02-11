import { authGuard } from '../../utils/authGuard.mjs'
import { updateHeader } from '../../utils/updateHeader.mjs'
import { setupMenuToggle } from '../../utils/menuToggle.mjs'

authGuard()
updateHeader()
setupMenuToggle()
