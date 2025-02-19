"use client";

import content from "@/context/content";
import { useTheme } from "@/context/ThemeContext";
import TeamGrid from "@/components/TeamGrid";

export default function Team() {

  return (
    <div>
        <h1 className="text-4xl font-bold text-center mb-8 mt-10">Meet the Team</h1>
        <TeamGrid />
    </div>
  );
}
