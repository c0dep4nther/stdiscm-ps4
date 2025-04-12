"use client";
import "./login.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Ensure that username and password are not empty before making the request
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      // Check if the request was successful
      if (res.ok) {
        const data = await res.json();
        
        // If a token is returned, store it and navigate
        if (data.token) {
          localStorage.setItem("token", data.token);
          router.push("/courses");
        } else {
          alert("Invalid login credentials.");
        }
      } else {
        // Handle HTTP errors like 401 Unauthorized
        alert(`Error: ${res.statusText}`);
      }
    } catch (error) {
      // Catch any network or other unexpected errors
      console.error("Error during login:", error);
      alert("An error occurred while logging in. Please try again later.");
    }
  };
  
  

  return (
    <main className="login-main">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="login-title">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </main>
  );
}