"use client";
import "./courses.css";
import { useEffect, useState } from "react";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState({});

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then(setCourses);
  }, []);

  const handleToggleEnroll = (id) => {
    const isCurrentlyEnrolled = enrolled[id];
    const endpoint = isCurrentlyEnrolled ? "/api/unenroll" : "/api/enroll";

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId: id }),
    }).then(() => setEnrolled((prev) => ({ ...prev, [id]: !isCurrentlyEnrolled })));
  };

  return (
    <main className="login-main">
      <div className="login-form">
        <h2 className="login-title">Available Courses</h2>
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <h3 className="course-name">{course.title} ({course.courseCode})</h3>
            <p className="course-description">{course.description}</p>
            <p><strong>Instructor:</strong> {course.instructor}</p>
            <p><strong>Schedule:</strong> {course.schedule.day} from {course.schedule.timeStart} to {course.schedule.timeEnd}</p>
            <p><strong>Capacity:</strong> {course.capacity} students</p>
            <p><strong>Enrolled:</strong> {course.enrolledStudents.length}/{course.capacity}</p>
            <button
              onClick={() => handleToggleEnroll(course._id)}
              className="login-button mt-2"
              style={{ backgroundColor: enrolled[course._id] ? '#dc2626' : '#4CAF50' }}
            >
              {enrolled[course._id] ? "Unenroll" : "Enroll"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}