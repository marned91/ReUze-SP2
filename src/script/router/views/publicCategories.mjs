import { setupTagNavigation } from '../../utils/goToTag.mjs'
import { setUpSearch } from '../../utils/searchListings.mjs'

setupTagNavigation()
setUpSearch('#search-input', '#search-button')
