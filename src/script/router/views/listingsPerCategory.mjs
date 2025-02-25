import { fetchAllListingsByTag } from '../../api/listings.mjs'
import { setupStatusFilter } from '../../utils/filterActiveExpired.mjs'

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
    console.error('Error fetching listings:', error)
    const errorMessage = document.createElement('p')
    errorMessage.textContent = 'Failed to load listings.'
    errorMessage.classList.add('text-red-500')
    listingsContainer.appendChild(errorMessage)
  }
}

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
