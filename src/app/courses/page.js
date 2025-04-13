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
    }).then(() => {
      // Update enrolled status
      setEnrolled((prev) => ({ ...prev, [id]: !isCurrentlyEnrolled }));

      // Update course enrollment count
      setCourses((prevCourses) =>
        prevCourses.map((course) => {
          if (course._id === id) {
            return {
              ...course,
              enrolled: isCurrentlyEnrolled
                ? course.enrolled - 1 // Decrement if unenrolling
                : course.enrolled + 1, // Increment if enrolling
            };
          }
          return course;
        })
      );
    });
  };

  return (
    <main className="login-main">
      <div className="login-form">
        <h2 className="login-title">Available Courses</h2>
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <h3 className="course-name">
              {course.title} ({course.courseCode})
            </h3>
            <p className="course-description">{course.description}</p>
            <p>
              <strong>Instructor:</strong> {course.instructor}
            </p>
            <p>
              <strong>Schedule:</strong> {course.schedule.day} from{" "}
              {course.schedule.timeStart} to {course.schedule.timeEnd}
            </p>
            <p>
              <strong>Capacity:</strong> {course.capacity} students
            </p>
            <p>
              <strong>Enrolled:</strong> {course.enrolled}/{course.capacity}
            </p>
            <button
              onClick={() => handleToggleEnroll(course._id)}
              className="login-button mt-2"
              disabled={
                course.enrolled >= course.capacity && !enrolled[course._id]
              }
              style={{
                backgroundColor: enrolled[course._id]
                  ? "#dc2626"
                  : course.enrolled >= course.capacity && !enrolled[course._id]
                  ? "#a0a0a0" // Gray color when disabled
                  : "#4CAF50",
              }}
            >
              {enrolled[course._id]
                ? "Unenroll"
                : course.enrolled >= course.capacity
                ? "Full"
                : "Enroll"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
