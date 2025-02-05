// This function controls which JavaScript file is loaded on which page
export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case '/': // Home logged-in users
      await import('./views/home.js');
      break;
    case '/public': // Home non-logged-in users
      await import('./views/publicHome.js');
      break;
    case '/public/listings': // Listings non-logged-in users (categories page)
      await import('./views/listingsBrowse.js');
      break;
    case '/auth/login': // Login
      await import('./views/login.js');
      break;
    case '/auth/register': // Register
      await import('./views/register.js');
      break;
    case '/profile': // Profile logged-in users
      await import('./views/profile.js');
      break;
    case '/profile/update': // Update profile logged-in users
      await import('./views/profileUpdate.js');
      break;
    case '/listings/create': // Create new listing logged-in users
      await import('./views/listingCreate.js');
      break;
    case '/listing/single': // View listing. Logged in users can place bids, non-logged-in users will not get this option
      await import('./views/listingView.js');
      break;
    case '/listings/category': // Listings per category for all users
      const category = pathname.split('/').pop();
      const validCategories = [
        'sport',
        'fashion',
        'interior',
        'art',
        'decor',
        'vintage',
      ];
      if (validCategories.includes(category)) {
        await import(`./views/listingsPerCategory.js`);
      } else {
        await import('./views/notFound.js');
      }
      break;
    default:
      await import('./views/notFound.js');
  }
}
