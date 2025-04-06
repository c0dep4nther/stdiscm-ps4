"use client";
import { useState } from "react";

export default function UploadGradesPage() {
  const [form, setForm] = useState({ studentId: "", course: "", grade: "" });

  const courses = [
    "Intro to AI",
    "Data Structures",
    "Web Development",
    "Cloud Computing"
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/upload-grade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Grade uploaded successfully.");
  };

  return (
    <main className="login-main">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Upload Grade</h2>
        <input name="studentId" placeholder="Student ID" className="login-input" onChange={handleChange} required />
        <select name="course" className="login-input" onChange={handleChange} required>
          <option value="">Select Course</option>
          {courses.map((course, idx) => (
            <option key={idx} value={course}>{course}</option>
          ))}
        </select>
        <input name="grade" placeholder="Grade" className="login-input" onChange={handleChange} required />
        <button type="submit" className="login-button">Submit</button>
      </form>
    </main>
  );
}