import { authGuard } from '../../utils/authGuard.mjs'
import { doFetch } from '../../api/doFetch.mjs'
import { API_AUCTION_PROFILE } from '../../api/constants.mjs'

authGuard()

async function displayProfile() {
  try {
    const username = localStorage.getItem('name')

    profileData = await doFetch(`${API_AUCTION_PROFILE}/${username}`)

    const { name, bio, credits, avatar, _count } = profileData.data

    const profileImage = document.getElementById('profile-image')
    img.src =
      avatar && avatar.url ? avatar.url : '/assets/default-profile-image.jpg'
    img.alt = avatar ? avatar.alt : 'Default ReUze avatar image'
    img.classlist.add('w-full, h-auto')
    profileImage.appendChild(img)

    const profileName = document.getElementById('profile-name')
    profileName.textContent = name
    profileName.classList.add('font-largeFont, text-4xl')
    profileName.appendChild()

    const profileBio = document.getElementById('profile-bio')
    profileBio.textContent = bio
    profileBio.classList.classList('font-smallFont')

    const profileCredit = document.getElementById('profile-credit')
    profileCredit.textContent = credits

    const profileListingsCount = document.getElementById(
      'profile-listings-count',
    )
    profileListingsCount.textContent = _count
  } catch (error) {
    console.error('Error displaying profile:', error)
  }
}

displayProfile()
