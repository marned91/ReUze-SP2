import { fetchSingleListing } from '../../api/listings.mjs'

async function displaySingleListing() {
  const listing = await fetchSingleListing()
  console.log('Fetched listing:', listing)

  if (!listing) {
    console.error('Listing not found.')
    return
  }

  const singleListingImage = document.getElementById('single-listing-image')
  const singleListingInfo = document.getElementById('single-listing-info')

  singleListingImage.innerHTML = ''
  singleListingInfo.innerHTML = ''

  // Create image element
  const img = document.createElement('img')
  img.src = listing.media?.[0]?.url || '/assets/default-listing-image.png'
  img.alt = listing.media?.[0]?.alt || listing.title || 'Listing image'
  img.classList.add('w-full', 'h-auto', 'object-cover')
  singleListingImage.appendChild(img)

  // Create info elements
  const title = document.createElement('h1')
  title.textContent = listing.title || 'No title available'
  title.classList.add('font-largeFont', 'text-4xl')

  const description = document.createElement('p')
  description.textContent = listing.description || 'No description added.'
  description.classList.add('font-smallFont', 'italic', 'mt-5')

  const deadline = document.createElement('p')
  deadline.textContent = `Deadline: ${new Date(listing.endsAt).toLocaleString()}`
  deadline.classList.add('font-smallFont', 'font-bold', 'text-sm', 'mt-20')

  const bidCount = document.createElement('p')
  bidCount.textContent = `Bids: ${listing._count.bids}`
  bidCount.classList.add('text-sm', 'font-smallFont')

  const bidInfo = document.createElement('p')
  bidInfo.classList.add('font-smallFont', 'font-semibold', 'mt-2')
  if (listing._count?.bids > 0) {
    bidInfo.textContent = `Current bid: $${listing.bids[listing.bids.length - 1].amount}`
  } else {
    bidInfo.textContent = 'No bids yet.'
  }

  // Append all elements
  singleListingInfo.append(title, description, deadline, bidCount, bidInfo)
}

displaySingleListing()
