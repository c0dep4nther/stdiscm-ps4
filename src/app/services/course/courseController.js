import {Course, getCourseByCode} from './courseModel.js';

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
};

export const enrollStudent = async (req, res) => {
    const { courseId, studentId } = req.body;
    console.log("enrollStudent", courseId, studentId);

    try {
        console.log("enrollStudent", courseId, studentId);
        const course = await getCourseByCode(courseId);
        console.log("course", course);
        if (!course) return res.status(404).json({ error: 'Course not found' });

        if (course.enrolledStudents.includes(studentId)) {
            return res.status(400).json({ error: 'Already enrolled' });
        }
        if (course.enrolledStudents.length >= course.capacity) {
            return res.status(400).json({ error: 'Course is full' });
        }
        if (!course.isOpen) {
            return res.status(400).json({ error: 'Course is closed for enrollment' });
        }



        course.enrolledStudents.push(studentId);
        course.enrolled += 1;

        await course.save();

        res.json({ message: 'Enrolled successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Enrollment failed' });
    }
};

