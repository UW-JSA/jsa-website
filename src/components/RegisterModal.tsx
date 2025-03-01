// src/components/RegisterModal.tsx
"use client";

import React from "react";
import Register from "./Register";

type RegisterModalProps = {
  onClose: () => void;
};

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600"
          aria-label="Close registration modal"
        >
          X
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Sign Up</h2>
        <Register />
      </div>
    </div>
  );
};

export default RegisterModal;
