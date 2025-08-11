# URL Shortener Frontend

A modern, responsive frontend for the URL shortener application built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- ✅ **URL Shortening Form**: Clean, intuitive interface for shortening URLs
- ✅ **Real-time Feedback**: Toast notifications for user actions
- ✅ **Admin Dashboard**: Analytics and management interface
- ✅ **Responsive Design**: Works perfectly on all devices
- ✅ **Type Safety**: Full TypeScript implementation
- ✅ **Copy to Clipboard**: Easy copying of shortened URLs
- ✅ **External Link Icons**: Clear visual indicators for outbound links

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **react-hot-toast** - Beautiful toast notifications

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Home: http://localhost:3000
   - Admin: http://localhost:3000/admin

## Project Structure

```
src/
├── app/
│   ├── admin/
│   │   └── page.tsx          # Admin dashboard page
│   ├── layout.tsx            # Root layout with header and toast
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles and Tailwind imports
├── components/
│   ├── UrlShortener.tsx      # Main URL shortening component
│   ├── Analytics.tsx         # Analytics dashboard component
│   └── Header.tsx            # Navigation header
├── lib/
│   ├── api.ts                # API service with axios
│   └── utils.ts              # Utility functions
└── types/
    └── index.ts              # TypeScript type definitions
```

## Components

### UrlShortener
The main component for shortening URLs with features:
- URL validation
- Loading states
- Success/error handling
- Copy to clipboard functionality

### Analytics
Admin dashboard component featuring:
- Summary statistics
- URL listing table
- Click tracking display
- Action buttons for each URL

### Header
Navigation component with:
- Responsive design
- Active route highlighting
- Clean, modern styling

## API Integration

The frontend communicates with the backend through:
- **POST /api/shorten** - Create shortened URLs
- **GET /api/analytics** - Fetch analytics data
- **GET /health** - Health check

## Styling

- **Tailwind CSS** for utility-first styling
- **Custom animations** for loading states
- **Responsive breakpoints** for mobile compatibility
- **Accessible color schemes** for better UX

## Development Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_APP_URL` - Frontend application URL

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
