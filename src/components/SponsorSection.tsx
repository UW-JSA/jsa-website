"use client";

import Image from "next/image";
import { Typography } from "@mui/material";
import { logos } from "@/constants/logos";
import { useTheme } from "@/context/ThemeContext";

export default function SponsorSection() {
  const { language } = useTheme();
  return (
    <div className="bg-gradient-to-r py-20 text-gray-800">
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        className="font-bold"
      >
        {language === "en" ? "Become a Sponsor" : "スポンサーになる"}
      </Typography>
      <Typography variant="h6" align="center" className="mb-8">
        {language === "en"
          ? "Join us in making this community big!"
          : "私たちと一緒に、このコミュニティを大きくしていきましょう！"}
      </Typography>

      {/* Flex container for logos */}
      <div className="flex flex-wrap justify-center items-center gap-3 px-4">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex justify-center items-center p-3 bg-white rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          >
            <div className="relative h-8 sm:h-10 md:h-14 w-36 sm:w-48 md:w-64">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
