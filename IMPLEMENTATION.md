# Airbnb Homepage Implementation

This project implements a pixel-perfect recreation of the Airbnb homepage based on the Figma design using Next.js 16, React 19, and Tailwind CSS v4.

## 🎨 Design Source
Figma Design: https://www.figma.com/design/cdGkB9mdpLbhhrXaSdARnv/Airbnb---Home--Search--and-Listing-Pages--Community-?node-id=1-2126

## 📦 Components Created

### `/src/components/AirbnbNav.tsx`
- Navigation bar with Airbnb logo (SVG)
- Page menu: Places to stay, Experiences, Online Experiences
- User profile section with globe icon and menu
- Fully responsive with white-on-black styling

### `/src/components/AirbnbSearch.tsx`
- Search bar with 4 input sections:
  - Location input
  - Check-in date
  - Check-out date
  - Guests input
- Red search button with search icon
- Vertical dividers between sections

### `/src/components/CityCard.tsx`
- Reusable component for city destination cards
- Props: `imageSrc`, `cityName`, `distance`, `bgColor`
- Image section with Next.js Image optimization
- Colored content section with city name and distance

### `/src/components/AirbnbFooter.tsx`
- Four-column footer layout:
  - Support links
  - Community links
  - Hosting links
  - About links
- Sub-footer with:
  - Copyright and legal links
  - Language and currency selectors
  - Social media icons (Facebook, Twitter, Instagram)

## 🏠 Main Page Structure

The homepage (`/src/app/page.tsx`) includes:

1. **Hero Section (Black background)**
   - Navigation bar
   - Search component
   - Hero image card with "Not sure where to go? Perfect." message
   - "I'm flexible" button with gradient text

2. **Main Content Section (White background)**
   - "Inspiration for your next trip" - 4 city cards
   - "Discover Airbnb Experiences" - 2 large experience cards
   - "Shop Airbnb gift cards" section
   - "Questions about hosting?" hero card
   - "Inspiration for future getaways" - tabbed destination grid

3. **Footer Section (Gray background)**
   - Complete footer with all links and information

## 🎨 Styling

- **Font**: Inter (Google Fonts)
- **Primary Colors**:
  - Black: `#000000`
  - White: `#FFFFFF`
  - Airbnb Red: `#de3151`
  - Gray shades: 50, 100, 200, 500, 600, 700

- **Typography**:
  - Headers: Medium weight (500)
  - Body: Regular weight (400)
  - Buttons: Medium weight (500)

## 🚀 Running the Project

```bash
# Install dependencies
pnpm install

# Run development server on port 3009
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

The site will be available at: http://localhost:3009

## 📁 File Structure

```
src/
├── app/
│   ├── globals.css          # Global styles with Tailwind v4
│   ├── layout.tsx            # Root layout with Inter font
│   └── page.tsx              # Homepage component
└── components/
    ├── AirbnbNav.tsx         # Navigation component
    ├── AirbnbSearch.tsx      # Search bar component
    ├── AirbnbFooter.tsx      # Footer component
    └── CityCard.tsx          # City card component
```

## ✨ Features

- ✅ Pixel-perfect design implementation from Figma
- ✅ Fully responsive layout
- ✅ Next.js 16 with App Router
- ✅ React 19 components
- ✅ Tailwind CSS v4
- ✅ TypeScript for type safety
- ✅ Next.js Image optimization
- ✅ SVG icons for crisp graphics
- ✅ Semantic HTML structure
- ✅ Accessibility considerations

## 🎯 Design Fidelity

This implementation uses the Figma MCP server to extract exact:
- Colors and gradients
- Typography (font families, sizes, weights, line heights)
- Spacing and layout
- Component structure
- Asset URLs

All design tokens are preserved from the original Figma file to ensure pixel-perfect accuracy.
