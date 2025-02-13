console.log('register.mjs is loaded')
/**
 * This function should pass data to the register function in api/auth and handle the response
 * This function extracts the name, email, password, avatar URL, and avatar alt text from the form data,
 * then calls the `register` function. Upon successful registration, it alerts the user, resets the form,
 * and redirects to the login page.
 *
 * @param {Event} event - The form submission event.
 * @returns {Promise<Object>} The response data from the `register` function, typically containing user details.
 */

import { register } from '../../api/auth.mjs'

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
    alert('Registration was successful! You can now log in.', 'success')
    form.reset()
    setTimeout(() => (window.location.pathname = '/auth/login/'), 2000)
    return data
  } catch (error) {
    alert(`Registration failed: ${error.message}`, 'error')
  } finally {
    fieldset.disabled = false
    button.textContent = originalButtonText
  }
}

onRegister()

const form = document.forms.register

form.addEventListener('submit', onRegister)
