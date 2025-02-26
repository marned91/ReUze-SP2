import { API_AUCTION } from './constants.mjs'
import { doFetch } from './doFetch.mjs'
import { handleAlert } from '../global/handleAlerts.mjs'

//for fetching all listings
export async function fetchAllListingsByTag(tag, page = 1, limit = 50) {
  let url = `${API_AUCTION}/?_bids=true&limit=${limit}&page=${page}&sort=created&sortOrder=desc`

  if (tag) {
    if (tag === 'other') {
      const allListings = await doFetch(url)
      console.log('All Listings:', allListings)
      const latestListings = allListings
        .filter(
          (listing) =>
            listing.tags &&
            listing.tags.length > 0 &&
            !['art', 'fashion', 'sport', 'vintage', 'interior', 'decor'].some(
              (excludedTag) => listing.tags.includes(excludedTag),
            ),
        )
        .sort((a, b) => new Date(b.created) - new Date(a.created))
      return latestListings.slice(0, 50)
    } else
      url = `${API_AUCTION}/?_tag=${encodeURIComponent(tag)}&_bids=true&limit=${limit}&page=${page}&sort=created&sortOrder=desc`
  }
  const listings = await doFetch(url)

  return listings.sort((a, b) => new Date(b.created) - new Date(a.created))
}

//Fetching a single listing
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

    if (response === null) {
      throw new Error('No content received from the server')
    }

    console.log('API Response:', response)
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

//Delete listing
export async function deleteListing(id) {
  const DELETE_LISTING_API = `${API_AUCTION}/${id}`

  try {
    const response = await doFetch(DELETE_LISTING_API, { method: 'DELETE' })
    if (response === null) {
      handleAlert('Listing deleted successfully!', 'success')
      setTimeout(() => (window.location.pathname = /profile/), 2000)
    } else {
      console.error('Failed to delete the listing:', response)
      throw new Error('Failed to delete the listing')
    }
  } catch (error) {
    console.error(error)
    handleAlert(
      'An error occurred while deleting the listing. Please try again.',
      'error',
    )
  }
}
