import { format } from "date-fns";

export const formatEventTime = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const formattedDate = format(startDate, "MMM dd, yyyy");
  const formattedStartTime = format(startDate, "hh:mm a");
  const formattedEndTime = format(endDate, "hh:mm a");

  return `${formattedDate}・${formattedStartTime} - ${formattedEndTime}`;
};
