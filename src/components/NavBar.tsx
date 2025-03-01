"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import content from "@/context/content";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Dynamically import LoginModal to avoid SSR issues
const LoginModal = dynamic(() => import("./LoginModal"), { ssr: false });

export default function NavBar() {
  const { language, toggleLanguage } = useTheme();
  const [showModal, setShowModal] = useState(false);

  const handleLoginClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "#ffffe9",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
        }}
        className={`${dmSans.className} antialiased`}
      >
        <Toolbar className="flex justify-between items-center">
          <div className="flex flex-row items-center gap-3">
            <Link href="/" className="flex items-center no-underline">
              <Typography
                variant="h6"
                className="flex items-center text-gray-900"
              >
                <Image src="/logo.png" alt="logo" width={50} height={50} />
                <span className="ml-2 font-bold">
                  {content[language].shorttitle}
                </span>
              </Typography>
            </Link>
          </div>

          <Box className="flex items-center gap-5 rounded-full px-4 py-1 transition-colors duration-300">
            <Link href="/team" className="flex items-center no-underline">
              <Typography
                variant="h6"
                className="flex items-center text-gray-900"
              >
                <span className="ml-2 text-sm">Team</span>
              </Typography>
            </Link>
            <button
              onClick={toggleLanguage}
              className="flex items-center py-2 px-2 text-gray-800 text-lg capitalize"
            >
              <span
                className={`${language === "ja" ? "font-bold" : "font-thin"}`}
              >
                JA
              </span>
              <span className="mx-2">|</span>
              <span
                className={`${language === "en" ? "font-bold" : "font-thin"}`}
              >
                EN
              </span>
            </button>
            <button
              onClick={handleLoginClick}
              className="flex w-20 items-center justify-center bg-gradient-to-br from-orange-400 to-red-600 text-white font-semibold py-1.5 px-3 rounded-full hover:from-orange-500 hover:to-red-700 transition-all duration-300"
            >
              Log In
            </button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Render the modal if showModal is true */}
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </>
  );
}
