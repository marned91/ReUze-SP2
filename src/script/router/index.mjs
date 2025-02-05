// This function controls which JavaScript file is loaded on which page
export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case '/': // Home logged-in users
      await import('./views/home.mjs')
      break
    case '/public': // Home non-logged-in users
      await import('./views/publicHome.mjs')
      break
    case '/public/listings': // Listings non-logged-in users (categories page)
      await import('./views/listingsBrowse.mjs')
      break
    case '/auth/login': // Login
      await import('./views/login.mjs')
      break
    case '/auth/register': // Register
      await import('./views/register.mjs')
      break
    case '/profile': // Profile logged-in users
      await import('./views/profile.mjs')
      break
    case '/profile/update': // Update profile logged-in users
      await import('./views/profileUpdate.mjs')
      break
    case '/listings/create': // Create new listing logged-in users
      await import('./views/listingCreate.mjs')
      break
    case '/listing/single': // View listing. Logged in users can place bids, non-logged-in users will not get this option
      await import('./views/listingView.mjs')
      break
    case '/listings/category': // Listings per category for all users
      const category = pathname.split('/').pop()
      const validCategories = [
        'sport',
        'fashion',
        'interior',
        'art',
        'decor',
        'vintage',
      ]
      if (validCategories.includes(category)) {
        await import(`./views/listingsPerCategory.mjs`)
      } else {
        await import('./views/notFound.mjs')
      }
      break
    default:
      await import('./views/notFound.mjs')
  }
}
