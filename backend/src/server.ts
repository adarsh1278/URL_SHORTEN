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
  process.env.FRONTEND_URL || 'http://localhost:3000',
  process.env.BASE_URL || 'https://url-shorten-1-b8lq.onrender.com',
  'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like direct browser navigation or server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
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
