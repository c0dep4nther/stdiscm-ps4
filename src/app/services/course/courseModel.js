import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
    day: {type: String, required: true},        // e.g., "Monday"
    timeStart: {type: String, required: true},  // e.g., "10:00"
    timeEnd: {type: String, required: true}     // e.g., "12:00"
}, {_id: false});

const courseSchema = new mongoose.Schema({
    courseCode: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    description: String,
    credits: {type: Number, required: true},
    instructor: {type: String, required: true},
    schedule: {type: scheduleSchema, required: true},
    capacity: {type: Number, required: true},
    enrolled: {type: Number, default: 0},
    isOpen: {type: Boolean, default: true},
    semester: {type: String, required: true},
    academicYear: {type: String, required: true},
    prerequisites: {type: [String], default: []}
}, {timestamps: true});

export const Course = mongoose.model('Course', courseSchema);
