"use client";
import "./upload-grades.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UploadGradesPage() {
  const [form, setForm] = useState({ studentId: "", course: "", grade: "" });
  const [courses, setCourses] = useState([]);
  const [isFaculty, setIsFaculty] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // check the user's role by decoding the JWT token stored in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const decoded = JSON.parse(atob(token.split(".")[1])); // decode the JWT token
    setIsFaculty(decoded.isStudent === false); // set to true if faculty

    if (decoded.isStudent === false) {
      fetch("/api/courses")
        .then((res) => res.json())
        .then(setCourses);
    } else {
      // redirect student to courses page as they cannot upload grades
      router.push("/courses");
    }
  }, []);

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

  if (!isFaculty) {
    return (
      <main className="login-main">
        <h2 className="login-title">You are not authorized to access this page.</h2>
      </main>
    );
  }

  return (
    <main className="login-main">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Upload Grade</h2>
        <input
          name="studentId"
          placeholder="Student ID"
          className="login-input"
          onChange={handleChange}
          required
        />
        <select
          name="course"
          className="login-input"
          onChange={handleChange}
          required
        >
          <option value="">Select Course</option>
          {courses.map((course, idx) => (
            <option key={idx} value={course.courseCode}>{course.title}</option>
          ))}
        </select>
        <input
          name="grade"
          placeholder="Grade"
          className="login-input"
          onChange={handleChange}
          required
        />
        <button type="submit" className="login-button">Submit</button>
      </form>
    </main>
  );
}