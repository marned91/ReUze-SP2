import { doFetch } from './doFetch.mjs'
import { API_AUCTION } from './constants.mjs'

export async function placeBid(listingId, bidAmount) {
  const url = `${API_AUCTION}/${listingId}/bids`

  const options = {
    method: 'POST',
    body: JSON.stringify({ amount: bidAmount }),
  }

  const data = await doFetch(url, options)

  if (!data) {
    console.error('Failed to place bid')
    return null
  }

  return data
}
