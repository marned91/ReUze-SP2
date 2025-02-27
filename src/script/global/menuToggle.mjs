/**
 * Sets up the functionality to toggle the mobile menu visibility.
 *
 * This function adds a click event listener to the element with the ID `menu-toggle`
 * to toggle the visibility of the mobile menu (with the ID `mobile-menu`) by adding or removing the `hidden` class.
 * Additionally, it sets up an event listener on the document to close the mobile menu if the user clicks outside of it.
 *
 * @returns {void}
 *
 * @example
 * setupMenuToggle();
 * // Sets up the mobile menu toggle functionality.
 */
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
