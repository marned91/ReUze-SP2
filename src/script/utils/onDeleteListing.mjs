import { deleteListing } from '../api/listings.mjs'

export async function onDeleteListing(event, listingId) {
  event.preventDefault()

  // Show the modal
  const modal = document.getElementById('delete-modal')
  modal.classList.remove('hidden') // Show the modal

  // Get the cancel and confirm buttons
  const cancelButton = document.getElementById('cancel-btn')
  const confirmButton = document.getElementById('confirm-btn')

  // Add event listener for cancel
  cancelButton.addEventListener('click', () => {
    modal.classList.add('hidden') // Hide the modal
  })

  // Add event listener for confirm
  confirmButton.addEventListener('click', async () => {
    try {
      await deleteListing(listingId) // Call the delete function
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
