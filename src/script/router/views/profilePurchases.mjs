import { authGuard } from '../../utils/authGuard.mjs'
import { fetchProfileWins } from '../../api/profile.mjs'

authGuard()

async function displayProfileWinningHistory() {
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const username = userInfo?.name
  const profileWinsContainer = document.getElementById('profile-wins')
  profileWinsContainer.innerHTML = '' // Clear the container before appending new content

  const wins = await fetchProfileWins(username)

  if (wins.length === 0) {
    const noWinsContainer = document.createElement('div')

    const noWinsMessage = document.createElement('p')
    noWinsMessage.textContent =
      'No wins yet! Browse listings and start bidding on items: '
    noWinsMessage.classList.add('font-small', 'mb-6') // Centering the message and adding margin
    noWinsContainer.appendChild(noWinsMessage)

    const noWinsButton = document.createElement('a')
    noWinsButton.href = '/'
    noWinsButton.classList.add(
      'bg-accent-dark',
      'font-mediumFont',
      'text-white',
      'rounded-3xl',
      'py-3',
      'px-5',
      'w-fit',
      'transition',
      'duration-300',
      'ease-out',
      'hover:scale-105',
      'block',
    )
    noWinsButton.textContent = 'Browse Categories'

    noWinsContainer.appendChild(noWinsButton)
    profileWinsContainer.appendChild(noWinsContainer)

    return
  }

  wins.forEach((win) => {
    const winCard = document.createElement('div')
    winCard.classList.add(
      'bg-white',
      'rounded-lg',
      'shadow-xl',
      'overflow-hidden',
      'p-4',
      'bg-white',
      'flex',
      'flex-col',
      'justify-between',
      'border',
      'mt-5',
    )

    const listing = win
    const image =
      listing?.media?.length > 0
        ? listing.media[0].url
        : '/assets/default-listing-image.png'
    const imgElement = document.createElement('img')
    imgElement.src = image
    imgElement.alt = listing?.media[0]?.alt || listing?.title || 'Listing Image'
    imgElement.classList.add('w-full', 'h-48', 'object-cover')
    winCard.appendChild(imgElement)

    const title = document.createElement('h3')
    title.textContent = listing?.title || 'No listing title'
    title.classList.add('font-bold', 'text-xl', 'mt-4')
    winCard.appendChild(title)

    const winTime = document.createElement('p')
    const winDate = new Date(listing.created)
    winTime.textContent = `Won on: ${winDate.toLocaleString()}`
    winTime.classList.add('text-sm', 'mt-2', 'italic', 'text-gray-600')
    winCard.appendChild(winTime)

    const highestBid =
      Array.isArray(listing.bids) && listing.bids.length
        ? Math.max(...listing.bids.map((bid) => bid.amount))
        : 0
    const finalBid = document.createElement('p')
    finalBid.textContent = `Bought for: $${highestBid}`
    finalBid.classList.add('font-semibold', 'mt-2')
    winCard.appendChild(finalBid)

    profileWinsContainer.appendChild(winCard)
  })
}

displayProfileWinningHistory()
