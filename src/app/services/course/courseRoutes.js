import express from 'express';
import { getAllCourses, enrollStudent } from './courseController.js';

const router = express.Router();

router.get('/', getAllCourses);
router.post('/enroll', enrollStudent);
export default router;
