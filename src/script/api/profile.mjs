import { doFetch } from '../api/doFetch.mjs'
import { API_AUCTION_PROFILE } from '../api/constants.mjs'

//Fetch profile details
export async function fetchProfileData(username) {
  try {
    const profileData = await doFetch(`${API_AUCTION_PROFILE}/${username}`)
    return profileData
  } catch (error) {
    console.error('Error fetching profile data:', error)
    return null
  }
}

// Fetch profile listings
export async function fetchProfileListings(username) {
  try {
    const listings = await doFetch(
      `${API_AUCTION_PROFILE}/${username}/listings?_bids=true`,
    )
    return listings
  } catch (error) {
    console.error('Error fetching profile listings:', error)
    return []
  }
}
