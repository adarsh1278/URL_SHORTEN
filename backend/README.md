# URL Shortener Backend

A TypeScript-based Node.js backend for URL shortening service with MongoDB.

## Features

- ✅ Shorten long URLs
- ✅ Redirect to original URLs
- ✅ Click tracking
- ✅ Admin analytics
- ✅ Rate limiting
- ✅ TypeScript support
- ✅ MongoDB integration

## API Endpoints

### POST /api/shorten
Create a shortened URL.

**Request Body:**
```json
{
  "originalUrl": "https://example.com/very/long/url"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "originalUrl": "https://example.com/very/long/url",
    "shortUrl": "http://localhost:5000/abc123",
    "shortCode": "abc123"
  }
}
```

### GET /:shortcode
Redirect to the original URL and increment click count.

### GET /api/analytics
Get analytics data for all URLs (Admin only).

**Response:**
```json
{
  "success": true,
  "data": {
    "urls": [...],
    "totalUrls": 10,
    "totalClicks": 156
  }
}
```

### GET /health
Health check endpoint.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file with:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/url-shortener
   BASE_URL=http://localhost:5000
   FRONTEND_URL=http://localhost:3000
   ```

3. **Start MongoDB:**
   Make sure MongoDB is running on your system.

4. **Run the application:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm run build
   npm start
   ```

## Technologies Used

- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **MongoDB** with **Mongoose**
- **nanoid** for short code generation
- **express-rate-limit** for rate limiting
- **CORS** for cross-origin requests

## Project Structure

```
src/
├── config/
│   └── database.ts          # MongoDB connection
├── controllers/
│   └── urlController.ts     # Request handlers
├── middleware/
│   ├── rateLimiter.ts       # Rate limiting
│   └── errorHandler.ts      # Error handling
├── models/
│   └── Url.ts              # MongoDB schema
├── routes/
│   ├── api.ts              # API routes
│   └── redirect.ts         # Redirect routes
├── types/
│   └── global.ts           # TypeScript types
├── utils/
│   └── helpers.ts          # Utility functions
└── server.ts               # Main application file
```

## Rate Limits

- **URL Shortening:** 10 requests per 15 minutes per IP
- **URL Redirects:** 100 requests per minute per IP
