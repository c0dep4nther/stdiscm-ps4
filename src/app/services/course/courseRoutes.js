import express from 'express';
import { getAllCourses, enrollStudent } from './courseController.js';

const router = express.Router();

router.get('/hello', (req, res) => res.send('Hello, World!'));

export default router;
