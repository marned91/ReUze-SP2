import { authGuard } from '../../utils/authGuard.mjs'
import { API_AUCTION, API_KEY } from '../../api/constants.mjs'
import { tagCategories } from '../../utils/tagsHandling.mjs'

authGuard()

async function onCreateListing(event) {
  event.preventDefault()

  const { title, description, mediaUrl, deadline } = event.target.elements

  const deadlineValue = deadline.value.trim()
  const endsAt = deadlineValue ? new Date(deadlineValue).toISOString() : null

  const mediaUrlValue = mediaUrl.value.trim()
  const media = mediaUrlValue
    ? [{ url: mediaUrlValue, alt: title.value.trim() || 'Listing image' }]
    : []

  const tags = tagCategories(title.value, description.value) || []

  const listingData = {
    title: title.value.trim(),
    description: description.value.trim(),
    media,
    endsAt,
    tags,
  }

  try {
    const response = await createListing(listingData)
    alert('Success! Your listing has been created.')
    setTimeout(() => (window.location.pathname = '/profile/'), 2000)
    return response
  } catch (error) {
    console.error('Error:', error)
    alert(`Failed to create listing. Error: ${error.message}`)
  }
}

const form = document.getElementById('create-listing-form')

form.addEventListener('submit', async function (event) {
  const fieldset = form.querySelector('fieldset')
  const button = form.querySelector('button')
  const originalButtonText = button.textContent

  fieldset.disabled = true
  button.textContent = 'Creating new listing...'

  try {
    await onCreateListing(event)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    fieldset.disabled = false
    button.textContent = originalButtonText
  }
})

async function createListing({ title, description, media, endsAt, tags }) {
  const token = localStorage.getItem('token')

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'X-Noroff-API-Key': API_KEY,
  }

  try {
    const response = await fetch(API_AUCTION, {
      method: 'POST',
      headers,
      body: JSON.stringify({ title, description, media, endsAt, tags }),
    })

    if (response.ok) {
      const { data } = await response.json()
      return data
    }
    const errorResponse = await response.json()
    throw new Error(errorResponse.message || 'Failed to create listing.')
  } catch (error) {
    console.error('Error creating listing:', error)
    throw error
  }
}
