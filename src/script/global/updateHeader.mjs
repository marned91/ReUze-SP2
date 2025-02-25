export function updateHeader() {
  const mobileProfileElement = document.getElementById('profile-mobile')
  const profileElement = document.getElementById('profile')
  const signupElement = document.getElementById('signup')
  const mobileSignUpElement = document.getElementById('signup-mobile')
  const homeElement = document.getElementById('home')
  const publicHomeElement = document.getElementById('public-home')
  const logoutElement = document.getElementById('logout')
  const loginElement = document.getElementById('login')
  const categoriesElement = document.getElementById('public-categories')

  const loginToken = localStorage.getItem('token')

  if (loginToken) {
    signupElement.classList.add('hidden')
    mobileSignUpElement.classList.add('hidden')
    loginElement.classList.add('hidden')
    publicHomeElement.classList.add('hidden')
    categoriesElement.classList.add('hidden')

    homeElement.classList.remove('hidden')
    profileElement.classList.remove('hidden')
    mobileProfileElement.classList.remove('hidden')
    logoutElement.classList.remove('hidden')
  } else {
    signupElement.classList.remove('hidden')
    mobileSignUpElement.classList.remove('hidden')
    loginElement.classList.remove('hidden')
    publicHomeElement.classList.remove('hidden')
    categoriesElement.classList.remove('hidden')

    homeElement.classList.add('hidden')
    profileElement.classList.add('hidden')
    mobileProfileElement.classList.add('hidden')
    logoutElement.classList.add('hidden')
  }
}
