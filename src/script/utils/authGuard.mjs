import { handleAlert } from '../global/handleAlerts.mjs'

/**
 * Protects routes by ensuring the user is authenticated.
 *
 * This function checks if a valid `token` is stored in `localStorage`. If no token is found, the user is redirected
 * to the login page and an error message is displayed. This can be used to protect pages that should only be accessible
 * to logged-in users.
 *
 * @function
 * @returns {void} - This function does not return a value, it performs a redirection if the user is not logged in.
 *
 * @example
 * // Call the authGuard to protect a page from unauthorized access
 * authGuard();
 */
export function authGuard() {
  if (!localStorage.token) {
    handleAlert('You must be logged in to view this page', 'error')
    window.location.href = '/auth/login/'
  }
}
