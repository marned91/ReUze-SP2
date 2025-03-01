import './css/styles.css'
import { updateHeader } from './script/global/updateHeader.mjs'
import { setupMenuToggle } from './script/global/menuToggle.mjs'
import { setLogoutListener } from './script/global/logout.mjs'
import router from './script/router'

updateHeader()
setupMenuToggle()
setLogoutListener()
//Only use DOMContentleaded on router to make it work on deployed page. Do not use this anywhere else because of ES6
document.addEventListener('DOMContentLoaded', () => {
  router()
})
