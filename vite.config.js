import { resolve } from 'path'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  appType: 'mpa',
  base: '/',
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, 'index.html'), // Home logged-in users
        publicHome: path.resolve(__dirname, 'public/index.html'), // Home non-logged-in users
        publicCategories: path.resolve(
          __dirname,
          'public/categories/index.html',
        ), //Categories for non-logged-in users
        listingsPerCategory: path.resolve(__dirname, 'listings/index.html'), //Listings per category
        login: path.resolve(__dirname, 'auth/login/index.html'), // Login
        register: path.resolve(__dirname, 'auth/register/index.html'), // Register
        profile: path.resolve(__dirname, 'profile/index.html'), // Profile logged-in users
        profileUpdate: path.resolve(__dirname, 'profile/update/index.html'), // Profile update
        profilePurchases: path.resolve(
          __dirname,
          'profile/purchases/index.html',
        ), // Profile purchases
        listingCreate: path.resolve(__dirname, 'listings/create/index.html'), // Create new listing
        listingView: path.resolve(__dirname, 'listings/view/index.html'), // View listing
        listingsSearch: path.resolve(__dirname, 'listings/search/index.html'), //Search results
      },
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
})
