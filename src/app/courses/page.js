"use client";
import { useEffect, useState } from "react";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState({});

  useEffect(() => {
    fetch("/api/courses")
      .then(res => res.json())
      .then(setCourses);
  }, []);

  const handleToggleEnroll = (id) => {
    const isCurrentlyEnrolled = enrolled[id];
    const endpoint = isCurrentlyEnrolled ? "/api/unenroll" : "/api/enroll";

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId: id })
    })
    .then(() => setEnrolled(prev => ({ ...prev, [id]: !isCurrentlyEnrolled })));
  };

  return (
    <main className="login-main">
      <div className="login-form">
        <h2 className="login-title">Available Courses</h2>
        {courses.map((course) => (
          <div key={course.id} className="login-input">
            <p><strong>{course.name}</strong>: {course.description}</p>
            <button
              onClick={() => handleToggleEnroll(course.id)}
              className="login-button mt-2"
              style={{ backgroundColor: enrolled[course.id] ? '#dc2626' : '' }}
            >
              {enrolled[course.id] ? "Unenroll" : "Enroll"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}