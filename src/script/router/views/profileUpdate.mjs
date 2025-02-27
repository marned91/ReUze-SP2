import { authGuard } from '../../utils/authGuard.mjs'
import { fetchProfileData, updateProfileData } from '../../api/profile.mjs'
import { handleAlert } from '../../global/handleAlerts.mjs'

authGuard()

/**
 * Handles the profile update process for the user.
 *
 * This function fetches the current profile data of the user from the server using the `fetchProfileData` function,
 * populates the profile form with existing data, and allows the user to update their bio and profile image. Upon form
 * submission, it sends the updated data to the server and handles both success and error cases, displaying appropriate
 * alerts and updating the page accordingly.
 *
 * @async
 * @returns {void} - This function does not return any value.
 *
 * @example
 * // This will handle the profile update process for the user.
 * handleProfileUpdate();
 */
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

      const fieldset = form.querySelector('fieldset')
      const button = form.querySelector('button')
      const originalButtonText = button.textContent

      fieldset.disabled = true
      button.textContent = 'Updating Profile...'

      try {
        await updateProfileData(username, updatedData) // Corrected function call
        handleAlert('Profile updated successfully!', 'success')
        setTimeout(() => (window.location.pathname = '/profile/'), 2000)
      } catch (updateError) {
        handleAlert('Failed to update profile. Please try again', 'error')
      }
    })
  } catch (error) {
    console.error('Error fetching current profile data:', error)
  } finally {
    fieldset.disabled = false
    button.textContent = originalButtonText
  }
}

const bioInput = document.getElementById('bio')
const charCount = document.getElementById('char-count')

bioInput.addEventListener('input', () => {
  const length = bioInput.value.length
  charCount.textContent = `${length} / 160`
})

handleProfileUpdate()
