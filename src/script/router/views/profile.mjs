import { authGuard } from '../../utils/authGuard.mjs'
import { doFetch } from '../../api/doFetch.mjs'
import { API_AUCTION_PROFILE } from '../../api/constants.mjs'
import { displayProfileListings } from '../../utils/listingsPerProfile.mjs'

authGuard()

async function displayProfile() {
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const username = userInfo?.name

  try {
    const profileData = await doFetch(`${API_AUCTION_PROFILE}/${username}`)

    const {
      name,
      bio = bio ? bio : 'No bio added yet',
      credits,
      avatar,
      _count,
    } = profileData

    const listingsCount = _count?.listings ?? 0

    const profileInfo = document.getElementById('profile-info')

    // Profile image
    const profileImage = document.getElementById('profile-image')
    const img = document.createElement('img')
    img.src = avatar?.url || '/assets/default-profile-image.jpg'
    img.alt = avatar?.alt || 'Default ReUze avatar image'
    img.classList.add('w-full', 'max-h-[700px]', 'object-cover')
    profileImage.appendChild(img)

    // Profile name (H1)
    const profileName = document.createElement('h1')
    profileName.id = 'profile-name'
    profileName.classList.add('font-largeFont', 'text-4xl', 'pl-1')
    profileName.textContent = name
    profileInfo.appendChild(profileName)

    // Buttons (Edit Profile & Purchase History)
    const linksContainer = document.createElement('div')
    linksContainer.classList.add('flex', 'gap-4', 'pt-5')

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

    // Profile BIO
    const bioContainer = document.createElement('div')
    bioContainer.classList.add('mt-4', 'pt-5', 'pl-1')

    const bioLabel = document.createElement('p')
    bioLabel.textContent = 'BIO:'
    bioLabel.classList.add(
      'font-smallFont',
      'font-bold',
      'text-lg',
      'text-brand-dark',
      'w-[50%]',
    )

    const bioText = document.createElement('p')
    bioText.textContent = bio?.trim() ? bio : 'No bio added yet'
    bioText.classList.add('font-smallFont', 'font-light')

    bioContainer.appendChild(bioLabel)
    bioContainer.appendChild(bioText)
    profileInfo.appendChild(bioContainer)

    // Profile credit
    const creditContainer = document.createElement('div')
    creditContainer.classList.add('mt-4', 'pl-1')

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

    // Profile listings count
    const listingsContainer = document.createElement('div')
    listingsContainer.classList.add('mt-4', 'pl-1')

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
  } catch (error) {
    console.error('Error displaying profile:', error)
  }
}

displayProfile()
