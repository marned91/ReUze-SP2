export function setupStatusFilter(callback) {
  const statusFilter = document.getElementById('status-filter')
  if (!statusFilter) return

  statusFilter.addEventListener('change', (event) => {
    const selectedStatus = event.target.value
    callback(selectedStatus)
  })
}
