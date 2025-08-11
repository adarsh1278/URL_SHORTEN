import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import apiRoutes from './routes/api';
import redirectRoutes from './routes/redirect';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

connectDB();

const allowedOrigins = [
  process.env.FRONTEND_URL?.replace(/\/$/, ''), // remove trailing slash if any
  process.env.BASE_URL?.replace(/\/$/, ''), 
  'http://localhost:3000'
].filter(Boolean); // remove undefined values

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow server-to-server or direct requests

    const cleanOrigin = origin.replace(/\/$/, '');
    if (allowedOrigins.includes(cleanOrigin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  },
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running'
  });
});

app.use('/api', apiRoutes);
app.use('/', redirectRoutes);

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
