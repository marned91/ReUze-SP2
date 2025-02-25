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
