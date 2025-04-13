"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UploadGradesPage() {
  const [form, setForm] = useState({ studentId: "", course: "", grade: "" });
  const [courses, setCourses] = useState([]);
  const [isFaculty, setIsFaculty] = useState(false); // Check if the user is faculty
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redirect to login if no token
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT safely
      setUserData(decoded);
      setIsFaculty(decoded.role === "faculty"); // Set to true if faculty

      if (decoded.role === "student") {
        alert("You are not authorized to access this page.");
        router.push("/courses"); // Redirect to courses page for students
        return;
      }

      fetch("/api/courses")
        .then((res) => res.json())
        .then(setCourses);
    } catch (error) {
      console.error("Failed to decode token", error);
      router.push("/login"); // Handle token decoding error and redirect to login
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/upload-grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Fix data structure to match backend requirements
        body: JSON.stringify({
          studentId: form.studentId,
          courseId: form.course, // Map 'course' to 'courseId'
          grade: form.grade,
          uploadedBy: userData.username, // Get the current username
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload grade");
      }

      alert("Grade uploaded successfully.");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  if (!isFaculty) {
    return (
      <main className="login-main">
        <h2 className="login-title">Unauthorized Access</h2>
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
            <option key={idx} value={course.courseCode}>
              {course.title}
            </option>
          ))}
        </select>
        <input
          name="grade"
          placeholder="Grade"
          className="login-input"
          onChange={handleChange}
          required
        />
        <button type="submit" className="login-button">
          Submit
        </button>
      </form>
    </main>
  );
}
