"use client";
import { useEffect, useState } from "react";

export default function GradesPage() {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    fetch("/api/grades")
      .then(res => res.json())
      .then(setGrades);
  }, []);

  return (
    <main className="login-main">
      <div className="login-form">
        <h2 className="login-title">Your Grades</h2>
        {grades.map((entry, i) => (
          <div key={i} className="login-input">
            <p>{entry.course}: <strong>{entry.grade}</strong></p>
          </div>
        ))}
      </div>
    </main>
  );
}