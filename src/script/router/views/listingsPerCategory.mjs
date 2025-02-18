import { fetchListings } from '../../api/listings.mjs'

async function displayListings(listings) {
  const listingsContainer = document.getElementById('listings')
  listingsContainer.innerHTML = ''

  if (listings.length === 0) {
    const noListingsMessage = document.createElement('p')
    noListingsMessage.textContent = 'No listings available for this tag.'
    listingsContainer.appendChild(noListingsMessage)
  }

  listings.forEach((listing) => {
    const listingElement = document.createElement('div')
    listingElement.classList.add('listing')

    const listingTitle = document.createElement('h2')
    listingTitle.textContent = listing.title

    const listingDescription = document.createElement('p')
    listingDescription.textContent =
      listing.description || 'No description added'

    const listingImage = document.createElement('img')
    const imageSrc =
      listing.media && listing.media[0]
        ? listing.media[0].url
        : '/assets/default-listing-image.png'
    listingImage.src = imageSrc
    listingImage.alt = listing.title

    // Append elements to the listing element
    listingElement.appendChild(listingTitle)
    listingElement.appendChild(listingDescription)
    listingElement.appendChild(listingImage)

    // Append the listing element to the container
    listingsContainer.appendChild(listingElement)
  })
}

async function handleListingsPage() {
  const urlParams = new URLSearchParams(window.location.search)
  const tag = urlParams.get('tag') // Get the tag from the query string

  if (tag) {
    const listings = await fetchListings(tag) // Fetch listings for the tag
    displayListings(listings) // Display the listings
  } else {
    console.error('No tag found in URL')
  }
}
