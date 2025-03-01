/**
 * Displays an alert message with a specified type and optional callback.
 *
 * This function creates an alert box with the provided message and displays it on the screen.
 * The alert box will automatically disappear after a specified timeout. Optionally, a callback function can be executed after the alert is removed.
 *
 * @param {string} message - The message to display in the alert box.
 * @param {('info'|'success'|'error')} [type='info'] - The type of alert, determining its style.
 *   Possible values are 'info', 'success', and 'error'. Default is 'info'.
 * @param {Function|null} [functionToCall=null] - An optional callback function to be called after the alert disappears.
 * @param {number} [timeout=1000] - The time in milliseconds after which the alert will be removed. Default is 1000ms (1 second).
 * @returns {void}
 *
 */
export function handleAlert(
  message,
  type = 'info',
  functionToCall = null,
  timeout = 2000,
) {
  const alertHeadlines = {
    info: '',
    success: 'Success!',
    error: 'Something went wrong...',
  }

  const alertClasses = {
    info: 'bg-[#E0EFF5] border-[#CCE1EA] text-black shadow-xl text-lg',
    success: 'bg-[#A5D5E7] border-[#B7DBE9] text-brand-dark shadow-xl text-lg',
    error: 'bg-[#7A8080] border-[#989F9F] text-white shadow-xl text-lg',
  }

  const alertDiv = document.createElement('div')
  alertDiv.className = `w-full max-w-md mx-auto p-4 border rounded-lg shadow-md ${alertClasses[type]}`

  if (alertHeadlines[type]) {
    const headlineDiv = document.createElement('strong')
    headlineDiv.textContent = alertHeadlines[type]
    alertDiv.appendChild(headlineDiv)
    alertDiv.appendChild(document.createElement('br'))
  }

  const messageDiv = document.createElement('span')
  messageDiv.textContent = message
  alertDiv.appendChild(messageDiv)

  const alertContainer = document.getElementById('alert-container')
  alertContainer.appendChild(alertDiv)

  setTimeout(() => {
    alertDiv.remove()
    if (functionToCall) functionToCall()
  }, timeout)
}
