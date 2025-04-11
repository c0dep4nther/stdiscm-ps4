"use client";
import "./grades.css";
import { useEffect, useState } from "react";

export default function GradesPage() {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    fetch("/api/grades")
      .then((res) => res.json())
      .then(setGrades);
  }, []);

  return (
    <main className="login-main">
      <div className="login-form">
        <h2 className="login-title">Your Grades</h2>
        {grades.map((entry, i) => (
          <div key={i} className="course-grade-card">
            <p><strong>Course Name:</strong> {entry.courseName}</p>
            <p><strong>Grade:</strong> <span className="grade">{entry.grade}</span></p>
            <p><strong>Student ID:</strong> {entry.studentId}</p>
            <p><strong>Uploaded By:</strong> {entry.uploadedBy}</p>
            <p><strong>Uploaded At:</strong> {new Date(entry.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </main>
  );
}