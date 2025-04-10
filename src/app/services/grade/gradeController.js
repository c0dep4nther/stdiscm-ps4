import { Grade } from './gradeModel.js';

export const uploadGrade = async (req, res) => {
    try {
        const { studentId, courseId, grade, uploadedBy } = req.body;
        const newGrade = new Grade({ studentId, courseId, grade, uploadedBy });
        await newGrade.save();
        res.status(201).json({ message: 'Grade uploaded successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to upload grade' });
    }
};

export const getGradesByStudent = async (req, res) => {
    console.log('Fetching grades for student:', req.params.studentId);
    try {
        const { studentId } = req.params;
        const mongoQuery = { studentId: studentId };
        const grades = await Grade.findOne(mongoQuery);
        if (grades) {
            console.log('Grades found:', grades);
        }else {
            console.log('No grades found for student:', studentId);
        }
        res.json(grades);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch grades' });
    }
};

export const getAllGrades = async (req, res) => {
    try {
        const grades = await Grade.find();
        res.json(grades);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch all grades' });
    }
}
