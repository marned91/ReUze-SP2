import { fetchSingleListing } from '../../api/listings.mjs'
import { handleBid } from '../../utils/handleBid.mjs'
import { handleAlert } from '../../global/handleAlerts.mjs'
import {
  showSkeletonLoader,
  hideSkeletonLoader,
} from '../../utils/skeletonLoader.mjs'

/**
 * Displays a single listing's details.
 *
 * This function fetches a single listing using the `fetchSingleListing` function, processes its data,
 * and dynamically populates the page with details such as the listing's image, title, description, deadline,
 * bid count, bid information, and status (active or expired).
 * It also shows the bidding option if the listing is still active and the user is authenticated.
 *
 * @async
 * @returns {Promise<void>} - A promise that resolves when the single listing has been displayed.
 *
 * @example
 * // This will display the details of a single listing.
 * displaySingleListing();
 *
 */

async function displaySingleListing() {
  const contentContainer = document.getElementById('single-listing-container')
  contentContainer.classList.add('hidden')

  showSkeletonLoader()

  const listing = await fetchSingleListing()

  contentContainer.classList.remove('hidden')

  hideSkeletonLoader()

  if (!listing) {
    handleAlert('Listing not found. Please reload the page', 'error')
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

  // Create title container
  const titleContainer = document.createElement('div')
  titleContainer.classList.add('flex', 'items-center', 'gap-4', 'flex-wrap')

  // Create title element
  const title = document.createElement('h1')
  title.textContent = listing.title || 'No title available'
  title.classList.add('font-largeFont', 'text-4xl')

  // Create tags container
  const tagsDiv = document.createElement('div')
  tagsDiv.classList.add('flex', 'flex-wrap', 'gap-1')

  // Add status tag
  const currentDateTag = new Date()
  const endAtDate = new Date(listing.endsAt)
  const status = endAtDate > currentDateTag ? 'active' : 'expired'

  const statusElement = document.createElement('span')
  statusElement.textContent = status
  statusElement.classList.add(
    'rounded-full',
    'text-white',
    'text-xs',
    'px-3',
    'py-1.5',
    status === 'active' ? 'bg-accent-dark' : 'bg-accent-light',
  )
  tagsDiv.appendChild(statusElement)

  // Add listing tags
  if (listing.tags && listing.tags.length > 0) {
    listing.tags.forEach((tag) => {
      const tagElement = document.createElement('span')
      tagElement.textContent = tag
      tagElement.classList.add(
        'rounded-full',
        'bg-brand-dark',
        'text-white',
        'text-xs',
        'px-3',
        'py-1.5',
      )
      tagsDiv.appendChild(tagElement)
    })
  }

  // Append title and tags together
  titleContainer.append(title, tagsDiv)

  const description = document.createElement('p')
  description.textContent = listing.description || 'No description added.'
  description.classList.add('font-smallFont', 'italic', 'mt-7', 'font-light')

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

  singleListingInfo.append(
    titleContainer,
    description,
    deadline,
    bidCount,
    bidInfo,
  )

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

const bidButton = document.getElementById('bid-button')

const urlParams = new URLSearchParams(window.location.search)
const listingId = urlParams.get('id')

bidButton.addEventListener('click', async (event) => {
  event.preventDefault()

  const bidAmount = document.getElementById('bid-amount').value

  try {
    const result = await handleBid(listingId, bidAmount, displaySingleListing)
  } catch (error) {
    handleAlert('Failed to place bid. Please try again.')
  }
})

displaySingleListing()
