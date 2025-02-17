import { authGuard } from '../../utils/authGuard.mjs'
import { API_AUCTION_PROFILE } from '../../api/constants.mjs'
import { doFetch } from '../../api/doFetch.mjs'

authGuard()

async function updateProfile() {
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const username = userInfo?.name

  const profileImageContainer = document.getElementById('profile-image')
  const bioField = document.getElementById('bio')
  const imageUrlField = document.getElementById('image-url')

  try {
    const profile = await doFetch(`${API_AUCTION_PROFILE}/${username}`)

    bioField.value = profile.bio || 'No BIO added yet'

    if (profile.avatar?.url) {
      const profileImage = document.createElement('img')
      profileImage.src = profile.avatar.url
      profileImage.alt = profile.avatar.alt || 'Profile Image'
      profileImage.classList.add('w-full', 'max-h-[500px]', 'object-cover')
      profileImageContainer.appendChild(profileImage)

      imageUrlField.value = profile.avatar.url
    }

    const form = document.getElementById('profile-edit-form')
    form.addEventListener('submit', async (event) => {
      event.preventDefault()

      const updatedData = {
        bio: bioField.value,
        avatar: {
          url: imageUrlField.value,
          alt: 'Profile Image',
        },
      }

      try {
        const updatedProfile = await doFetch(
          `${API_AUCTION_PROFILE}/${username}`,
          {
            method: 'PUT',
            body: JSON.stringify(updatedData),
          },
        )
        alert('Profile updated successfully!')
        setTimeout(() => (window.location.pathname = '/profile/'), 2000)
      } catch (updateError) {
        console.error('Error updating profile:', updateError)
        alert('Failed to update profile.')
      }
    })
  } catch (error) {
    console.error('Error fetching current profile data:', error)
  }
}

updateProfile()
