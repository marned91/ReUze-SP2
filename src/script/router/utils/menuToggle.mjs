export function setupMenuToggle() {
  const menuToggle = document.getElementById('menu-toggle')
  const mobileMenu = document.getElementById('mobile-menu')

  if (!menuToggle || !mobileMenu) return

  // Toggle menu visibility
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden')
  })

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (
      !mobileMenu.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      mobileMenu.classList.add('hidden')
    }
  })
}
