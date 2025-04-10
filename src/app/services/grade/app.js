import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import gradeRoutes from './gradeRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to Grade DB'))
    .catch(err => console.error('MongoDB error:', err));

app.use('/api/grades', gradeRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log(`Grade service running on port ${PORT}`);
});
