import { doFetch } from './doFetch.mjs'
import { API_AUCTION } from './constants.mjs'
import { handleAlert } from '../global/handleAlerts.mjs'

/**
 * Places a bid on a specific auction listing.
 *
 * This function sends a POST request to the auction API, submitting a bid amount for the specified listing.
 * If the bid fails, it returns `null` and triggers an error alert.
 *
 * @param {string} listingId - The ID of the auction listing to bid on.
 * @param {number} bidAmount - The amount of the bid being placed.
 * @returns {Promise<Object|null>} A promise that resolves to the bid response if successful, or `null` if the bid fails.
 * @throws {Error} If the request encounters an issue, the error message will be displayed through an alert.
 *
 * @example
 * const listingId = "12345";
 * const bidAmount = 100;
 * const bidResponse = await placeBid(listingId, bidAmount);
 */

export async function placeBid(listingId, bidAmount) {
  const url = `${API_AUCTION}/${listingId}/bids`

  const options = {
    method: 'POST',
    body: JSON.stringify({ amount: bidAmount }),
  }

  try {
    const data = await doFetch(url, options)

    if (!data) {
      handleAlert('Bid failed due to an unknown error', 'error')
      return null
    }

    return data
  } catch (error) {
    handleAlert(
      `Error placing bid: ${error.message || 'Unknown error'}`,
      'error',
    )
    return null
  }
}
