import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './authRoutes.js';

const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/authDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('✅ Auth Service is up and running!');
});

app.listen(PORT, () => {
  console.log(`✅ Auth Service running at http://localhost:${PORT}`);
});
