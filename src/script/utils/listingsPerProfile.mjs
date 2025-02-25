import { fetchProfileListings } from '../api/profile.mjs'
import { deleteListing } from '../api/listings.mjs'
import { onDeleteListing } from './onDeleteListing.mjs'

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
    'h-full',
  )

  const plusListingSign = document.createElement('div')
  plusListingSign.textContent = '+'
  plusListingSign.classList.add('text-6xl', 'text-brand-dark')

  const createListingText = document.createElement('p')
  createListingText.textContent = 'New Listing'
  createListingText.classList.add('mt-2', 'text-lg')

  createListingCard.append(plusListingSign, createListingText)
  listingsContainer.appendChild(createListingCard)

  const listings = await fetchProfileListings(username)

  listings.forEach(
    ({ id, title, description, media, endsAt, _count, bids }) => {
      const listingCard = document.createElement('div')
      listingCard.href = `/listings/${id}`
      listingCard.classList.add(
        'p-4',
        'shadow-md',
        'rounded-lg',
        'bg-white',
        'flex',
        'flex-col',
        'h-full',
      )

      const img = document.createElement('img')
      img.src = media?.[0]?.url || '/assets/default-image.jpg'
      img.alt = media?.[0]?.alt || 'Listing image'
      img.classList.add('w-full', 'h-48', 'object-cover', 'rounded-t-lg')

      const contentWrapper = document.createElement('div')
      contentWrapper.classList.add('flex', 'flex-col', 'h-full')

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

      const lastBid = document.createElement('p')
      const currentBidLabel = document.createElement('span')
      currentBidLabel.textContent = 'Current Bid:'
      currentBidLabel.classList.add('font-bold')

      const currentBidValue = document.createElement('span')
      currentBidValue.textContent =
        _count?.bids > 0 ? `$${bids[bids.length - 1].amount}` : '$0'
      currentBidValue.classList.add('font-normal')

      lastBid.classList.add('text-sm', 'text-gray-600', 'mt-1')
      lastBid.append(currentBidLabel, currentBidValue)

      const deleteListingIcon = document.createElement('i')
      deleteListingIcon.classList.add(
        'fa-solid',
        'fa-trash',
        'text-brand-dark',
        'cursor-pointer',
        'hover:text-red-700',
        'text-lg',
      )
      deleteListingIcon.id = 'delete-listing-icon'

      // Replace the event listener with the onDeleteListing function
      deleteListingIcon.addEventListener('click', (event) => {
        onDeleteListing(event, id)
      })

      const deleteWrapper = document.createElement('div')
      deleteWrapper.classList.add('flex', 'justify-end', 'mt-auto')
      deleteWrapper.appendChild(deleteListingIcon)

      contentWrapper.append(
        titleElement,
        descriptionElement,
        endDate,
        bidCount,
        lastBid,
      )
      listingCard.append(img, contentWrapper, deleteWrapper)
      listingsContainer.appendChild(listingCard)
    },
  )
}
