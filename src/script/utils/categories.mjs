const categories = ['sport', 'fashion', 'interior', 'art', 'decor', 'vintage']

categories.forEach((category) => {
  const categoriesElement = document.getElementById(`${category}-category`)
  if (categoriesElement) {
    categoriesElement.addEventListener('click', () => {
      window.location.href = `/public/listings/index.html?tag=${category}`
    })
  }
})
