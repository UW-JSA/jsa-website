// src/components/Register.tsx
"use client";

import React, { useState } from "react";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username.length < 3 || password.length < 6 || !email) {
      setMessage(
        "Ensure username is at least 3 characters, email is provided, and password is at least 6 characters.",
      );
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(
          "User registered successfully! Check your email for confirmation.",
        );
      } else {
        setMessage(data.message || "Error registering user.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Error registering user.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-md mx-auto p-4"
    >
      <div>
        <label htmlFor="username" className="block text-sm font-medium">
          Username:
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full border rounded px-2 py-1"
          placeholder="Enter your username"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email:
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border rounded px-2 py-1"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password:
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border rounded px-2 py-1"
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
      >
        Register
      </button>
      {message && <p className="text-center mt-2">{message}</p>}
    </form>
  );
};

export default Register;
