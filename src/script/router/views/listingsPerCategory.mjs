const urlParams = new URLSearchParams(window.location.search)
const category = urlParams.get('tag')

const listingsHeadline = document.getElementById('listings-headline')
const heading = document.createElement('h1')
heading.textContent = `${category}`
listingsHeadline.appendChild(heading)

fetchListings(category)
