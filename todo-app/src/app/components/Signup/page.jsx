"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios"; // Import axios
import Login from "../Login/page";

export default function Signup() {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Use useEffect to initialize state or perform other actions
  useEffect(() => {
    // Example of initializing form with default values (optional)
    setusername("");
    setEmail("");
    setPassword("");
  }, []); // Empty dependency array means it runs only on mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ username, email, password });
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Make a POST request to Django backend for user registration
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/register/", // Registration endpoint
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (response.status === 201) {
        // Show success message and redirect to login or dashboard
        setMessage(data.message || "Registration successful");
        router.push("Login"); // Redirect to login page after successful registration
      } else {
        setError(data.detail || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong");
      console.error("Error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Signup Page</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          className="border p-2 rounded text-black"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded text-black"
        />
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Signup
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <Link
          href="/components/Login"
          className="text-blue-500 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
