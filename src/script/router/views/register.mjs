import { handleAlert } from '../../global/handleAlerts.mjs'
import { register } from '../../api/auth.mjs'

/**
 * Handles the user registration process.
 *
 * This function is triggered when the registration form is submitted. It collects the form data, including the user's
 * name, email, password, and avatar details, and sends it to the server for registration via the `register` function.
 * Upon successful registration, it displays a success message and redirects the user to the login page. If registration fails,
 * it displays an error message.
 *
 * @async
 * @param {Event} event - The form submission event.
 * @returns {Promise<Object>} - A promise that resolves to the response data from the registration API, or `undefined`
 * if the registration fails.
 *
 * @example
 * // Triggered when the registration form is submitted.
 * onRegister(event);
 */
async function onRegister(event) {
  event.preventDefault()

  const form = event.target
  const fieldset = form.querySelector('fieldset')
  const button = form.querySelector('button')
  const originalButtonText = button.textContent

  const formData = new FormData(form)

  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')
  const avatarUrl = formData.get('avatarUrl')
  const avatarAlt = formData.get('avatarAlt')

  const avatar = {
    url: avatarUrl,
    alt: avatarAlt,
  }

  fieldset.disabled = true
  button.textContent = 'Registering...'

  try {
    const data = await register({ name, email, password, avatar })
    handleAlert('Registration was successful! You can now log in.', 'success')
    form.reset()
    setTimeout(() => (window.location.pathname = '/auth/login/'), 2000)
    return data
  } catch (error) {
    handleAlert(`Registration failed: ${error.message}`, 'error')
    return null
  } finally {
    fieldset.disabled = false
    button.textContent = originalButtonText
  }
}

const form = document.forms.register
form.addEventListener('submit', onRegister)
