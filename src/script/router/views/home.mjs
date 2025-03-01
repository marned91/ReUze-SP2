/**
 * Updates the homepage content based on the user's authentication status.
 *
 * - If the user is logged in (determined by the presence of a token in localStorage),
 *   it shows the logged-in content and hides the not-logged-in content.
 * - If the user is not logged in, it does the opposite.
 *
 * @function updateHomePage
 * @returns {void} This function does not return anything.
 */
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
