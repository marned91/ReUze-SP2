import { API_AUCTION } from './constants.mjs'
import { doFetch } from './doFetch.mjs'
import { handleAlert } from '../global/handleAlerts.mjs'

/**
 * Fetches all auction listings filtered by a specified tag.
 *
 * This function sends a request to the auction API, fetching listings that either match the provided tag or fall under the 'other' category.
 * If the 'other' tag is selected, it filters out specific tags (art, fashion, sport, vintage, interior, decor) from the listings.
 * The response is sorted by the creation date in descending order.
 *
 * @param {string} tag - The tag used to filter the listings.
 * @param {number} [page=1] - The page number to fetch (default is 1).
 * @param {number} [limit=50] - The number of listings to fetch per page (default is 50).
 * @returns {Promise<Object[]>} A promise that resolves to an array of auction listings sorted by creation date in descending order.
 * @throws {Error} If the fetch operation encounters an issue.
 *
 * @example
 * const tag = "art";
 * const listings = await fetchAllListingsByTag(tag);
 * // Use the fetched and sorted auction listings here
 */
export async function fetchAllListingsByTag(tag, page = 1, limit = 50) {
  let url = `${API_AUCTION}/?_bids=true&limit=${limit}&page=${page}&sort=created&sortOrder=desc`

  if (tag) {
    if (tag === 'other') {
      const allListings = await doFetch(url)
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

/**
 * Fetches a single auction listing based on the listing ID from the URL.
 *
 * This function extracts the listing ID from the current page's URL query string and sends a request to the auction API to fetch the details of that listing. The listing's bids are also included in the response.
 * If no listing ID is found in the URL, an error message is logged to the console, and the function returns `null`.
 *
 * @returns {Promise<Object|null>} A promise that resolves to the auction listing object if found, or `null` if no listing ID is present in the URL or if the request fails.
 * @throws {Error} If the fetch operation encounters an issue.
 *
 * @example
 * const listing = await fetchSingleListing();
 * if (listing) {
 *   // Use the listing details here
 * } else {
 *   // Handle the case when no listing is found
 * }
 */
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

/**
 * Creates a new auction listing by sending the provided data to the auction API.
 *
 * This function sends a POST request to the auction API with the provided `listingData` in the request body.
 * If the server responds with no content, an error is thrown. Upon a successful response, the function returns the response data.
 *
 * @param {Object} listingData - The data for the new auction listing. The shape of this object should match the expected input for the API.
 * @returns {Promise<Object>} A promise that resolves to the API response for the created listing.
 * @throws {Error} If the creation process encounters an issue, or if the API returns no content.
 *
 * @example
 * const listingData = { title: "Vintage Art Piece", description: "A beautiful vintage painting.", startingPrice: 100 };
 * const createdListing = await createListing(listingData);
 * // The created listing's response data is now available in createdListing
 */
export async function createListing(listingData) {
  try {
    const response = await doFetch(API_AUCTION, {
      method: 'POST',
      body: JSON.stringify(listingData),
    })

    if (response === null) {
      throw new Error('No content received from the server')
    }

    return response
  } catch (error) {
    console.error('Error creating listing:', error)
    throw error
  }
}

/**
 * Fetches auction listings based on the provided search query.
 *
 * This function sends a search request to the auction API using the provided `query`. It filters the listings by checking if the query matches either the title or description, and sorts the results based on title matches.
 *
 * @param {string} query - The search query used to filter the listings.
 * @returns {Promise<Object[]>} A promise that resolves to an array of sorted auction listings that match the search query.
 * @throws {Error} If the fetch operation encounters an issue, an empty array will be returned.
 *
 * @example
 * const query = "vintage art";
 * const listings = await fetchListingsBySearch(query);
 * // Logs the filtered and sorted auction listings matching the search query.
 */
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

/**
 * Deletes an auction listing by its ID.
 *
 * This function sends a DELETE request to the auction API to delete the listing with the specified `id`.
 * If the deletion is successful, a success message is displayed, and the user is redirected to the profile page.
 * If the deletion fails, an error message is shown to the user.
 *
 * @param {string} id - The ID of the listing to be deleted.
 * @returns {Promise<void>} A promise that resolves once the deletion process is complete.
 * @throws {Error} If the deletion request encounters an issue, an error message is shown to the user.
 *
 * @example
 * const listingId = "12345";
 * await deleteListing(listingId);
 * // Deletes the listing with ID '12345' and handles the response.
 */
export async function deleteListing(id) {
  const DELETE_LISTING_API = `${API_AUCTION}/${id}`

  try {
    const response = await doFetch(DELETE_LISTING_API, { method: 'DELETE' })
    if (response === null) {
      handleAlert('Listing deleted successfully!', 'success')
      setTimeout(() => (window.location.pathname = /profile/), 2000)
    } else {
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
