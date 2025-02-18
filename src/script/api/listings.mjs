import { API_AUCTION } from './constants.mjs'
import { doFetch } from './doFetch.mjs'

//for fetching all listings
export async function fetchListings(tag) {
  try {
    const response = await doFetch(`${API_AUCTION}/search?q=${tag}`)
    console.log('Raw API response in fetchListings:', response)
    const listings = Array.isArray(response) ? response : response?.data || []
    console.log('Filtered listings in fetchListings:', response?.data)
    return listings
  } catch (error) {
    console.error('Error fetching listings:', error)
    return []
  }
}

//for creating listings
export async function createListing(listingData) {
  try {
    const response = await doFetch(API_AUCTION, {
      method: 'POST',
      body: JSON.stringify(listingData),
    })

    console.log('Created Listing Response:', response)
    return response
  } catch (error) {
    console.error('Error creating listing:', error)
    throw error
  }
}
