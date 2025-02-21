"use client";

import Image from "next/image";
import content from "@/context/content";
import { useTheme } from "@/context/ThemeContext";
import EventCards from "@/components/EventCards";

export default function Home() {
  const { language } = useTheme();

  return (
    <div>
      <div className="flex flex-col sm:flex-row align-start items-center justify-center lg:p-40 md:p-20 p-10 xl:gap-20 gap-0">
        <div className="flex flex-col text-center sm:text-left gap-5">
          <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold">
            {content[language].title}
          </h1>
          <p className="lg:text-2xl md:text-xl sm:text-md text-sm">
            {content[language].description}
          </p>
        </div>
        <Image
          className="scale-75 sm:scale-100 sm:translate-y-0"
          src="/logo.png"
          alt="Logo"
          width={300}
          height={300}
        />
      </div>
      <EventCards />
    </div>
  );
}
