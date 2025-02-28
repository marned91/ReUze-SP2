// import { setupTagNavigation } from '../../utils/goToTag.mjs'
// import { setUpSearch } from '../../utils/searchListings.mjs'

// console.log('home.mjs is loading')

export async function updateHomePage() {
  const homeLoggedInContent = document.getElementById('home-logged-in')
  const homeNotLoggedInContent = document.getElementById('home-not-logged-in')

  const loginToken = localStorage.getItem('token')

  if (loginToken) {
    homeNotLoggedInContent.classList.add('hidden')
    homeLoggedInContent.classList.remove('hidden')
  } else {
    homeNotLoggedInContent.classList.remove('hidden')
    homeLoggedInContent.classList.add('hidden')
  }
}
