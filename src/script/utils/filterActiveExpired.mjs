/**
 * Sets up an event listener for the status filter dropdown and triggers a callback function when the selection changes.
 *
 * This function listens for changes to a status filter element (select dropdown with id `status-filter`) on the page.
 * When the user selects a different option, the provided callback function is called with the selected status value.
 * The status can be one of the following:
 * - "all" - No filter, shows all statuses.
 * - "active" - Filters for active statuses.
 * - "expired" - Filters for expired statuses.
 *
 * @param {Function} callback - A function to be called when the status filter selection changes.
 * The callback will receive the selected status value as its argument, which will be one of "all", "active", or "expired".
 *
 * @example
 * // Example usage:
 * setupStatusFilter((selectedStatus) => {
 *   if (selectedStatus === 'active') {
 *     // Show active items
 *   } else if (selectedStatus === 'expired') {
 *     // Show expired items
 *   } else {
 *     // Show all items
 *   }
 * });
 *
 * @returns {void} - This function does not return a value, it sets up an event listener.
 */

export function setupStatusFilter(callback) {
  const statusFilter = document.getElementById('status-filter')
  if (!statusFilter) return

  statusFilter.addEventListener('change', (event) => {
    const selectedStatus = event.target.value
    callback(selectedStatus)
  })
}
