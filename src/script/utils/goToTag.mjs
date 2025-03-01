/**
 * Sets up event listeners for each tag element, allowing navigation to a filtered listings page based on the selected tag.
 *
 * This function listens for clicks on elements with the class `tag` and, upon clicking a tag, redirects the user to a listings page
 * with a query string that contains the selected tag. This allows users to view listings filtered by the chosen tag.
 *
 * The tag's ID is used as the value for the `tag` query parameter in the URL, which will be used to filter listings on the destination page.
 *
 * Supported tags include:
 * - art
 * - fashion
 * - sport
 * - decor
 * - interior
 * - vintage
 * - other
 *
 * // If the user clicks on a tag with id="fashion", the page will navigate to:
 * // "/listings/index.html?tag=fashion"
 *
 * @returns {void} - This function does not return a value, it sets up event listeners on tag elements.
 */
export function setupTagNavigation() {
  document.querySelectorAll('.tag').forEach((tag) => {
    tag.addEventListener('click', () => {
      const selectedTag = tag.id
      window.location.href = `/listings/index.html?tag=${selectedTag}`
    })
  })
}
