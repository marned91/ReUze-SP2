import { API_KEY } from './constants.mjs'

/**
 * Performs a fetch request with authentication and required headers.
 *
 * This reusable function simplifies API calls by automatically handling authentication tokens,
 * API keys, and JSON responses. It can be used for various API interactions, such as fetching data,
 * creating, updating, or deleting resources.
 *
 * @param {string} url - The API endpoint to fetch data from.
 * @param {Object} [options={}] - Optional settings for the fetch request (e.g., method, headers, body).
 * @param {string} [options.method='GET'] - HTTP request method (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param {Object} [options.headers={}] - Additional headers for the request.
 * @param {Object} [options.body] - Request body, if applicable.
 * @returns {Promise<Object|null>} A promise that resolves to the response data, or null if there is no content.
 * @throws {Error} If the fetch request fails.
 *
 * @example
 * // Example: Fetching data from an API
 * const url = "https://api.example.com/data";
 * try {
 *   const responseData = await doFetch(url);
 *   console.log(responseData);
 * } catch (error) {
 *   console.error("Fetch failed", error);
 * }
 */

export async function doFetch(url, options = {}) {
  try {
    const token = localStorage.getItem('token')

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': API_KEY,
      ...options.headers,
    }
    const response = await fetch(url, { ...options, headers })

    if (response.status === 204) {
      return null
    }

    if (response.ok) {
      const { data } = await response.json()
      return data
    } else {
      const errorResponse = await response.json()
      const errorMessage = errorResponse.errors
        ? errorResponse.errors[0].message
        : 'Unknown error'
      throw new Error(errorMessage)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
