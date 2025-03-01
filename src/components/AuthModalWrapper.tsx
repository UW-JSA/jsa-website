// AuthModalWrapper.tsx
"use client";

import React, { useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const AuthModalWrapper: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  const handleOpenRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleCloseRegister = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <>
      {showLogin && (
        <LoginModal
          onClose={handleCloseLogin}
          onRegisterClick={handleOpenRegister}
        />
      )}
      {showRegister && <RegisterModal onClose={handleCloseRegister} />}
    </>
  );
};

export default AuthModalWrapper;
