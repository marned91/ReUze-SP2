import { fetchAllListings } from '../../api/listings.mjs'
import { tagCategories } from '../../utils/tagsHandling.mjs'

async function displayListings() {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    const tag = urlParams.get('tag')

    if (!tag) {
      console.error('No tag provided in URL query')
      return
    }

    const pageTitle = document.getElementById('listings-headline')
    pageTitle.textContent = tag[0].toUpperCase() + tag.slice(1)

    const listings = (await fetchAllListings()) || []

    const listingsWithFixedTags = listings.map((listing) => {
      if (!Array.isArray(listing.tags) || listing.tags.length === 0) {
        return {
          ...listing,
          tags: tagCategories(listing.title, listing.description),
        }
      }
      return listing
    })

    const filteredListings = listingsWithFixedTags.filter(
      (listing) => Array.isArray(listing.tags) && listing.tags.includes(tag),
    )

    const listingsContainer = document.getElementById('listings')
    listingsContainer.innerHTML = ''

    if (filteredListings.length === 0) {
      const noListingsMessage = document.createElement('p')
      noListingsMessage.textContent =
        'No listings available in this category at the moment. Please check back later!'
      listingsContainer.appendChild(noListingsMessage)
      return
    }

    filteredListings.forEach((listing) => {
      const listingElement = createListingElement(listing)
      listingsContainer.appendChild(listingElement)
    })
  } catch (error) {
    console.error('Error displaying listings by tag:', error)
  }
}

function createListingElement(listing) {
  const listingElement = document.createElement('div')
  listingElement.classList.add('listing')

  const imageElement = document.createElement('img')
  const imageSrc =
    listing.media && listing.media[0]
      ? listing.media[0].url
      : '/assets/default-listing-image.png'
  imageElement.src = imageSrc
  imageElement.alt = listing.title
  listingElement.appendChild(imageElement)

  const titleElement = document.createElement('h2')
  titleElement.textContent = listing.title
  listingElement.appendChild(titleElement)

  const descriptionElement = document.createElement('p')
  descriptionElement.textContent = listing.description || 'No description added'
  listingElement.appendChild(descriptionElement)

  const deadlineElement = document.createElement('p')
  deadlineElement.textContent = `Deadline: ${new Date(listing.endsAt).toLocaleString()}`
  listingElement.appendChild(deadlineElement)

  const bidElement = document.createElement('p')
  let bidAmountText = 'No bids yet'
  if (Array.isArray(listing.bids) && listing.bids.length > 0) {
    const bidAmount = Math.max(...listing.bids.map((bid) => bid.amount))
    bidAmountText = `Current Bid: $${bidAmount}`
  }
  bidElement.textContent = bidAmountText
  listingElement.appendChild(bidElement)

  return listingElement
}

displayListings()
