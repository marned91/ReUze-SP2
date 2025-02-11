import './css/styles.css'
import { updateHeader } from './script/utils/updateHeader.mjs'
import { setupMenuToggle } from './script/utils/menuToggle.mjs'
import router from './script/router'
await router(window.location.pathname)

updateHeader()
setupMenuToggle()
