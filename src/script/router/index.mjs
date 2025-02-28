import { updateHomePage } from './views/home.mjs'
import { setupTagNavigation } from '../utils/goToTag.mjs'
import { setUpSearch } from '../utils/searchListings.mjs'
// This function controls which JavaScript file is loaded on which page
export default async function router(pathname = window.location.pathname) {
  const urlParams = new URLSearchParams(window.location.search)
  const category = urlParams.get('tag')

  const normalizedPath = pathname === '/index.html' ? '/' : pathname
  switch (normalizedPath) {
    case '/': // Home logged-in users. Calling functions instead of dynamic import as dynamic import resulted in home.mjs being used on all pages
      setupTagNavigation()
      updateHomePage()
      if (
        document.querySelector('#search-input') &&
        document.querySelector('#search-button')
      ) {
        setUpSearch('#search-input', '#search-button')
      }
      break
    case '/auth/login/index.html': // Login
    case '/auth/login/':
      await import('./views/login.mjs')
      break
    case '/auth/register/index.html': // Register
    case '/auth/register/':
      await import('./views/register.mjs')
      break
    case '/profile/': // Profile logged-in users
      await import('./views/profile.mjs')
      break
    case '/profile/update/': // Update profile logged-in users
      await import('./views/profileUpdate.mjs')
      break
    case '/profile/purchases/':
      await import('./views/profilePurchases.mjs')
      break
    case '/listings/create/': // Create new listing logged-in users
      await import('./views/listingCreate.mjs')
      break
    case '/listings/view/index.html': // View listing. Logged-in users can place bids, non-logged-in users will not get this option
    case '/listings/view/':
      await import('./views/listingView.mjs')
      break
    case '/listings/search/index.html': // View listings search results
    case '/listings/search/':
      await import('./views/listingsSearchResult.mjs')
      break
    case '/listings/index.html': // All listings per category
    case '/listings/':
      if (category) {
        const validCategories = [
          'sport',
          'fashion',
          'interior',
          'art',
          'decor',
          'vintage',
          'other',
        ]
        if (validCategories.includes(category.toLowerCase())) {
          await import('./views/listingsPerCategory.mjs')
        }
      }
      break
  }
}
