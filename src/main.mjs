import './css/styles.css'
import { updateHeader } from './script/global/updateHeader.mjs'
import { setupMenuToggle } from './script/global/menuToggle.mjs'
import { setLogoutListener } from './script/global/logout.mjs'
import router from './script/router'

console.log('main.mjs is loading - hello')

updateHeader()
setupMenuToggle()
setLogoutListener()
document.addEventListener('DOMContentLoaded', () => {
  router()
})
