"use client";
import React, { useState } from "react";
import { events } from "@/context/eventList";
import { useTheme } from "@/context/ThemeContext";
import { formatEventTime } from "@/utils/eventUtils";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function UpcomingEvents() {
  const { language } = useTheme();
  const [expanded, setExpanded] = useState<string | false>(false);
  const now = new Date();

  // Filter upcoming events (end_time is in the future)
  const upcomingEvents = events.filter(
    (event) => new Date(event.end_time) > now,
  );

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="container mx-auto">
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        className="font-bold"
      >
        {language === "en" ? "Upcoming Events" : "今後のイベント"}
      </Typography>

      {upcomingEvents.length === 0 ? (
        <Typography className="text-[#795548] py-4 text-lg text-center">
          {language === "en"
            ? "✨ No upcoming events - Please check back later ✨"
            : "✨ 近日中のイベントはありません - また後で確認してください ✨"}
        </Typography>
      ) : (
        <div className="max-w-3xl mx-auto py-4 rounded-lg">
          {upcomingEvents.map((event) => (
            <Accordion
              key={event.id}
              expanded={expanded === event.id.toString()}
              onChange={handleChange(event.id.toString())}
              disableGutters
              className="bg-[#fffafa] border-b border-gray-200 last:border-0"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className="text-[#c62828]" />}
                className="flex gap-1 flex-row-reverse px-4 hover:bg-[#fff3f3]"
              >
                <div className="flex justify-between items-center w-full pr-4">
                  <Typography
                    variant="subtitle1"
                    className="font-bold text-[#5d4037] text-base"
                  >
                    {event.title[language]}
                  </Typography>
                  <Typography
                    variant="caption"
                    className="text-[#c62828] font-medium text-xs"
                  >
                    {formatEventTime(event.start_time, event.end_time)}
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails className="relative px-4 py-3 border-t ">
                {/* Vertical accent line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#c62828]" />
                <div className="ml-3">
                  <Typography
                    variant="body2"
                    className="text-[#5d4037] leading-relaxed text-sm"
                  >
                    {event.description[language]}
                  </Typography>
                  <Button
                    href={event.link}
                    variant="outlined"
                    size="small"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 border-[#c62828] text-[#c62828] font-medium rounded-full text-xs hover:bg-[#c62828] hover:text-white"
                  >
                    {language === "en" ? "View Details" : "詳細を見る"}
                  </Button>
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      )}
    </div>
  );
}
