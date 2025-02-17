import { authGuard } from '../../utils/authGuard.mjs'
import { setupCategoryClicks } from '../../utils/categories.mjs'

authGuard()
setupCategoryClicks()

console.log('home.mjs is loading')
