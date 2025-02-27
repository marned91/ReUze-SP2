import { authGuard } from '../../utils/authGuard.mjs'
import { fetchProfileData } from '../../api/profile.mjs'
import { displayProfileListings } from '../../utils/listingsPerProfile.mjs'
import { handleAlert } from '../../global/handleAlerts.mjs'
import {
  showSkeletonLoader,
  hideSkeletonLoader,
} from '../../utils/skeletonLoader.mjs'

authGuard()

/**
 * Displays the user's profile information on the profile page.
 *
 * This function fetches the profile data of the user from localStorage and the server using the `fetchProfileData`
 * function. It then dynamically updates the profile section with the user's avatar, name, bio, credits, and listing
 * count. Additionally, it provides links to edit the profile and view the purchase history.
 *
 * @async
 * @returns {void} - This function does not return any value.
 *
 * @example
 * // This will display the profile page with the user's information.
 * displayProfile();
 */
async function displayProfile() {
  const profileContainer = document.getElementById('profile-container')
  profileContainer.classList.add('hidden')
  showSkeletonLoader()
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const username = userInfo?.name

  const profileData = await fetchProfileData(username)
  if (!profileData) {
    handleAlert('Profile data not found. Please try again', 'error')
    return
  }

  const {
    name,
    bio = 'No bio added yet',
    credits,
    avatar,
    _count,
  } = profileData

  const listingsCount = _count?.listings ?? 0

  const profileInfo = document.getElementById('profile-info')

  const profileImage = document.getElementById('profile-image')
  const img = document.createElement('img')
  img.src = avatar?.url || '/assets/default-profile-image.jpg'
  img.alt = avatar?.alt || 'Default ReUze avatar image'
  img.classList.add('w-full', 'max-h-[500px]', 'object-cover')
  profileImage.appendChild(img)

  const profileName = document.createElement('h1')
  profileName.id = 'profile-name'
  profileName.classList.add('font-largeFont', 'text-4xl')
  profileName.textContent = name
  profileInfo.appendChild(profileName)

  const linksContainer = document.createElement('div')
  linksContainer.classList.add('flex', 'gap-4', 'pt-5', 'w-full')

  const editProfileLink = document.createElement('a')
  editProfileLink.href = '/profile/update/'
  editProfileLink.classList.add(
    'bg-brand-dark',
    'font-mediumFont',
    'text-white',
    'rounded-3xl',
    'py-2',
    'px-5',
    'text-sm',
    'transition',
    'duration-300',
    'ease-out',
    'hover:scale-105',
  )
  editProfileLink.textContent = 'Edit Profile'

  const purchaseHistoryLink = document.createElement('a')
  purchaseHistoryLink.href = '/profile/purchases/'
  purchaseHistoryLink.classList.add(
    'bg-brand-dark',
    'font-mediumFont',
    'text-white',
    'rounded-3xl',
    'py-2',
    'px-5',
    'text-sm',
    'transition',
    'duration-300',
    'ease-out',
    'hover:scale-105',
  )
  purchaseHistoryLink.textContent = 'Purchase History'

  linksContainer.appendChild(editProfileLink)
  linksContainer.appendChild(purchaseHistoryLink)
  profileInfo.appendChild(linksContainer)

  const bioContainer = document.createElement('div')
  bioContainer.classList.add('mt-2', 'lg:mt-4', 'pt-3')

  const bioLabel = document.createElement('p')
  bioLabel.textContent = 'BIO:'
  bioLabel.classList.add(
    'font-smallFont',
    'font-bold',
    'text-lg',
    'text-brand-dark',
  )

  const bioText = document.createElement('p')
  bioText.textContent = bio?.trim() ? bio : 'No bio added yet'
  bioText.classList.add('font-smallFont', 'font-light')

  bioContainer.appendChild(bioLabel)
  bioContainer.appendChild(bioText)
  profileInfo.appendChild(bioContainer)

  const creditContainer = document.createElement('div')
  creditContainer.classList.add('mt-4')

  const creditLabel = document.createElement('p')
  creditLabel.textContent = 'CREDIT:'
  creditLabel.classList.add(
    'font-smallFont',
    'font-bold',
    'text-lg',
    'text-brand-dark',
  )

  const creditText = document.createElement('p')
  creditText.textContent = credits
  creditText.classList.add('font-smallFont', 'font-light')

  creditContainer.appendChild(creditLabel)
  creditContainer.appendChild(creditText)
  profileInfo.appendChild(creditContainer)

  const listingsContainer = document.createElement('div')
  listingsContainer.classList.add('mt-4')

  const listingsLabel = document.createElement('p')
  listingsLabel.textContent = 'LISTINGS:'
  listingsLabel.classList.add(
    'font-smallFont',
    'font-bold',
    'text-lg',
    'text-brand-dark',
  )

  const listingsText = document.createElement('p')
  listingsText.textContent = listingsCount
  listingsText.classList.add('font-smallFont', 'font-light')

  listingsContainer.append(listingsLabel, listingsText)
  profileInfo.appendChild(listingsContainer)

  displayProfileListings(username)
  profileContainer.classList.remove('hidden')
  hideSkeletonLoader()
}

displayProfile()
