import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: String,
    description: String,
    slots: Number,
    enrolledStudents: [String]
});

export const Course = mongoose.model('Course', courseSchema);
