export function setupTagNavigation() {
  document.querySelectorAll('.tag').forEach((tag) => {
    tag.addEventListener('click', () => {
      const tagName = tag.id
      window.location.href = `/listings/index.html?tag=${tagName}`
    })
  })
}
