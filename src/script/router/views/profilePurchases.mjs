import { authGuard } from '../../utils/authGuard.mjs'
import { fetchProfileWins } from '../../api/profile.mjs'
import { handleAlert } from '../../global/handleAlerts.mjs'
import {
  showSkeletonLoader,
  hideSkeletonLoader,
} from '../../utils/skeletonLoader.mjs'

authGuard()

/**
 * Displays the user's winning history on their profile page.
 *
 * This function fetches the user's winning listings from the server using the `fetchProfileWins` function. If the user
 * has no wins, it displays a message encouraging them to browse listings and start bidding. If there are wins, it creates
 * a card for each winning listing, showing the image, title, date of the win, and the final bid amount.
 *
 * @async
 * @returns {void} - This function does not return any value.
 *
 * @example
 * // This will display the user's winning history on their profile page.
 * displayProfileWinningHistory();
 */
async function displayProfileWinningHistory() {
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const username = userInfo?.name
  const profileWinsContainer = document.getElementById('profile-wins')
  profileWinsContainer.innerHTML = ''

  showSkeletonLoader()

  try {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    const wins = await fetchProfileWins(username)

    if (wins.length === 0) {
      const noWinsContainer = document.createElement('div')

      const noWinsMessage = document.createElement('p')
      noWinsMessage.textContent =
        'No wins yet! Browse listings and start bidding on items: '
      noWinsMessage.classList.add('font-small', 'mb-6')
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
      imgElement.alt =
        listing?.media[0]?.alt || listing?.title || 'Listing Image'
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
  } catch (error) {
    handleAlert(
      'An error occurred while loading your wins! Please reload the page.',
      'error',
    )
  } finally {
    hideSkeletonLoader()
  }
}

displayProfileWinningHistory()
