"use client";

import { AppBar, Toolbar, Typography, Box, useScrollTrigger } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import content from "@/context/content";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function NavBar() {
  const { language, toggleLanguage } = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <AppBar position="fixed" color="transparent" className={`${dmSans.className} antialiased bg-transparent shadow-none`}>
      <Toolbar className="flex justify-between items-center">
        <Link href="/" className="flex items-center no-underline">
          <Typography variant="h6" className="flex items-center text-gray-900">
            <Image src="/logo.webp" alt="logo" width={50} height={50} />
            {!trigger && <span className="ml-2">{content[language].shorttitle}</span>}
          </Typography>
        </Link>
        <Box
          className={`flex gap-2 items-center rounded-full px-4 py-1 transition-colors duration-300 ${
            trigger ? "bg-[#FFFFEE] backdrop-brightness-90 backdrop-blur-lg" : "bg-transparent"
          }`}
        >
          <button  onClick={toggleLanguage} className="flex items-center py-2 px-2 text-gray-800 text-lg capitalize">
            <span className={`${language === "ja" ? "font-bold" : "font-thin"}`}>JA</span>
            <span className="mx-2">|</span>
            <span className={`${language === "en" ? "font-bold" : "font-thin"}`}>EN</span>
          </button>
          <button className="flex w-20 items-center justify-center bg-gradient-to-br from-orange-400 to-red-600 text-white font-semibold py-1.5 px-3 rounded-full hover:from-orange-500 hover:to-red-700 transition-all duration-300"
            >
            Log In
            </button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
