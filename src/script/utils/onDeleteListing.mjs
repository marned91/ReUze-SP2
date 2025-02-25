import { handleAlert } from '../global/handleAlerts.mjs'
import { deleteListing } from '../api/listings.mjs'
export async function onDeleteListing(event, listingId) {
  event.preventDefault()

  // Show the modal
  const modal = document.getElementById('delete-modal')
  modal.classList.remove('hidden') // Show the modal

  // Get the cancel button
  const cancelButton = document.getElementById('cancel-btn')
  const confirmButton = document.getElementById('confirm-btn')

  // Add event listener for cancel
  cancelButton.addEventListener('click', () => {
    modal.classList.add('hidden') // Hide the modal
  })

  // Add event listener for confirm
  confirmButton.addEventListener('click', async () => {
    try {
      await deleteListing(listingId) // Call your existing delete function
      handleAlert('Your listing was successfully deleted!', 'success')
      window.location.reload()
    } catch (error) {
      console.error('Error during listing deletion:', error)
      handleAlert(
        'An error occurred while deleting the listing. Please try again.',
        'error',
      )
    } finally {
      modal.classList.add('hidden') // Hide the modal
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

// Trigger the onDeleteListing function when the delete icon is clicked
deleteListingIcon.addEventListener('click', (event) => {
  onDeleteListing(event, id) // Pass the event and listing ID
})
