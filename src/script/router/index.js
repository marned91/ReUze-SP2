// This function controls which JavaScript file is loaded on which page
export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case '/':
      await import('./views/home.js');
      break;
    case '/auth/login':
      await import('./views/login.js');
      break;
    case '/auth/register':
      await import('./views/register.js');
      break;
    case '/profile':
      await import('./views/profile.js');
      break;
    case '/profile/edit':
      await import('./views/profileEdit.js');
      break;
    case '/listing/create':
      await import('./views/listingCreate.js');
      break;
    case '/listing':
      await import('./views/listingView.js');
      break;
    case '/category':
      await import('./views/category.js');
      break;
    case '/listings':
      await import('./views/listingsBrowse.js');
      break;
    default:
      await import('./views/notFound.js');
  }
}
