import { fetchAllListingsByTag } from '../../api/listings.mjs'

async function displayListings() {
  const urlParams = new URLSearchParams(window.location.search)
  const tag = urlParams.get('tag')

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

    listings.forEach((listing) => {
      const listingElement = document.createElement('div')
      listingElement.classList.add('border', 'p-4', 'rounded-lg', 'shadow-lg')

      const imageUrl =
        listing.media && listing.media.length > 0
          ? listing.media[0].url
          : '/assets/default-listing-image.png'
      const img = document.createElement('img')
      img.src = imageUrl
      img.alt = listing.title
      img.classList.add('w-full', 'h-auto', 'object-cover')

      const title = document.createElement('h2')
      title.textContent = listing.title
      title.classList.add('font-mediumFont', 'text-xl', 'font-medium', 'mt-2')

      const description = document.createElement('p')
      description.textContent = listing.description || 'No description added'
      description.classList.add('font-smallFont', 'italic')

      const bids = document.createElement('p')
      bids.textContent = `Bids: ${listing._count.bids}`
      bids.classList.add('text-sm', 'font-smallFont')

      listingElement.appendChild(img)
      listingElement.appendChild(title)
      listingElement.appendChild(description)
      listingElement.appendChild(bids)

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

displayListings()
