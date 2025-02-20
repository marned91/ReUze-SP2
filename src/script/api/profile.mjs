import { doFetch } from './doFetch.mjs'
import { API_AUCTION_PROFILE } from './constants.mjs'

// fetch profile listings
export async function fetchProfileListings(username) {
  try {
    const listings = await doFetch(
      `${API_AUCTION_PROFILE}/${username}/listings?_bids=true`,
    )

    if (!listings || listings.length === 0) {
      return { error: 'No listings available.' }
    }

    return { data: listings }
  } catch (error) {
    console.error('Error fetching profile listings:', error)
    return { error: 'Error fetching listings' }
  }
}
