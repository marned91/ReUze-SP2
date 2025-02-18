import { authGuard } from '../../utils/authGuard.mjs'
import { createListing } from '../../api/listings.mjs'
import { tagCategories } from '../../utils/tagsHandling.mjs'

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

  try {
    const response = await createListing(listingData)

    if (response) {
      alert('Listing created successfully!')
      window.location.pathname = '/profile/'
    }
  } catch (error) {
    alert('Failed to create listing. Please try again.')
  }
})
