"use client";

import { useTheme } from "@/context/ThemeContext";
import content from "@/context/content";

export default function Home() {
  const { language } = useTheme();
  return (
    <div>
      {content[language].description}
    </div>
  );
}