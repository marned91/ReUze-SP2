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
    case '/auth/login/': // Login
      await import('./views/login.mjs')
      break
    case '/auth/register/': // Register
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
    case '/listing/view/': // View listing. Logged in users can place bids, non-logged-in users will not get this option
      await import('./views/listingView.mjs')
      break
    case '/listings/':
    case '/listings/index.html': // all listings per category
      if (category) {
        const validCategories = [
          'sport',
          'fashion',
          'interior',
          'art',
          'decor',
          'vintage',
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
