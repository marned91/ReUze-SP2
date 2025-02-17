export function setupCategoryClicks() {
  const categories = ['Sport', 'Fashion', 'Interior', 'Art', 'Decor', 'Vintage']

  categories.forEach((category) => {
    const categoriesElement = document.getElementById(
      `${category.toLowerCase()}-category`,
    )
    if (categoriesElement) {
      categoriesElement.addEventListener('click', () => {
        console.log(`Navigating to: /listings/index.html?tag=${category}`)
        window.location.href = `/listings/index.html?tag=${category}`
      })
    }
  })
}
