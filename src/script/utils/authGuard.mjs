import { handleAlert } from '../global/handleAlerts.mjs'
export function authGuard() {
  if (!localStorage.token) {
    handleAlert('You must be logged in to view this page', 'error')
    window.location.href = '/auth/login/'
  }
}
