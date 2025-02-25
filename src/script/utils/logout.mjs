/**
 * This function should log the user out by removing user data from the browser.
 * This includes the removal of the user's token and user information.
 * After logging out, it alerts the user and redirects them to the login page.
 *
 * @function onLogout
 * @returns {void} This function does not return a value.
 */

async function onLogout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  alert('You have been logged out', 'info')

  setTimeout(() => (window.location.href = '/auth/login/'), 2000)
}

/**
 * Functions you attach to logout events that calls ui/auth/logout function
 */
export function setLogoutListener() {
  const logoutElement = document.querySelector('#logout')

  if (logoutElement) {
    logoutElement.addEventListener(
      'click',
      (event) => {
        event.preventDefault() // Prevent unexpected behavior
        event.stopImmediatePropagation() // Stops multiple event triggers
        onLogout()
      },
      { once: true },
    ) // Ensures the event only runs once
  }
}
