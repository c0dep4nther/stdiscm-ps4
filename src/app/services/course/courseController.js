import { Course } from './courseModel.js';

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
};

export const enrollStudent = async (req, res) => {
    const { courseId } = req.params;
    const { studentId } = req.body;

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ error: 'Course not found' });

        if (course.enrolledStudents.includes(studentId)) {
            return res.status(400).json({ error: 'Already enrolled' });
        }

        course.enrolledStudents.push(studentId);
        await course.save();

        res.json({ message: 'Enrolled successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Enrollment failed' });
    }
};
