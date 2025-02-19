"use client";
import React, { useState } from "react";
import { events } from "@/context/eventList";
import { formatEventTime } from "@/utils/eventUtils";
import { useTheme } from "@/context/ThemeContext";

export default function EventCards() {
  const { language } = useTheme();
  const now = new Date();
  // 0 => Upcoming, 1 => Achieved
  const [activeTab, setActiveTab] = useState(0);

  const filteredEvents = events.filter((event) => {
    const eventEnd = new Date(event.end_time);
    return activeTab === 0 ? eventEnd >= now : eventEnd < now;
  });

  return (
    <div className="py-4 flex justify-center">
      <div className="w-full px-4">
        <ul className="flex border-black">
          <li
            onClick={() => setActiveTab(0)}
            className={`
              cursor-pointer px-6 py-2 mr-2 text-lg font-medium 
              border border-black border-b-0 rounded-t-md
              ${activeTab === 0 ? "bg-white" : "bg-transparent border-transparent"}
            `}
          >
            {language === "en" ? "Upcoming" : "開催予定"}
          </li>
          <li
            onClick={() => setActiveTab(1)}
            className={`
              cursor-pointer px-6 py-2 text-lg font-medium 
              border border-black border-b-0 rounded-t-md
              ${activeTab === 1 ? "bg-white" : "bg-transparent border-transparent"}
            `}
          >
            {language === "en" ? "Complete" : "終了済み"}
          </li>
        </ul>

        {/* Content Container */}
        <div
          className={`p-4 border border-black rounded-tr-md rounded-b-md bg-white
          ${activeTab === 1 && "rounded-tl-md"}`}
        >
          <div className="overflow-x-auto">
            <div className="flex space-x-4 px-4">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="min-w-[300px] p-4 shadow-md rounded-md border border-gray-300"
                  >
                    <h2 className="text-xl font-bold">
                      {event.title[language]}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {formatEventTime(event.start_time, event.end_time)}
                    </p>
                    <p className="mt-2">{event.description[language]}</p>
                    <a
                      href={event.link}
                      className="block mt-4 text-blue-500 hover:underline"
                    >
                      {language === "en" ? "View Details" : "詳細を見る"}
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-gray-700 text-center w-full">
                  {language === "en"
                    ? "No events available"
                    : "イベントがありません"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
