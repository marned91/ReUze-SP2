/**
 * Logs the user out by removing user data from localStorage and redirecting to /public/.
 */
export function onLogout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  alert('You have been logged out.')

  // Redirect to /public/
  setTimeout(() => {
    window.location.href = '/public/'
  }, 1000)
}

/**
 * Attaches the logout function to the logout button.
 */
export function setLogoutListener() {
  const logoutButton = document.querySelector('#logout-nav')

  if (logoutButton) {
    logoutButton.addEventListener('click', onLogout)
  }
}
