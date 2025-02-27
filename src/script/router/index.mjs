// This function controls which JavaScript file is loaded on which page
export default async function router(pathname = window.location.pathname) {
  console.log('Router is running, pathname:', window.location.pathname)

  const urlParams = new URLSearchParams(window.location.search)
  const category = urlParams.get('tag')

  const normalizedPath = pathname === '/index.html' ? '/' : pathname
  switch (normalizedPath) {
    case '/': // Home logged-in users
      await import('./views/home.mjs')
      break
    case '/public/': // Home non-logged-in users
      await import('./views/publicHome.mjs')
      break
    case '/public/categories/index.html':
    case '/public/categories/': //categories for non-logged in users
      await import('./views/publicCategories.mjs')
      break
    case '/auth/login/index.html': // Login
    case '/auth/login/':
      console.log('Loading login.mjs')
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
    case '/listings/view/index.html': // View listing. Logged in users can place bids, non-logged-in users will not get this option
    case '/listings/view/':
      await import('./views/listingView.mjs')
      break
    case '/listings/search/index.html': // View listings search results
    case '/listings/search/':
      await import('./views/listingsSearchResult.mjs')
      break
    case '/listings/index.html': // all listings per category
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
        } else {
          await import('./views/notFound.mjs')
        }
      } else {
        await import('./views/notFound.mjs')
      }
      break
    default:
      await import('./views/notFound.mjs')
  }
}
