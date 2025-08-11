# URL Shortener - MERN Stack with TypeScript

A full-stack URL shortening application built with the MERN stack (MongoDB, Express.js, React, Node.js) and TypeScript. This application allows users to shorten long URLs and provides an admin dashboard to track analytics.

## 🚀 Features

### Core Features
- ✅ **URL Shortening**: Convert long URLs into short, manageable links
- ✅ **URL Redirection**: Seamless redirection from short URLs to original URLs
- ✅ **Click Tracking**: Monitor how many times each shortened URL has been accessed
- ✅ **Analytics Dashboard**: Admin-only page to view all URLs and their statistics

### Technical Features
- ✅ **TypeScript**: Full type safety across frontend and backend
- ✅ **Rate Limiting**: Prevents abuse with request rate limiting
- ✅ **Input Validation**: URL validation and sanitization
- ✅ **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- ✅ **Error Handling**: Comprehensive error handling with user-friendly messages
- ✅ **Toast Notifications**: Real-time feedback for user actions

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **MongoDB** with **Mongoose** ODM
- **nanoid** for generating short codes
- **express-rate-limit** for rate limiting
- **CORS** for cross-origin requests
- **dotenv** for environment variables

### Frontend
- **Next.js 15** (React framework)
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Axios** for API calls
- **react-hot-toast** for notifications

## 📁 Project Structure

```
url-shortener/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts          # MongoDB connection
│   │   ├── controllers/
│   │   │   └── urlController.ts     # Request handlers
│   │   ├── middleware/
│   │   │   ├── rateLimiter.ts       # Rate limiting
│   │   │   └── errorHandler.ts      # Error handling
│   │   ├── models/
│   │   │   └── Url.ts              # MongoDB schema
│   │   ├── routes/
│   │   │   ├── api.ts              # API routes
│   │   │   └── redirect.ts         # Redirect routes
│   │   ├── types/
│   │   │   └── global.ts           # TypeScript types
│   │   ├── utils/
│   │   │   └── helpers.ts          # Utility functions
│   │   └── server.ts               # Main application file
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── admin/
│   │   │   │   └── page.tsx        # Admin dashboard
│   │   │   ├── layout.tsx          # Root layout
│   │   │   ├── page.tsx            # Home page
│   │   │   └── globals.css         # Global styles
│   │   ├── components/
│   │   │   ├── UrlShortener.tsx    # Main URL shortener
│   │   │   ├── Analytics.tsx       # Analytics dashboard
│   │   │   └── Header.tsx          # Navigation header
│   │   ├── lib/
│   │   │   ├── api.ts              # API service
│   │   │   └── utils.ts            # Utility functions
│   │   └── types/
│   │       └── index.ts            # TypeScript types
│   ├── package.json
│   ├── next.config.ts
│   └── .env.local
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### 1. Clone the repository
```bash
git clone <repository-url>
cd url-shortener
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB connection string and other configurations

# Start the backend server
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env.local file
# Add NEXT_PUBLIC_API_URL=http://localhost:5000

# Start the frontend server
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Dashboard**: http://localhost:3000/admin

## 📡 API Endpoints

### POST /api/shorten
Create a shortened URL.

**Request:**
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
Get analytics data for all URLs (Admin endpoint).

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

## 🔧 Configuration

### Backend Environment Variables
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/url-shortener
BASE_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🔒 Security Features

- **Rate Limiting**: 
  - URL shortening: 10 requests per 15 minutes per IP
  - URL redirects: 100 requests per minute per IP
- **Input Validation**: URL format validation and sanitization
- **CORS**: Configured for secure cross-origin requests
- **Error Handling**: Secure error messages without exposing sensitive information

## 🧪 Testing

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

## 📦 Building for Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

## 🚀 Deployment

### Backend Deployment (Example with Heroku)
1. Create a new Heroku app
2. Set environment variables in Heroku dashboard
3. Connect to MongoDB Atlas
4. Deploy from GitHub or using Heroku CLI

### Frontend Deployment (Example with Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created as part of a coding challenge to demonstrate full-stack development skills with the MERN stack and TypeScript.

## 🐛 Known Issues

- None currently reported

## 🔮 Future Enhancements

- [ ] User authentication and user-specific URLs
- [ ] Custom short codes
- [ ] Bulk URL shortening
- [ ] QR code generation
- [ ] Link expiration dates
- [ ] Detailed analytics with charts
- [ ] API rate limiting per user

## 📞 Support

If you have any questions or need help with setup, please create an issue in the GitHub repository.
