"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { events } from "@/context/eventList";
import { useTheme } from "@/context/ThemeContext";
import { Typography, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PastEventCard, { EventData } from "./PastEventCard";

export default function PastEvents() {
  const { language } = useTheme();
  const now = new Date();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  const pastEvents: EventData[] = events.filter(
    (event) => new Date(event.end_time) < now,
  );

  useEffect(() => {
    const handleResize = () => {
      const widths = [1280, 1028, 500];
      const counts = [4, 3, 2];
      const newCount =
        counts.find((_, i) => window.innerWidth >= widths[i]) || 1;
      setVisibleCount(newCount);
      setActiveIndex((prev) => Math.min(prev, pastEvents.length - newCount));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pastEvents.length]);

  const handleScroll = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.clientWidth / visibleCount;
      setActiveIndex(Math.round(sliderRef.current.scrollLeft / cardWidth));
    }
  };

  const scrollToIndex = useCallback(
    (index: number) => {
      if (sliderRef.current) {
        const cardWidth = sliderRef.current.clientWidth / visibleCount;
        sliderRef.current.scrollTo({
          left: index * cardWidth,
          behavior: "smooth",
        });
        setActiveIndex(index);
      }
    },
    [visibleCount],
  );

  useEffect(() => {
    if (activeIndex < pastEvents.length - visibleCount) {
      const interval = setInterval(() => {
        scrollToIndex(activeIndex + 1);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [activeIndex, pastEvents.length, scrollToIndex, visibleCount]);

  const totalPages = Math.max(pastEvents.length - visibleCount + 1, 1);

  return (
    <div className="py-12 bg-gradient-to-b from-sakura-50 to-white">
      <div className="container mx-auto px-4">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          className="font-bold"
        >
          {language === "en" ? "Past Events" : "過去のイベント"}
        </Typography>

        <div className="relative group">
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex py-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
          >
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="snap-start px-2"
                style={{
                  width: `${100 / visibleCount}%`,
                  minWidth: `${100 / visibleCount}%`,
                }}
              >
                <PastEventCard event={event} language={language} />
              </div>
            ))}
          </div>

          {pastEvents.length > visibleCount && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <IconButton
                onClick={() => scrollToIndex(activeIndex - 1)}
                disabled={activeIndex === 0}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                  boxShadow: 3,
                  transition: "all 0.3s",
                  "&:disabled": { opacity: 0.5 },
                }}
              >
                <ArrowBackIosNewIcon className="text-red-800" />
              </IconButton>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeIndex === idx
                        ? "bg-red-600 scale-125"
                        : "bg-red-200 hover:bg-red-400"
                    }`}
                  />
                ))}
              </div>

              <IconButton
                onClick={() => scrollToIndex(activeIndex + 1)}
                disabled={activeIndex >= totalPages - 1}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                  boxShadow: 3,
                  transition: "all 0.3s",
                  "&:disabled": { opacity: 0.5 },
                }}
              >
                <ArrowForwardIosIcon className="text-red-800" />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
