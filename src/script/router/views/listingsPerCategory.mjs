import { API_AUCTION } from '../../api/constants.mjs'

const urlParams = new URLSearchParams(window.location.search)
const category = urlParams.get('tag')
console.log('Category:', category)

const listingsHeadline = document.getElementById('listings-headline')
const heading = document.createElement('h1')
heading.textContent = `${category}`
listingsHeadline.appendChild(heading)

const normalizedCategory = category ? category.toLowerCase() : ''
fetchListings(normalizedCategory)

async function fetchListings(category) {
  try {
    const response = await fetch(`${API_AUCTION}?tags=${category}`)
    const data = await response.json()
    console.log('Fetched data:', data)

    const listings = data?.data || []
    const filteredListings = listings.filter(
      (listing) => listing.tags && listing.tags.includes(category),
    )

    console.log('Filtered listings:', filteredListings)

    filteredListings.length
      ? displayListings(filteredListings)
      : showNoListingsMessage(category)
  } catch (error) {
    console.error('Error fetching listings:', error)
  }
}

function displayListings(listings) {
  const listingsContainer = document.getElementById('listings')
  listingsContainer.innerHTML = ''

  if (listings.length === 0) {
    showNoListingsMessage()
    return
  }

  listings.forEach((listing) => {
    const listingElement = createListingElement(listing)
    listingsContainer.appendChild(listingElement)
  })
}

function createListingElement(listing) {
  const listingElement = document.createElement('div')
  listingElement.classList.add('listing-item')

  const imageUrl =
    listing.media?.[0]?.url || '/assets/default-listing-image.png'

  const image = document.createElement('img')
  image.src = imageUrl
  image.alt = listing.title
  image.classList.add('listing-image')

  const title = document.createElement('h3')
  title.textContent = listing.title
  title.classList.add('listing-title')

  const description = document.createElement('p')
  description.textContent =
    listing.description?.length > 0
      ? listing.description.length > 100
        ? `${listing.description.substring(0, 100)}...`
        : listing.description
      : 'No description added'
  description.classList.add('listing-description')

  const deadline = document.createElement('p')
  deadline.textContent = `Deadline: ${listing.endsAt}`
  deadline.classList.add('listing-deadline')

  const currentBid = document.createElement('p')
  currentBid.textContent = `Current bid: $${listing._count.bids}`
  currentBid.classList.add('listing-current-bid')

  listingElement.appendChild(image)
  listingElement.appendChild(title)
  listingElement.appendChild(description)
  listingElement.appendChild(deadline)
  listingElement.appendChild(currentBid)

  return listingElement
}

function showNoListingsMessage() {
  const listingsContainer = document.getElementById('listings')
  listingsContainer.innerHTML = ''

  const message = document.createElement('p')
  message.textContent =
    'No listings available in this category at the moment. Please check back later!'
  listingsContainer.appendChild(message)
}
