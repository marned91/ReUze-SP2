import { API_KEY } from './constants.mjs'

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
    if (response.ok) {
      const { data } = await response.json()
      console.log('API Response:', data)
      return data
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
