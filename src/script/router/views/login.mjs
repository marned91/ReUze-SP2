import { handleAlert } from '../../global/handleAlerts.mjs'
import { login } from '../../api/auth.mjs'

/**
 * Handles the login form submission.
 *
 * This function is triggered when the user submits the login form. It prevents the default form submission,
 * extracts the form data (email and password), and sends it to the `login` function for authentication.
 * It updates the UI to indicate loading, displays success or error alerts based on the result, and redirects
 * the user to the homepage after a successful login.
 *
 * @async
 * @param {Event} event - The submit event triggered when the user attempts to log in.
 * @returns {void} - This function does not return any value.
 *
 * @example
 * // This will handle the login form submission when the user clicks the login button.
 * loginForm.addEventListener('submit', onLogin);
 */
async function onLogin(event) {
  event.preventDefault()

  const form = event.target
  const fieldset = form.querySelector('fieldset')
  const button = form.querySelector('button')
  const originalButtonText = button.textContent

  const formData = new FormData(form)

  const email = formData.get('email')
  const password = formData.get('password')

  fieldset.disabled = true
  button.textContent = 'Logging In...'

  try {
    const data = await login({ email, password })

    if (!data || (data.errors && data.errors.length > 0)) {
      const errorMessage =
        data?.errors?.[0]?.message ||
        'Invalid email or password. Please try again'
      handleAlert(errorMessage, 'error')
      return
    }

    handleAlert('Login successful!', 'success')
    form.reset()

    setTimeout(() => (window.location.pathname = '/'), 2000)
  } catch (error) {
    handleAlert(`Login failed: ${error.message}`, 'error')
  } finally {
    fieldset.disabled = false
    button.textContent = originalButtonText
  }
}

const form = document.forms.login
form.addEventListener('submit', onLogin)
