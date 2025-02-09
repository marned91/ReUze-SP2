/**
 * This function should log the user out by removing aproppriate user data from the browser.
 * This includes the removal of the user's token and user information.
 * After logging out, it alerts the user and redirects them to the login page.
 *
 * @function onLogout
 * @returns {void} This function does not return a value.
 */

export function onLogout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  alert('You have been logged out', 'info')

  setTimeout(() => (window.location.pathname = '/public/'), 2000)
}

/**
 * Functions you attach to logout events that calls ui/auth/logout function
 */

export function setLogoutListener() {
  const logoutButton = document.querySelector('#logout-nav')

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      onLogout()
    })
  }
}
