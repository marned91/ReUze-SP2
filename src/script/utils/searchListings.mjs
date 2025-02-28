/**
 * Sets up the search functionality for a search input and button.
 * When the search button is clicked, it redirects the user to the search results page
 * with the search query as a URL parameter.
 *
 * @param {string} inputSelector - The CSS selector for the search input field.
 * @param {string} buttonSelector - The CSS selector for the search button.
 * @param {string} resultsPage - The URL of the search results page.
 * @returns {void}
 */
export async function setUpSearch(inputSelector, buttonSelector) {
  const searchInput = document.querySelector(inputSelector)
  const searchButton = document.querySelector(buttonSelector)

  const handleSearch = () => {
    const query = searchInput.value.trim()
    if (query) {
      window.location.href = `/listings/search/index.html?q=${encodeURIComponent(query)}`
    }
  }
  searchButton.addEventListener('click', handleSearch)
}
