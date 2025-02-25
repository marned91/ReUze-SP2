import { API_AUTH_LOGIN } from './constants.mjs'
import { API_AUTH_REGISTER } from './constants.mjs'
import { doFetch } from './doFetch.mjs'
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

  const data = await doFetch(API_AUTH_LOGIN, {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/json' },
  })

  if (data) {
    const { accessToken: token, ...user } = data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  }

  return data
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
  const body = {
    name,
    email,
    password,
    avatar: { url: avatar.url, alt: avatar.alt },
  }

  return await doFetch(API_AUTH_REGISTER, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
