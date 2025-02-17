import { authGuard } from '../../utils/authGuard.mjs'
import { API_AUCTION, API_KEY } from '../../api/constants.mjs'

authGuard()

async function onCreateListing(event) {
  event.preventDefault()

  const { title, description, mediaUrl, deadline, category } =
    event.target.elements

  const media = [{ url: mediaUrl.value, alt: title.value }]
  const endsAt = new Date(deadline.value).toISOString()
  const tags = [category.value]

  const listingData = {
    title: title.value,
    description: description.value,
    media,
    endsAt,
    tags,
  }

  try {
    const newListing = await createListing(listingData)
    alert('Success! Your listing has been created.')
    event.target.reset()
    setTimeout(() => (window.location.pathname = '/profile/'), 2000)
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
    throw new error(errorResponse.message || 'Failed to create listing.')
  } catch (error) {
    console.error('Error creating listing:', error)
    throw error
  }
}
