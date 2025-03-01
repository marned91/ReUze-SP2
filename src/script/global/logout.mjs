import { updateHomePage } from '../router/views/home.mjs'
import { handleAlert } from './handleAlerts.mjs'

/**
 * Logs the user out by removing authentication data from localStorage and redirecting to the login page.
 *
 * This function clears the stored authentication token and user data from localStorage, then displays an alert notifying the user they have been logged out.
 * After a brief delay, the user is redirected to the login page.
 *
 * @returns {void}
 *
 */
async function onLogout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  updateHomePage()

  handleAlert('You have been logged out', 'info')

  setTimeout(() => (window.location.href = '/auth/login/'), 2000)
}

/**
 * Sets up a click event listener on the logout element to trigger the logout process.
 *
 * This function finds the element with the ID `logout` and adds a click event listener.
 * When clicked, it prevents the default behavior, stops the event propagation, and calls the `onLogout` function to log the user out.
 * The listener is set to trigger only once.
 *
 * @returns {void}
 *
 * @example
 * setLogoutListener();
 * // Sets up a logout event listener on the element with the ID "logout" to trigger the logout process.
 */
export function setLogoutListener() {
  const logoutElement = document.querySelector('#logout')
  logoutElement.classList.add('cursor-pointer')

  if (logoutElement) {
    logoutElement.addEventListener(
      'click',
      (event) => {
        event.preventDefault()
        event.stopImmediatePropagation()
        onLogout()
      },
      { once: true },
    )
  }
}
