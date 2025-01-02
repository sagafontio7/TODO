"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios"; // Import axios // Adjust relative path if needed

export default function Login() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  // Initialize form states using useEffect (if needed)
  useEffect(() => {
    // Optionally, reset form or set default values when the component mounts
    setusername("");
    setPassword("");
    setError(null); // Reset error message when the component is loaded
  }, []); // Empty dependency array means it runs only once after component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ username, password });

    // Make a POST request to Django backend using axios
    try {
      const response = await axios.post(
        "http://localhost:8000/login/",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (response.status === 200) {
        // Save the token to localStorage or state for further requests
        localStorage.setItem("access_token", data.access_token);
        console.log("Login successful");
        router.push("/components/Task"); // Redirect user to another page after successful login
      } else {
        setError(data.detail || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
      console.error("Error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login Page</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
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
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <p className="mt-4">
        Don’t have an account?{" "}
        <Link
          href="/components/Signup"
          className="text-blue-500 hover:underline"
        >
          Signup
        </Link>
      </p>
    </div>
  );
}
