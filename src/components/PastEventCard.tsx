"use client";

import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { formatEventTime } from "@/utils/eventUtils";

export interface EventData {
  id: string | number;
  title: { [key: string]: string };
  description: { [key: string]: string };
  start_time: string;
  end_time: string;
  link: string;
}

interface PastEventCardProps {
  event: EventData;
  language: string;
}

const PastEventCard: React.FC<PastEventCardProps> = ({ event, language }) => {
  return (
    <Card
      sx={{
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
        borderRadius: "16px",
        height: { xs: "320px", sm: "330px", md: "350px" },
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(145deg, #fff8f8, #ffebeb)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "visible",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          "&::after": {
            opacity: 1,
          },
        },
      }}
    >
      <CardMedia
        component="img"
        image="/image.png"
        alt="Event Image"
        sx={{
          height: { xs: "140px", sm: "160px", md: "180px" },
          objectFit: "cover",
          borderRadius: "16px 16px 0 0",
          position: "relative",
        }}
      />

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: 3,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(198,40,40,0.1)",
          borderTop: "none",
          borderRadius: "0 0 16px 16px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "1rem", sm: "1.125rem", md: "1.2rem" },
            fontWeight: 600,
            color: "#5a2a2a",
            mb: 1,
            lineHeight: 1.3,
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              bottom: -4,
              left: 0,
              width: "40px",
              height: "2px",
              background: "#c62828",
            },
          }}
        >
          {event.title[language]}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            color: "#a23737",
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "0.5px",
            mb: 2,
            display: "flex",
            alignItems: "center",
            "&::before": {
              content: '"\\f073"',
              marginRight: "8px",
              color: "#c62828",
            },
          }}
        >
          {formatEventTime(event.start_time, event.end_time)}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#543d3d",
            fontSize: "0.875rem",
            lineHeight: 1.6,
            flexGrow: 1,
            overflow: "scroll",
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            position: "relative",
          }}
        >
          {event.description[language]}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PastEventCard;
