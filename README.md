# ReUze: semester-project2
<img width="1283" alt="Skjermbilde 2025-03-01 kl  15 52 19" src="https://github.com/user-attachments/assets/36ce6873-6543-49c0-8697-140d19bfc474" />

# Purpose
The purpose of this project is to create a responsive, user-friendly and dynamic auction platform where users can buy and sell items through a bidding system. The theme is reuse and second-hand items, making it easier to find affordable, sustainable products. This web application interacts with an existing API, allowing users to list items, place bids, and manage their profiles. It was developed as part of Noroff's Frontend Development course (FED2).

# Description
ReUze is a front-end auction website designed to let users participate in auctions by listing items and placing bids. All users have access to browsing listings and view them in full. The goal is to provide a space for users to list, bid on, and purchase items while promoting sustainability and responsible consumption.
Built using HTML, CSS, and JavaScript, the project integrates with an external API to handle user authentication, item listings, and bidding functionalities.

### Key features include:
- View and Browse Listings: All users can browse and view listings
- User Registration and Login: Registered users can log in to create listings, place bids, and view their credit balance.
- Item Listings: Users can create and manage auction listings, including adding images, descriptions, and setting deadlines.
- Bidding System: Registered users can place bids on items they are interested in.
- Profile Management: Users can update their avatars and view their total credits.
- Category Pages: Listings can be viewed by category (e.g., Sport, Fashion, Vintage).
- Search Functionality: Unregistered users can browse through the listings, but can only view them; bids can only be placed by registered users.

### Learning Outcomes:
Through the development of this project, I have demonstrated the following skills:

- Planning and designing a web application project.
- UI Design and Development: Created an intuitive, responsive user interface using HTML, Javascript, and Tailwind.
- JavaScript Integration: Built dynamic features by integrating with the provided API for managing auction listings, bidding and profiles.
- Version Control and Collaboration: Managed the project through GitHub, ensuring efficient version control.
- Testing the application to ensure reliability and compliance with web standards.
- Deployment: Deployed the final application on Netlify for public access.

### Improvements for Portfolio 2

As part of continuous improvement for *Portfolio 2*, the following enhancements were made:

1. Fixed undefined variables in profileUpdate.mjs by declaring fieldset, button, and originalButtonText within the correct scope to prevent runtime reference errors.
2. Removed unused variable in listingCreate.mjs by eliminating the unused response assignment from the createListing call, improving readability and bundle efficiency.
3. Replaced string concatenation with template literals in listingsPerCategory.mjs for improved readability and maintainability.
4. Handled empty catch block in profilePurchases.mjs by adding a user-facing error message via handleAlert, ensuring proper error handling instead of silent failures.
5. Ensured consistent return values in register.mjs by returning null in the catch block, maintaining predictable and consistent function behavior.

### Client and Target Audience
The fictional client for this project is a digital auction company looking to offer a seamless user experience for both buyers and sellers. The platform caters to registered users for managing listings and placing bids, while unregistered users can explore auction listings.

# Project Technologies
- HTML: Used for structuring the content of the web application.
- CSS (Tailwind): Tailwind was used for styling the UI and responsiveness.
- JavaScript: Implemented dynamic features and integrated with the API for creating and bidding on auction listings.
- Vite: A modern build tool for faster development and deployment.
- PostCSS: Utilized for processing the Tailwind CSS.
- API: Interacted with the auction API to manage user data, listings, and bids.
- GitHub: Version control was handled via GitHub.
- ESLint & Prettier: Ensures code consistency and best practices across the project.
- Netlify: Deployed on Netlify for public access.

# Project Structure:
The site uses a custom JavaScript router function to manage page navigation without the need for a JavaScript framework. This project is built with multiple pages and content that dynamically load based on the user's navigation.
- Homepage: Displays featured categories and search option.
- Authentication: Login/register pages.
- Profile: Users can view and edit their profile details, view listing history, and purchase history.
- Listings: View, filter active/expired and search for available auction items.
- Listing Creation: Registered users can create new auction listings.
- Bidding: Registered users can place bids on items.

### Development Tools
- Figma: Used for wireframing, prototyping and design guide.
- Visual Studio Code as the primary code editor.
- Online Testing Tools: For validating HTML and WCAG compliance. https://validator.w3.org/ and https://wave.webaim.org/

# Getting started
To get the project running on your local machine, follow these steps:

### Clone the repository:
```git clone https://github.com/marned91/ReUze-SP2```

### Install Dependencies:
```npm install```

### Running the Development Server:
Start the development server with Vite:
```npm run dev```

### Build the project for production:
```npm run build```

### Test Build the project for production:
```npm run preview```

# Deployment
The project is hosted on Netlify for live demo purposes. You can view the live version [here](https://reuze.netlify.app/).


# Contributing
As this project is for a course assignment, I am not currently accepting external contributions. However, I welcome any feedback or suggestions for improvement. Feel free to create an issue in the repository if you have any thoughts on how to enhance the project.

Thank you for your understanding!

# Contact
[My Linkedin Page](https://www.linkedin.com/in/marte-n-18aab5101/)

# Sources used in project
- Unsplash for all images. Free/unlicensed images only
- Noroff's API documentation: https://docs.noroff.dev/docs/v2/about
- https://github.com/NoroffFEU/portfolio-1-example/blob/main/README.md
- https://fontawesome.com/icons
- https://fonts.google.com/
- https://logo.com/
- https://flowbite.com/docs/components/navbar/ 
- https://tailwindcss.com/docs 
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort 
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter 	
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator  
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#maxlength
- https://flowbite.com/docs/components/skeleton/#default-skeleton
