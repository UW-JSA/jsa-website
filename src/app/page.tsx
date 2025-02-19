"use client";

import Image from "next/image";
import content from "@/context/content";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {

  const { language } = useTheme();

  return (
    <div>
    <div className="flex flex-col sm:flex-row align-start items-center justify-center sm:h-auto h-screen lg:p-40 md:p-20 p-10">
      <div className="flex flex-col text-center sm:text-left gap-5 pt-60 sm:pt-0">
      <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold">{content[language].title}</h1>
      <p className="lg:text-2xl md:text-xl sm:text-md text-sm">{content[language].description}</p>
      </div>
      <Image className="sm:scale-100 scale-50 sm:-translate-y-0 -translate-y-20" src="/logo.png" alt="Logo" width={500} height={500}/>
    </div>
    </div>
    
  );
}
