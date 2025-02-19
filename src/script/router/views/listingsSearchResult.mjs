import { fetchListingsBySearch } from '../../api/listings.mjs'
import { setUpSearch } from '../../utils/searchListings.mjs'

setUpSearch('#search-input', '#search-button')

async function displaySearchResults() {
  const urlParams = new URLSearchParams(window.location.search)
  const query = urlParams.get('q')

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
  }
}

async function displaySearchListings(listings) {
  const searchResultsDiv = document.getElementById('search-results')
  listings.forEach((listing) => {
    const listingDiv = document.createElement('div')
    listingDiv.classList.add(
      'listing-item',
      'p-4',
      'shadow-xl',
      'bg-white',
      'flex',
      'flex-col',
      'justify-between',
      'min-h-[300px]',
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
    descriptionLabel.textContent = listing.description.slice(0, 100) + '...'
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
      // This will show if there are bids
      const currentBidValue = document.createElement('span')
      currentBidValue.textContent = `$${listing.bids[listing.bids.length - 1].amount}`
      currentBidValue.classList.add('font-normal')

      listingBid.classList.add('text-sm', 'text-gray-600', 'mt-1')
      listingBid.append(bidLabel, currentBidValue)
    } else {
      // This will show if there are no bids
      const noBidsValue = document.createElement('span')
      noBidsValue.textContent = 'No bids yet'
      noBidsValue.classList.add('font-normal')

      listingBid.classList.add('text-sm', 'text-gray-600', 'mt-1')
      listingBid.append(bidLabel, noBidsValue)
    }

    const tagsDiv = document.createElement('div')
    tagsDiv.classList.add('flex', 'flex-wrap', 'gap-2', 'mt-5', 'space-x-2')

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
