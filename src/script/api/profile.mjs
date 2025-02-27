import { doFetch } from '../api/doFetch.mjs'
import { API_AUCTION_PROFILE } from '../api/constants.mjs'

/**
 * Fetches the profile details for a specified user.
 *
 * This function sends a request to the auction API to fetch the profile data for the user identified by the provided `username`.
 * If successful, the user's profile data is returned; otherwise, `null` is returned.
 *
 * @param {string} username - The username of the user whose profile data is to be fetched.
 * @returns {Promise<Object|null>} A promise that resolves to the profile data of the user, or `null` if the request fails.
 * @throws {Error} If the fetch operation encounters an issue, `null` is returned.
 *
 * @example
 * const username = "john_doe";
 * const profile = await fetchProfileData(username);
 * // Fetches the profile data for the user 'john_doe'.
 */
export async function fetchProfileData(username) {
  try {
    const profileData = await doFetch(`${API_AUCTION_PROFILE}/${username}`)
    return profileData
  } catch (error) {
    console.error('Error fetching profile data:', error)
    return null
  }
}

/**
 * Fetches the listings for a specified user's profile.
 *
 * This function sends a request to the auction API to fetch the listings for the user identified by the provided `username`.
 * The listings are returned with bid information included. If the request fails, an empty array is returned.
 *
 * @param {string} username - The username of the user whose listings are to be fetched.
 * @returns {Promise<Object[]>} A promise that resolves to an array of the user's listings, or an empty array if the request fails.
 * @throws {Error} If the fetch operation encounters an issue, an empty array is returned.
 *
 * @example
 * const username = "john_doe";
 * const listings = await fetchProfileListings(username);
 * // Fetches the listings for the user 'john_doe'.
 */
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

/**
 * Updates the profile data for a specified user.
 *
 * This function sends a PUT request to the auction API to update the profile data for the user identified by the provided `username`.
 * The `updatedData` object is sent in the request body, and the response is returned upon successful update.
 * If the request encounters an issue, an error is thrown.
 *
 * @param {string} username - The username of the user whose profile is to be updated.
 * @param {Object} updatedData - An object containing the updated profile information.
 * @returns {Promise<Object>} A promise that resolves to the updated profile data returned by the API.
 * @throws {Error} If the update operation encounters an issue.
 *
 * @example
 * const username = "john_doe";
 * const updatedData = { bio: "New bio content", avatar: "new-avatar-url.jpg" };
 * const updatedProfile = await updateProfileData(username, updatedData);
 * // Updates the profile data for 'john_doe' with the new bio and avatar.
 */
export async function updateProfileData(username, updatedData) {
  try {
    return await doFetch(`${API_AUCTION_PROFILE}/${username}`, {
      method: 'PUT',
      body: JSON.stringify(updatedData),
    })
  } catch (error) {
    console.error('Error updating profile:', error)
    throw error
  }
}

/**
 * Fetches the winning bids for a specified user's profile.
 *
 * This function sends a request to the auction API to fetch the bidding history of the user identified by the provided `username`.
 * The response contains the list of bids that the user has won. If no wins are found or if an error occurs, an empty array is returned.
 *
 * @param {string} username - The username of the user whose winning bids are to be fetched.
 * @returns {Promise<Object[]>} A promise that resolves to an array of the user's winning bids, or an empty array if no wins are found or if an error occurs.
 * @throws {Error} If the fetch operation encounters an issue, an empty array is returned.
 *
 * @example
 * const username = "john_doe";
 * const wins = await fetchProfileWins(username);
 * // Fetches the winning bids for the user 'john_doe'.
 */
export async function fetchProfileWins(username) {
  try {
    const response = await doFetch(
      `${API_AUCTION_PROFILE}/${username}/wins?_bids=true`,
    )
    if (!response || !Array.isArray(response)) {
      console.error('No bidding history found')
      return []
    }

    return response
  } catch (error) {
    console.error('Error fetching profile wins:', error)
    return []
  }
}
