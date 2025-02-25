export async function setUpSearch(inputSelector, buttonSelector, resultsPage) {
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
