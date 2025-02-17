import { doFetch } from '../api/doFetch.mjs'
import { API_AUCTION_PROFILE } from '../api/constants.mjs'

export async function displayProfileListings(username) {
  const listingsContainer = document.getElementById('profile-listings')

  const createListingCard = document.createElement('a')
  createListingCard.href = '/listings/create/'
  createListingCard.classList.add(
    'p-6',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'cursor-pointer',
    'transition',
    'duration-300',
    'ease-out',
    'hover:scale-105',
    'shadow-2xl',
    'bg-white',
    'rounded-lg',
  )

  const plusListingSign = document.createElement('div')
  plusListingSign.textContent = '+'
  plusListingSign.classList.add('text-6xl', 'text-brand-dark')

  const createListingText = document.createElement('p')
  createListingText.textContent = 'New Listing'
  createListingText.classList.add('mt-2', 'text-lg')

  createListingCard.append(plusListingSign, createListingText)
  listingsContainer.appendChild(createListingCard)

  try {
    const listings = await doFetch(
      `${API_AUCTION_PROFILE}/${username}/listings?_bids=true`,
    )
    console.log('Fetched Listings:', listings)

    if (!listings || listings.length === 0) {
      const noListingsMessage = document.createElement('p')
      noListingsMessage.textContent = 'No listings available.'
      noListingsMessage.classList.add('text-gray-500', 'mt-4')
      listingsContainer.appendChild(noListingsMessage)
      return
    }

    listings.forEach(
      ({ id, title, description, media, endsAt, _count, bids }) => {
        const listingCard = document.createElement('div')
        listingCard.href = `/listings/${id}`
        listingCard.classList.add('p-4', 'shadow-md', 'rounded-lg', 'bg-white')

        const img = document.createElement('img')
        img.src = media?.[0]?.url || '/assets/default-image.jpg'
        img.alt = media?.[0]?.alt || 'Listing image'
        img.classList.add('w-full', 'h-48', 'object-cover', 'rounded-t-lg')

        const titleElement = document.createElement('h3')
        titleElement.textContent = title
        titleElement.classList.add('text-lg', 'font-semibold', 'mt-2')

        const descriptionElement = document.createElement('p')
        descriptionElement.textContent = description || 'No description added'
        descriptionElement.classList.add(
          'text-sm',
          'text-gray-600',
          'mt-2',
          'italic',
        )

        const endDate = document.createElement('p')
        const deadlineLabel = document.createElement('span')
        deadlineLabel.textContent = 'Deadline: '
        deadlineLabel.classList.add('font-bold')

        const endDateValue = document.createElement('span')
        endDateValue.textContent = new Date(endsAt).toLocaleDateString()
        endDateValue.classList.add('font-normal')

        endDate.classList.add('text-sm', 'text-gray-600', 'mt-3')
        endDate.append(deadlineLabel, endDateValue)

        const bidCount = document.createElement('p')
        const bidsLabel = document.createElement('span')
        bidsLabel.textContent = 'Number of bids: '
        bidsLabel.classList.add('font-bold')

        const bidCountValue = document.createElement('span')
        bidCountValue.textContent = _count?.bids || 0
        bidCountValue.classList.add('font-normal')

        bidCount.classList.add('text-sm', 'text-gray-600', 'mt-1')
        bidCount.append(bidsLabel, bidCountValue)

        listingCard.append(
          img,
          titleElement,
          descriptionElement,
          endDate,
          bidCount,
        )
        if (_count?.bids > 0) {
          const lastBid = document.createElement('p')
          const currentBidLabel = document.createElement('span')
          currentBidLabel.textContent = 'Current Bid:'
          currentBidLabel.classList.add('font-bold')

          const currentBidValue = document.createElement('span')
          currentBidValue.textContent = `$${bids[bids.length - 1].amount}`
          currentBidValue.classList.add('font-normal')

          lastBid.classList.add('text-sm', 'text-gray-600', 'mt-1')
          lastBid.append(currentBidLabel, currentBidValue)

          listingCard.append(lastBid)
        }

        listingsContainer.appendChild(listingCard)
      },
    )
  } catch (error) {
    console.error('Error fetching profile listings:', error)
  }
}
