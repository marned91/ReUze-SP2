import { handleAlert } from '../../global/handleAlerts.mjs'
import { login } from '../../api/auth.mjs'
/**
 * Handles the login process by gathering form data and calling the login function from the API.
 *
 * This function prevents the default form submission behavior, retrieves the email and password
 * from the form, and calls the `login` function from the API. On successful login, it alerts the user,
 * resets the form, and redirects to the homepage. If the login fails, it shows an error message.
 *
 * @param {Event} event - The form submission event triggered when the user attempts to log in.
 * @returns {Promise<Object>} The data returned from the login API function if the login is successful.
 * @throws {Error} If there is an issue with the login request or the credentials are incorrect.
 *
 * @example
 * // Example of how to use the onLogin function:
 * // Assume an event is triggered from the form submission
 * form.addEventListener("submit", (event) => onLogin(event));
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

    // If login fails, `data` will be undefined or `errors` will contain the failure message.
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
