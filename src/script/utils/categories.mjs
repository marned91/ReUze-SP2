const categories = ['Sport', 'Fashion', 'Interior', 'Art', 'Decor', 'Vintage']

categories.forEach((category) => {
  const categoriesElement = document.getElementById(`${category}-category`)
  if (categoriesElement) {
    categoriesElement.addEventListener('click', () => {
      window.location.href = `/public/listings/index.html?tag=${category}`
    })
  }
})
