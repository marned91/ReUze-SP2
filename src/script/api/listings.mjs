import { API_AUCTION, API_KEY } from './constants.mjs'
import { doFetch } from './doFetch.mjs'

export async function fetchListings(tag) {
  try {
    const response = await doFetch(`${API_AUCTION}?_tag=${tag}`)
    return response.data // Assuming response contains a data array
  } catch (error) {
    console.error('Error fetching listings:', error)
    return [] // Return empty array if there's an error
  }
}

//for creating listings
export async function createListing(listingData) {
  return doFetch(API_AUCTION, {
    method: 'POST',
    body: JSON.stringify(listingData),
  })
}
