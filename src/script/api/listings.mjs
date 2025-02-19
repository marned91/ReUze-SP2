import { API_AUCTION } from './constants.mjs'
import { doFetch } from './doFetch.mjs'

//for fetching all listings
export async function fetchListings(tag) {
  try {
    const response = await doFetch(`${API_AUCTION}/search?q=${tag}&_bids=true`)
    const listings = Array.isArray(response) ? response : response?.data || []
    return listings
  } catch (error) {
    console.error('Error fetching listings:', error)
    return []
  }
}

//for fetching a single listing
export async function fetchSingleListing() {
  const urlParams = new URLSearchParams(window.location.search)
  const listingId = urlParams.get('id')

  if (!listingId) {
    console.error('No listing ID found in URL.')
    return null
  }

  const response = await doFetch(`${API_AUCTION}/${listingId}?_bids=true`)

  return response || null
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

//for fetching lists based on search
export async function fetchListingsBySearch(query) {
  try {
    const response = await doFetch(
      `${API_AUCTION}/search?q=${query}&_bids=true`,
    )

    const listings = Array.isArray(response) ? response : response?.data || []

    const filteredListings = listings.filter((listing) => {
      const lowerQuery = query.toLowerCase()
      return (
        listing.title.toLowerCase().includes(lowerQuery) ||
        listing.description.toLowerCase().includes(lowerQuery)
      )
    })

    const sortedListings = filteredListings.sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(query.toLowerCase())
      const bTitleMatch = b.title.toLowerCase().includes(query.toLowerCase())

      if (aTitleMatch && !bTitleMatch) return -1
      if (!aTitleMatch && bTitleMatch) return 1

      return 0
    })

    return sortedListings
  } catch (error) {
    console.error('Error fetching listings:', error)
    return []
  }
}
