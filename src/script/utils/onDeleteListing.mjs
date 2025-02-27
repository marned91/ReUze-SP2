import { deleteListing } from '../api/listings.mjs'

/**
 * Handles the deletion of a listing.
 * It shows a modal for the user to confirm the deletion and calls the delete API if confirmed.
 *
 * @param {Event} event - The click event triggered by the delete icon.
 * @param {string} listingId - The ID of the listing that is to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the deletion process is complete.
 */

export async function onDeleteListing(event, listingId) {
  event.preventDefault()

  const modal = document.getElementById('delete-modal')
  modal.classList.remove('hidden')

  const cancelButton = document.getElementById('cancel-btn')
  const confirmButton = document.getElementById('confirm-btn')

  cancelButton.addEventListener('click', () => {
    modal.classList.add('hidden')
  })

  confirmButton.addEventListener('click', async () => {
    try {
      await deleteListing(listingId)
    } finally {
      modal.classList.add('hidden')
    }
  })
}

const deleteListingIcon = document.createElement('i')
deleteListingIcon.classList.add(
  'fa-solid',
  'fa-trash',
  'text-brand-dark',
  'cursor-pointer',
  'hover:text-red-700',
  'text-lg',
)
deleteListingIcon.id = 'delete-listing-icon'

deleteListingIcon.addEventListener('click', (event) => {
  onDeleteListing(event, id)
})
