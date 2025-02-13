import { API_AUTH_LOGIN } from './constants.mjs'
import { API_AUTH_REGISTER } from './constants.mjs'
/**
 * Logs in a user with the provided email and password.
 *
 * This function sends a POST request to the login API, passing the user's email and password in the request body.
 * If the login is successful, the response containing an access token and user data is saved to localStorage.
 *
 * @param {Object} data - The login data.
 * @param {string} data.email - The user's email address.
 * @param {string} data.password - The user's password.
 * @returns {Promise<Object>} A promise that resolves to the user's login response.
 * @throws {Error} Error if the login fails.
 *
 * @example
 * const loginData = { email: "user@example.com", password: "password123" };
 *
 * try {
 *   const userData = await login(loginData);
 *   // Handle successful login here
 * } catch (error) {
 *   // Handle login error here
 * }
 */

export async function login({ email, password }) {
  const body = JSON.stringify({ email, password })

  try {
    const response = await fetch(API_AUTH_LOGIN, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body,
    })

    if (response.ok) {
      const { data } = await response.json()
      const { accessToken: token, ...user } = data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      return data
    }

    throw new Error('Could not log in with this account')
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}
/**
 * Registers a new user with the provided details.
 * 
 * This function sends a POST request to the registration API, passing the user's name, email, password, 
 * and optional avatar details in the request body. If the registration is successful, it returns the 
 * response containing the user's data.
 *
 * @param {Object} data - The registration data.
 * @param {string} data.name - The user's name (required).
 * @param {string} data.email - The user's email address (required).
 * @param {string} data.password - The user's password (required).
 * @param {string} [data.avatar.url] - URL for the user's avatar image.
 * @param {string} [data.avatar.alt] - Alt text for the user's avatar image.
 * @returns {Promise<Object>} A promise that resolves to the user's registration response.
 * @throws {Error} Throws an error if the registration fails or the response is not successful.
 * 
 * @example
 * const userData = {
 *   name: "John Doe",
 *   email: "john@example.com",
 *   password: "password123",
 *   avatar: { url: "https://example.com/avatar.jpg", alt: "John's Avatar" }
 * };
 * 
 * try {
 *   const registeredUser = await register(userData);
 *   // Handle the registered user data here
 * } catch (error) {
 *   // Handle the registration error here
 * }

 */
export async function register({ name, email, password, avatar }) {
  const body = JSON.stringify({
    name,
    email,
    password,
    avatar: { url: avatar.url, alt: avatar.alt },
  })

  try {
    const response = await fetch(API_AUTH_REGISTER, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body,
    })

    if (response.ok) {
      const { data } = await response.json()
      return data
    } else {
      const error = await response.json()
      throw new Error(error.message || 'Could not register account')
    }
  } catch (error) {
    console.error('Registration error:', error)
    throw error
  }
}
