import { API_AUCTION, API_KEY } from './constants.mjs'
import { doFetch } from './doFetch.mjs'

export async function fetchAllListings() {
  try {
    const token = localStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': API_KEY,
    }
    const listings = await doFetch(API_AUCTION, { method: 'GET', headers })
    return listings
  } catch (error) {
    console.error('Error fetching listings:', error)
    return []
  }
}
