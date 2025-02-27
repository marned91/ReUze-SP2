import { API_AUTH_LOGIN } from './constants.mjs'
import { API_AUTH_REGISTER } from './constants.mjs'
import { doFetch } from './doFetch.mjs'
/**
 * Logs in a user with the provided email and password.
 *
 * This function sends a POST request to the login API, passing the user's email and password in the request body.
 * If the login is successful, the response containing an access token and user data is saved to localStorage.
 *
 * @param {Object} credentials - The login data.
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<Object|null>} A promise that resolves to the user's login response or null if the request fails.
 * @throws {Error} If the login request encounters an issue.
 *
 * @example
 * const loginData = { email: "user@example.com", password: "password123" };
 * const userData = await login(loginData);
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
 * This function sends a POST request to the registration API with the user's name, email, password, and avatar details.
 *
 * @param {Object} userData - The user registration data.
 * @param {string} userData.name - The user's name.
 * @param {string} userData.email - The user's email address.
 * @param {string} userData.password - The user's password.
 * @param {Object} userData.avatar - The user's avatar information.
 * @param {string} userData.avatar.url - The URL of the user's avatar image.
 * @param {string} userData.avatar.alt - The alt text for the avatar image.
 * @returns {Promise<Object|null>} A promise that resolves to the registration response or null if the request fails.
 * @throws {Error} If the registration request encounters an issue.
 *
 * @example
 * const newUser = {
 *   name: "John Doe",
 *   email: "johndoe@example.com",
 *   password: "securePassword123",
 *   avatar: { url: "https://example.com/avatar.jpg", alt: "John's avatar" }
 * };
 * const response = await register(newUser);
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
