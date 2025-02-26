import { authGuard } from '../../utils/authGuard.mjs'
import { createListing } from '../../api/listings.mjs'
import { tagCategories } from '../../utils/tagsHandling.mjs'
import { handleAlert } from '../../global/handleAlerts.mjs'

authGuard()

const form = document.querySelector('#create-listing-form')

form.addEventListener('submit', async (event) => {
  event.preventDefault()

  const title = form.title.value.trim()
  const description = form.description.value.trim()
  const mediaUrl = form.mediaUrl.value.trim()
  const deadline = new Date(form.deadline.value).toISOString()

  const tags = tagCategories ? tagCategories(title, description) : []

  const listingData = {
    title,
    description,
    tags,
    media: mediaUrl ? [{ url: mediaUrl, alt: title }] : [],
    endsAt: deadline,
  }

  console.log('Final Listing Data:', listingData)

  try {
    const response = await createListing(listingData)

    if (response) {
      handleAlert('Listing created successfully!', 'success')
      setTimeout(() => (window.location.pathname = /profile/), 2000)
    }
  } catch (error) {
    handleAlert('Failed to create listing. Please try again.', 'error')
  }
})

const descriptionInput = document.getElementById('description')
const charCount = document.getElementById('char-count')

descriptionInput.addEventListener('input', () => {
  const length = descriptionInput.value.length
  charCount.textContent = `${length} / 280`
})
