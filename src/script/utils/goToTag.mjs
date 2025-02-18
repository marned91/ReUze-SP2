export function setupTagNavigation() {
  document.querySelectorAll('.tag').forEach((tag) => {
    tag.addEventListener('click', () => {
      const tagName = tag.id // Get the id of the clicked tag
      window.location.href = `/listings.html?tag=${tagName}` // Navigate to listings page with the selected tag
    })
  })
}
