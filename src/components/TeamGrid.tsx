import Image from "next/image";
import { team } from "@/context/teamList";
import { useTheme } from "@/context/ThemeContext";

export default function TeamGrid() {
  const { language } = useTheme();

  return (
    <div className="py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {team.map((member, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg"
          >
            <Image
              src={member.imageUrl}
              alt={`${member.name}'s photo`}
              width={150}
              height={150}
              className="rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold">{member.name[language]}</h2>
            <p className="text-gray-500 mb-4">{member.description[language]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
