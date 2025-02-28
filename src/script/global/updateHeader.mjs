/**
 * Updates the visibility of header elements based on the user's login status.
 *
 * This function checks if a valid login token exists in `localStorage`.
 * - If the user is logged in (token exists), it shows the user's profile options and logout button, while hiding the signup, login, home, and categories options.
 * - If no token is found (user is not logged in), it hides the user's profile options and logout button, while showing the signup, login, home, and categories options.
 *
 * @returns {void}
 *
 * @example
 * updateHeader();
 * // Updates the header elements based on the login status of the user.
 */
export function updateHeader() {
  const mobileProfileElement = document.getElementById('profile-mobile')
  const profileElement = document.getElementById('profile')
  const signupElement = document.getElementById('signup')
  const mobileSignUpElement = document.getElementById('signup-mobile')
  const logoutElement = document.getElementById('logout')
  const loginElement = document.getElementById('login')

  const loginToken = localStorage.getItem('token')

  if (loginToken) {
    signupElement.classList.add('hidden')
    mobileSignUpElement.classList.add('hidden')
    loginElement.classList.add('hidden')

    profileElement.classList.remove('hidden')
    mobileProfileElement.classList.remove('hidden')
    logoutElement.classList.remove('hidden')
  } else {
    signupElement.classList.remove('hidden')
    mobileSignUpElement.classList.remove('hidden')
    loginElement.classList.remove('hidden')

    profileElement.classList.add('hidden')
    mobileProfileElement.classList.add('hidden')
    logoutElement.classList.add('hidden')
  }
}
