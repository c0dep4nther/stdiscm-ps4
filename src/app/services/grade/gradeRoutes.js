import express from 'express';
import {uploadGrade, getGradesByStudent, getAllGrades} from './gradeController.js';

const router = express.Router();

router.post('/', uploadGrade);
router.get('/getAll', getAllGrades);
router.get('/:studentId', getGradesByStudent);


export default router;
