import { fetchSingleListing } from '../../api/listings.mjs'
import { handleBid } from '../../utils/handleBid.mjs'

const bidButton = document.getElementById('bid-button')

const urlParams = new URLSearchParams(window.location.search)
const listingId = urlParams.get('id')

bidButton.addEventListener('click', async (event) => {
  event.preventDefault()

  const bidAmount = document.getElementById('bid-amount').value

  try {
    const result = await handleBid(listingId, bidAmount)
    console.log('Bid placed successfully:', result)
  } catch (error) {
    console.error('Error placing bid:', error)
    alert('Failed to place bid. Please try again.')
  }
})

async function displaySingleListing() {
  const listing = await fetchSingleListing()
  console.log('Fetched listing:', listing)

  const urlParams = new URLSearchParams(window.location.search)
  const listingId = urlParams.get('id')

  if (!listing) {
    console.error('Listing not found.')
    return
  }

  const singleListingImage = document.getElementById('single-listing-image')
  const singleListingInfo = document.getElementById('single-listing-info')

  singleListingImage.innerHTML = ''
  singleListingInfo.innerHTML = ''

  // Create image element
  const img = document.createElement('img')
  img.src = listing.media?.[0]?.url || '/assets/default-listing-image.png'
  img.alt = listing.media?.[0]?.alt || listing.title || 'Listing image'
  img.classList.add('w-full', 'max-h-[400px]', 'object-cover', 'rounded-3xl')
  singleListingImage.appendChild(img)

  // Create info elements
  const title = document.createElement('h1')
  title.textContent = listing.title || 'No title available'
  title.classList.add('font-largeFont', 'text-4xl')

  const description = document.createElement('p')
  description.textContent = listing.description || 'No description added.'
  description.classList.add('font-smallFont', 'italic', 'mt-5')

  const deadline = document.createElement('p')
  deadline.textContent = `Deadline: ${new Date(listing.endsAt).toLocaleString()}`
  deadline.classList.add('font-smallFont', 'font-medium', 'text-m', 'mt-10')

  const bidCount = document.createElement('p')
  bidCount.textContent = `Bids: ${listing._count.bids}`
  bidCount.classList.add('text-m', 'font-smallFont', 'font-medium', 'mt-2')

  const bidInfo = document.createElement('p')
  bidInfo.classList.add('font-smallFont', 'font-bold', 'mt-2', 'text-xl')
  if (listing._count?.bids > 0) {
    bidInfo.textContent = `Current bid: $${listing.bids[listing.bids.length - 1].amount}`
  } else {
    bidInfo.textContent = 'No bids yet.'
  }

  // Append all elements
  singleListingInfo.append(title, description, deadline, bidCount, bidInfo)

  const biddingOption = document.getElementById('bid-form')
  const token = localStorage.getItem('token')
  const endsAt = new Date(listing.endsAt)
  const currentDate = new Date()

  if (token && endsAt > currentDate) {
    biddingOption.classList.remove('hidden')
  } else {
    biddingOption.classList.add('hidden')
  }
}

displaySingleListing()
