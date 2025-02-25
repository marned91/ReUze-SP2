export function handleAlert(
  message,
  type = 'info',
  functionToCall = null,
  timeout = 1000,
) {
  const alertClasses = {
    info: 'bg-[#DEE5E8] border-[#437081] text-[#437081]',
    success: 'bg-[#DB764F] border-[#196E8E] text-[#383939]',
    error: 'bg-[#7A8080] border-[#196E8E] text-[#383939]',
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
