import { fetchAllListingsByTag } from '../../api/listings.mjs'
import { setupStatusFilter } from '../../utils/filterActiveExpired.mjs'
import { handleAlert } from '../../global/handleAlerts.mjs'
import {
  showSkeletonLoader,
  hideSkeletonLoader,
} from '../../utils/skeletonLoader.mjs'

/**
 * Fetches and displays listings based on a status filter and selected tag.
 *
 * This function checks for a `tag` in the URL query parameters. If a tag is found, it will display the listings associated with that tag and update the page headline accordingly.
 * It fetches all listings for the given tag, filters them by the specified status (`'all'`, `'active'`, or `'expired'`), and dynamically creates HTML elements to display the listings in a grid.
 * If no listings are available for the tag or status filter, a message will be displayed:
 * "No available listings for this category, please check again later!"
 *
 * Available tags include:
 * - `'art'`
 * - `'fashion'`
 * - `'decor'`
 * - `'interior'`
 * - `'vintage'`
 * - `'sport'`
 * - `'other'`
 *
 * @param {string} [statusFilter='all'] - The status filter for displaying listings. Options are `'all'`, `'active'`, or `'expired'`. Defaults to `'all'`.
 * @returns {void}
 *
 * @example
 * displayListings('active');
 * // Displays all active listings.
 */

async function displayListings(statusFilter = 'all') {
  const urlParams = new URLSearchParams(window.location.search)
  const tag = urlParams.get('tag')

  const headlineElement = document.getElementById('listings-headline')
  if (tag) {
    const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1)
    headlineElement.textContent = `${formattedTag}`
  }

  const listingsContainer = document.getElementById('listings')
  listingsContainer.innerHTML = ''

  showSkeletonLoader()

  try {
    const listings = await fetchAllListingsByTag(tag)

    if (!listings || !listings.length) {
      const noListingsMessage = document.createElement('p')
      noListingsMessage.textContent =
        'No available listings for this category, please check again later!'
      listingsContainer.appendChild(noListingsMessage)
      return
    }

    const filteredListings = filterListingsByStatus(listings, statusFilter)

    filteredListings.forEach((listing) => {
      const listingElement = document.createElement('a')
      listingElement.href = `/listings/view/index.html?id=${listing.id}`
      listingElement.classList.add(
        'border',
        'p-4',
        'shadow-2xl',
        'bg-white',
        'flex',
        'flex-col',
        'justify-between',
        'min-h-[300px]',
        'cursor-pointer',
        'transition',
        'duration-300',
        'ease-out',
        'hover:scale-105',
        'rounded-lg',
      )

      // Default image URL does not work on live page due to a build issue
      // In production, the image at '/assets/default-listing-image.png' is not being included in the 'dist' folder during the build process.
      // Also tested placing the image in the 'public' folder, but it still wasn't included. Possibly due to Vite’s build configuration not copying the image correctly.
      const imageUrl =
        listing.media && listing.media.length > 0
          ? listing.media[0].url
          : '/assets/default-listing-image.png'
      const img = document.createElement('img')
      img.src = imageUrl
      img.alt = listing.title
      img.classList.add('w-full', 'h-48', 'object-cover')

      const title = document.createElement('h2')
      title.textContent = listing.title
      title.classList.add('font-mediumFont', 'text-xl', 'font-medium', 'mt-2')

      const description = document.createElement('p')
      description.textContent =
        listing.description.slice(0, 100) + '...' || 'No description added.'
      description.classList.add(
        'font-smallFont',
        'italic',
        'text-sm',
        'text-gray-600',
        'mt-2',
      )

      const highestBid = listing.bids.length
        ? Math.max(...listing.bids.map((bid) => bid.amount))
        : 0
      const highestBidElement = document.createElement('p')
      highestBidElement.textContent = `Current Bid: $${highestBid}`
      highestBidElement.classList.add('text-sm', 'font-bold', 'mt-1')

      const deadline = new Date(listing.endsAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      const deadlineElement = document.createElement('p')
      deadlineElement.textContent = `Deadline: ${deadline}`
      deadlineElement.classList.add('text-sm', 'mt-2')

      const tagsDiv = document.createElement('div')
      tagsDiv.classList.add('flex', 'flex-wrap', 'gap-1', 'mt-5', 'space-x-2')

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

      const currentDate = new Date()
      const endAtDate = new Date(listing.endsAt)
      const status = endAtDate > currentDate ? 'active' : 'expired'
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

      listingElement.appendChild(img)
      listingElement.appendChild(title)
      listingElement.appendChild(description)
      listingElement.appendChild(deadlineElement)
      listingElement.appendChild(highestBidElement)
      listingElement.appendChild(tagsDiv)

      listingsContainer.appendChild(listingElement)
    })
  } catch (error) {
    handleAlert('Error fetching listings:', error, 'error')
  } finally {
    hideSkeletonLoader()
  }
}

/**
 * Filters listings by their status based on the provided status filter.
 *
 * This function filters the listings array based on the status of each listing.
 * The status is determined by comparing the `endsAt` date of each listing with the current date.
 * Listings are classified as `'active'` if their `endsAt` date is in the future, and `'expired'` if the `endsAt` date is in the past.
 * The status filter can be set to `'all'` to include all listings, `'active'` to include only active listings, or `'expired'` to include only expired listings.
 *
 * @param {Array} listings - The array of listings to be filtered. Each listing should have an `endsAt` field representing the deadline date.
 * @param {string} statusFilter - The status filter. Can be `'all'`, `'active'`, or `'expired'`. Defaults to `'all'`.
 * @returns {Array} - A new array containing the filtered listings based on the specified status.
 *
 * @example
 * const activeListings = filterListingsByStatus(listings, 'active');
 * // Returns all active listings.
 */
function filterListingsByStatus(listings, statusFilter) {
  const currentDate = new Date()

  return listings.filter((listing) => {
    const endAtDate = new Date(listing.endsAt)
    const status = endAtDate > currentDate ? 'active' : 'expired'

    if (statusFilter === 'all') return true
    return statusFilter === status
  })
}

setupStatusFilter(displayListings)

displayListings()
