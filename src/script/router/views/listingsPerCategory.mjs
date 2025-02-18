import { fetchListings } from '../../api/listings.mjs'

async function displayListings(listings) {
  const listingsContainer = document.getElementById('listings')
  listingsContainer.innerHTML = ''

  if (!Array.isArray(listings) || listings.length === 0) {
    console.log('Listings array is empty or not an array:', listings)
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

    listingElement.appendChild(listingTitle)
    listingElement.appendChild(listingDescription)
    listingElement.appendChild(listingImage)

    listingsContainer.appendChild(listingElement)
  })
}

async function handleListingsPage() {
  const urlParams = new URLSearchParams(window.location.search)
  const tag = urlParams.get('tag')

  if (tag) {
    const listings = (await fetchListings(tag)) || []
    displayListings(listings)
  } else {
    console.error('No tag found in URL')
  }
}

handleListingsPage()
