// LoginModal.tsx
"use client";

import React, { useState } from "react";

type LoginModalProps = {
  onClose: () => void;
  onRegisterClick: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({
  onClose,
  onRegisterClick,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Your login logic here
    console.log("Logging in with:", username, password);
    onClose(); // Close modal after login attempt
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">
          <span className="block">Welcome to University of Waterloo</span>
          <span className="block">Japanese Student Association</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onRegisterClick}
              className="text-blue-500 hover:underline"
            >
              Sign up
            </button>
            <div className="flex">
              <button
                type="button"
                onClick={onClose}
                className="mr-4 px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-gradient-to-br from-orange-400 to-red-600 text-white hover:from-orange-500 hover:to-red-700 transition-all duration-300"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
