import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  appType: 'mpa',
  base: '',
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'), // Home logged-in users
        publicHome: resolve(__dirname, 'public/index.html'), // Home non-logged-in users
        listingsPerCategoryNonLoggedIn: resolve(
          __dirname,
          'public/listings/index.html',
        ), // Listings per category for non-logged-in users
        listingsPerCategoryLoggedIn: resolve(__dirname, 'listings/index.html'), // Listings per category for logged-in users
        login: resolve(__dirname, 'auth/login/index.html'), // Login
        register: resolve(__dirname, 'auth/register/index.html'), // Register
        profile: resolve(__dirname, 'profile/index.html'), // Profile logged-in users
        profileUpdate: resolve(__dirname, 'profile/update/index.html'), // Profile update
        listingCreate: resolve(__dirname, 'listings/create/index.html'), // Create new listing
        listingView: resolve(__dirname, 'listings/single/index.html'), // View listing
      },
    },
  },
})
