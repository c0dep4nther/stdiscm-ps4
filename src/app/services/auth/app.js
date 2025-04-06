import express from 'express';
import cors from 'cors';
import authRoutes from './authRoutes.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// 👇 API route
app.use('/api/auth', authRoutes);

// 👇 Default root route (for browser testing)
app.get('/', (req, res) => {
  res.send('✅ Auth Service is up and running!');
});

app.listen(PORT, () => {
  console.log(`✅ Auth Service running at http://localhost:${PORT}`);
});
