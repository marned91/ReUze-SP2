import { API_AUCTION } from '../../api/constants.mjs'

const urlParams = new URLSearchParams(window.location.search)
const category = urlParams.get('tag')

const listingsHeadline = document.getElementById('listings-headline')
const heading = document.createElement('h1')
heading.textContent = `${category}`
listingsHeadline.appendChild(heading)

fetchListings(category)

async function fetchListings(category) {
  try {
    const response = await fetch(`${API_AUCTION}?tags=${category}`)
    const data = await response.json()

    console.log('API Response:', data)

    if (data && data.data && data.data.length > 0) {
      data.data.forEach((listing) => {
        console.log('Listing media:', listing.media)
      })
      displayListings(data.data)
    } else {
      showNoListingsMessage(category)
    }
  } catch (error) {
    console.error('Error fetching listings:', error)
  }
}

function displayListings(listings) {
  const listingsContainer = document.getElementById('listings')
  listingsContainer.innerHTML = ''

  listings.forEach((listing) => {
    const listingElement = createListingElement(listing)
    listingsContainer.appendChild(listingElement)
  })
}

function createListingElement(listing) {
  const listingElement = document.createElement('div')
  listingElement.classList.add('listing-item')

  const image = document.createElement('img')
  image.src = listing.media[0].url
  image.alt = listing.title
  image.classList.add('listing-image')

  listing.media.forEach((mediaItem) => {
    // Check if mediaItem and its 'url' property exist
    if (mediaItem && mediaItem.url) {
      // Proceed with using mediaItem.url
      console.log('Media URL:', mediaItem.url)
    } else {
      // Handle the case where there is no media or url
      console.log('No media or URL found for this listing.')
    }
  })

  const title = document.createElement('h3')
  title.textContent = listing.title
  title.classList.add('listing-title')

  const description = document.createElement('p')
  description.textContent =
    listing.description.length > 100
      ? listing.description.substring(0, 100) + '...'
      : listing.description
  description.classList.add('listing-description')

  const deadline = document.createElement('p')
  deadline.textContent = `Deadline: ${listing.deadline}`
  deadline.classList.add('listing-deadline')

  const currentBid = document.createElement('p')
  currentBid.textContent = `Current bid: $${listing.current_bid}`
  currentBid.classList.add('listing-current-bid')

  listingElement.appendChild(image)
  listingElement.appendChild(title)
  listingElement.appendChild(description)

  return listingElement
}

function showNoListingsMessage(category) {
  const listingsContainer = document.getElementById('listings')
  listingsContainer.innerHTML = ''

  const message = document.createElement('p')
  message.textContent = `No listings available in the "${category}" category at the moment. Please check back later!`
  listingsContainer.appendChild(message)
}
