import { authGuard } from '../../utils/authGuard.mjs'
import { fetchProfileData, updateProfileData } from '../../api/profile.mjs'
import { handleAlert } from '../../global/handleAlerts.mjs'

authGuard()

async function handleProfileUpdate() {
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const username = userInfo?.name

  const profileImageContainer = document.getElementById('profile-image')
  const bioField = document.getElementById('bio')
  const imageUrlField = document.getElementById('image-url')

  try {
    const profile = await fetchProfileData(username)

    bioField.value = profile?.bio || 'No BIO added yet'

    if (profile?.avatar?.url) {
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
        await updateProfileData(username, updatedData) // Corrected function call
        handleAlert('Profile updated successfully!', 'success')
        setTimeout(() => (window.location.pathname = '/profile/'), 2000)
      } catch (updateError) {
        console.error('Error updating profile:', updateError)
        handleAlert('Failed to update profile. Please try again', 'error')
      }
    })
  } catch (error) {
    console.error('Error fetching current profile data:', error)
  }
}

const bioInput = document.getElementById('bio')
const charCount = document.getElementById('char-count')

bioInput.addEventListener('input', () => {
  const length = bioInput.value.length
  charCount.textContent = `${length} / 160`
})

handleProfileUpdate() // Use the renamed function
