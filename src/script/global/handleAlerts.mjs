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
 * @example
 * handleAlert("Item deleted successfully!", "success", () => { console.log("Alert closed."); }, 2000);
 * // Displays a success alert for 2 seconds, and then logs "Alert closed."
 */
export function handleAlert(
  message,
  type = 'info',
  functionToCall = null,
  timeout = 1000,
) {
  const alertClasses = {
    info: 'bg-[#E0EFF5] border-[#CCE1EA] text-black shadow-xl',
    success: 'bg-[#A5D5E7] border-[#B7DBE9] text-accent-dark shadow-xl',
    error: 'bg-[#7A8080] border-[#989F9F] text-white shadow-xl',
  }

  const alertDiv = document.createElement('div')
  alertDiv.className = `w-full max-w-md mx-auto p-4 border rounded-lg shadow-md ${alertClasses[type]}`
  alertDiv.textContent = message

  const alertContainer = document.getElementById('alert-container')
  alertContainer.appendChild(alertDiv)

  setTimeout(() => {
    alertDiv.remove()
    if (functionToCall) functionToCall()
  }, timeout)
}
