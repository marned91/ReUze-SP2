const categories = ['sport', 'fashion', 'interior', 'art', 'decor', 'vintage']
console.log('publicCategories is loaded')

categories.forEach((category) => {
  const categoriesElement = document.getElementById(`${category}-category`)
  if (categoriesElement) {
    categoriesElement.addEventListener('click', () => {
      window.location.href = `/listings/index.html?tag=${category}`
    })
  }
})
