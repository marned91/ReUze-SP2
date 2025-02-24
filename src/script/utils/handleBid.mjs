import { placeBid } from '../api/bid.mjs'
import { fetchSingleListing } from '../api/listings.mjs'

export async function handleBid(listingId, bidAmount, displaySingleListing) {
  const token = localStorage.getItem('token')

  if (!token) {
    alert('You must be logged in to place a bid.')
    return
  }

  const numericBidAmount = Number(bidAmount)
  if (isNaN(numericBidAmount) || numericBidAmount <= 0) {
    alert('Please enter a valid bid amount.')
    return
  }

  try {
    const listing = await fetchSingleListing(listingId) // Get the current listing
    const currentBid =
      listing.bids.length > 0 ? listing.bids[listing.bids.length - 1].amount : 0
    const newBid = currentBid + numericBidAmount

    const result = await placeBid(listingId, newBid)

    if (result) {
      alert(
        `Your bid of $${numericBidAmount} has been placed! The new current bid is $${newBid}.`,
      )
      displaySingleListing() // Refresh the listing to show the updated bid
    }
  } catch (error) {
    console.error('Error placing bid:', error)
    alert('Failed to place bid. Please try again.')
  }
}
