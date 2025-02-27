import { authGuard } from '../../utils/authGuard.mjs'
import { setupTagNavigation } from '../../utils/goToTag.mjs'
import { setUpSearch } from '../../utils/searchListings.mjs'

authGuard()
setupTagNavigation()
setUpSearch('#search-input', '#search-button')
