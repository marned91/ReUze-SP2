/**
 * Show the skeleton loader by removing the 'hidden' class.
 * This makes the skeleton loader visible on the page.
 */
export function showSkeletonLoader() {
  const skeletonLoader = document.getElementById('skeleton-loader')
  const skeletonLoaderExtra = document.getElementById('skeleton-loader-extra')
  if (skeletonLoader || skeletonLoaderExtra) {
    skeletonLoader.classList.remove('hidden')
  }
}

/**
 * Hide the skeleton loader by adding the 'hidden' class.
 * This makes the skeleton loader disappear from the page.
 */
export function hideSkeletonLoader() {
  const skeletonLoader = document.getElementById('skeleton-loader')
  const skeletonLoaderExtra = document.getElementById('skeleton-loader-extra')
  if (skeletonLoader || skeletonLoaderExtra) {
    skeletonLoader.classList.add('hidden')
  }
}
