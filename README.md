# Airbnb Clone Frontend

A modern, responsive frontend for an Airbnb clone built with **Next.js 16**, **React 19**, and **Tailwind CSS**. This project focuses on high performance, SEO optimization, and a seamless user experience.

## Key Features

- **Dynamic Listings**: Browse and search for properties with real-time filtering.
- **Booking System**: Intuitive interface for selecting dates and managing reservations.
- **User Authentication**: Secure login and registration flows integrated with the backend API.
- **Admin Dashboard**: Comprehensive management tools for properties, users, and roles.
- **Rich Text Editing**: Integrated **Tiptap** editor for detailed property descriptions.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views using **Tailwind CSS**.

## Tech Stack & Packages

### Core Frameworks
- **Next.js 16 (App Router)**: Utilizing the latest features like Server Components, Suspense, and optimized routing.
- **React 19**: Leveraging the newest React features for efficient UI rendering.
- **TypeScript**: Ensuring type safety across the entire component tree.

### UI & Styling
- **Tailwind CSS**: A utility-first CSS framework for rapid and consistent styling.
- **Headless UI**: Unstyled, fully accessible UI components.
- **Lucide React & Heroicons**: Beautiful, consistent icon sets.
- **Class-variance-authority (CVA)**: For managing complex component variants.

### State & Data Management
- **Axios**: For handling asynchronous API requests to the backend.
- **Cookies-next**: Efficient client-side and server-side cookie management for authentication.

### Content Editing
- **Tiptap**: A headless rich-text editor framework for a customized editing experience.

### Testing
- **Vitest & React Testing Library**: For robust unit and integration testing.

## Installation & Setup

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   pnpm install
   ```
3. **Environment Variables**: Create a `.env.local` file and set `NEXT_PUBLIC_API_URL` to your backend endpoint.
4. **Run Development Server**:
   ```bash
   pnpm run dev
   ```

## Related Repositories

- **Backend**: [https://github.com/maruf-67/airbnb](https://github.com/maruf-67/airbnb)
