import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import courseRoutes from './courseRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
console.log("mongo uri", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to Course DB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/courses', courseRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Course service running on port ${PORT}. Full link: http://localhost:${PORT}/api/courses`);

});
