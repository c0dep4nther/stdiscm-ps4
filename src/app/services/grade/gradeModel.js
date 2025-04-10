import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    courseId: { type: String, required: true },
    grade: { type: String, required: true },
    uploadedBy: { type: String, required: true } // faculty ID
}, { timestamps: true });

export const Grade = mongoose.model('Grade', gradeSchema);
