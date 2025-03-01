import { fetchListingsBySearch } from '../../api/listings.mjs'
import { setUpSearch } from '../../utils/searchListings.mjs'
import {
  showSkeletonLoader,
  hideSkeletonLoader,
} from '../../utils/skeletonLoader.mjs'

setUpSearch('#search-input', '#search-button')

/**
 * Displays the search results based on the query parameter in the URL.
 *
 * This function retrieves the search query from the URL and fetches the listings that match the search query.
 * It then dynamically displays the search query and the corresponding search results in the `#search-query` and `#search-results` elements.
 * If no results are found, it will display a message indicating that no listings were found.
 *
 * @async
 * @returns {Promise<void>} - A promise that resolves when the search results have been displayed.
 *
 * @example
 * // This will display the search results for the query in the URL.
 * displaySearchResults();
 */
async function displaySearchResults() {
  const urlParams = new URLSearchParams(window.location.search)
  const query = urlParams.get('q')

  showSkeletonLoader()

  if (query) {
    const searchQueryDiv = document.getElementById('search-query')
    const searchHeading = document.createElement('h1')
    searchHeading.textContent = `Search results for: ${query}`
    searchHeading.classList.add('font-largeFont', 'text-4xl')
    searchQueryDiv.appendChild(searchHeading)
  } else {
    return
  }
  const listings = await fetchListingsBySearch(query)
  const searchResultsDiv = document.getElementById('search-results')
  while (searchResultsDiv.firstChild) {
    searchResultsDiv.removeChild(searchResultsDiv.firstChild)
  }

  if (listings.length === 0) {
    const noResultsMessage = document.createElement('p')
    noResultsMessage.textContent = 'No listings found for your search.'
    searchResultsDiv.appendChild(noResultsMessage)
  } else {
    displaySearchListings(listings)
    hideSkeletonLoader()
  }
}

/**
 * Displays the listings returned from a search query.
 *
 * This function creates HTML elements for each listing and appends them to the `#search-results` element.
 * It displays information such as the listing's title, description, deadline, current bid, and tags.
 * Additionally, it handles the display of listings' images and the active/expired status based on the `endsAt` date.
 *
 * @param {Array} listings - The list of listings to display. Each listing should have `id`, `title`, `description`, `media`, `endsAt`, `bids`, and `tags` properties.
 * @returns {void} - This function does not return any value.
 *
 * @example
 * // This will display the listings passed to it.
 * displaySearchListings(listings);
 */
async function displaySearchListings(listings) {
  const searchResultsDiv = document.getElementById('search-results')
  listings.forEach((listing) => {
    const listingDiv = document.createElement('a')
    listingDiv.href = `/listings/view/index.html?id=${listing.id}`
    listingDiv.classList.add(
      'listing-item',
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

    const listingImage = document.createElement('img')
    listingImage.src =
      listing.media && listing.media[0]
        ? listing.media[0].url
        : '/assets/default-listing-image.png'
    listingImage.alt = listing.title
    listingImage.classList.add('w-full', 'h-48', 'object-cover', 'rounded-t-lg')

    const listingTitle = document.createElement('h3')
    listingTitle.textContent = listing.title
    listingTitle.classList.add('text-lg', 'font-semibold', 'mt-2')

    const listingDescription = document.createElement('p')
    const descriptionLabel = document.createElement('span')
    descriptionLabel.textContent =
      listing.description.slice(0, 100) + '...' || 'No description added.'
    descriptionLabel.classList.add('italic', 'text-sm', 'text-gray-600', 'mt-1')

    listingDescription.append(descriptionLabel)

    const listingDeadline = document.createElement('p')
    const deadlineLabel = document.createElement('span')
    deadlineLabel.textContent = 'Deadline: '
    deadlineLabel.classList.add('font-bold')

    const deadlineValue = document.createElement('span')
    deadlineValue.textContent = new Date(listing.endsAt).toLocaleDateString()
    deadlineValue.classList.add('font-normal')

    listingDeadline.classList.add('text-sm', 'text-gray-600', 'mt-1')
    listingDeadline.append(deadlineLabel, deadlineValue)

    const listingBid = document.createElement('p')
    const bidLabel = document.createElement('span')
    bidLabel.textContent = 'Current Bid: '
    bidLabel.classList.add('font-bold')

    if (listing._count?.bids > 0) {
      const currentBidValue = document.createElement('span')
      currentBidValue.textContent = `$${listing.bids[listing.bids.length - 1].amount}`
      currentBidValue.classList.add('font-normal')

      listingBid.classList.add('text-sm', 'text-gray-600', 'mt-1')
      listingBid.append(bidLabel, currentBidValue)
    } else {
      const noBidsValue = document.createElement('span')
      noBidsValue.textContent = 'No bids yet'
      noBidsValue.classList.add('font-normal')

      listingBid.classList.add('text-sm', 'text-gray-600', 'mt-1')
      listingBid.append(bidLabel, noBidsValue)
    }

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

    listingDiv.appendChild(listingImage)
    listingDiv.appendChild(listingTitle)
    listingDiv.appendChild(listingDescription)
    listingDiv.appendChild(listingDeadline)
    listingDiv.appendChild(listingBid)
    listingDiv.appendChild(tagsDiv)

    searchResultsDiv.appendChild(listingDiv)
  })
}

displaySearchResults()
