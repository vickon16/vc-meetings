import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const locationTypes = [
  {
    name: "Zoom",
    icon: "/zoom.png",
  },
  {
    name: "Meet",
    icon: "/meet.png",
  },
  {
    name: "Phone",
    icon: "/phone.png",
  },
  {
    name: "Other",
    icon: "/other.png",
  },
];

export const themeColors = [
  "#4F75FE",
  "#13C38B",
  "#9F3CFE",
  "#FF555D",
  "#FF7D4F",
];

export const meetingDurations = [
  {
    name: "15 Min",
    value: 15,
  },
  {
    name: "30 Min",
    value: 30,
  },
  {
    name: "45 Min",
    value: 45,
  },
  {
    name: "60 Min",
    value: 60,
  },
];

export const availableDaysList = [
  {
    day: "Sunday",
    available: false,
  },
  {
    day: "Monday",
    available: false,
  },
  {
    day: "Tuesday",
    available: false,
  },
  {
    day: "Wednesday",
    available: false,
  },
  {
    day: "Thursday",
    available: false,
  },
  {
    day: "Friday",
    available: false,
  },
  {
    day: "Saturday",
    available: false,
  },
];

export const calculateSlots = (duration: number) => {
  const startTime = 8 * 60; // 8 AM in minutes
  const endTime = 22 * 60; // 10 PM in minutes
  const totalSlots = (endTime - startTime) / duration;
  return Array.from({ length: totalSlots }, (_, i) => {
    const totalMinutes = startTime + i * duration;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format
    const period = hours >= 12 ? "PM" : "AM";
    return `${String(formattedHours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")} ${period}`;
  });
};
