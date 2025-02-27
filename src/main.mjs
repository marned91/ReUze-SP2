import './css/styles.css'
import { updateHeader } from './script/global/updateHeader.mjs'
import { setupMenuToggle } from './script/global/menuToggle.mjs'
import { setLogoutListener } from './script/global/logout.mjs'
import router from './script/router'
await router(window.location.pathname)

updateHeader()
setupMenuToggle()
setLogoutListener()
