import { z } from "zod";

export type TBusiness = {
  id: string;
  businessName: string;
  email: string;
  userName: string;
  daysAvailable: string[];
  startTime: string;
  endTime: string;
};

export const meetingEventSchema = z.object({
  id: z.string(),
  eventName: z.string().min(1),
  duration: z.number(),
  locationType: z.string(),
  locationUrl: z.string().url(),
  themeColor: z.string(),
  businessId: z.any(),
  createdBy: z.string(),
});

export type TMeetingEvent = z.infer<typeof meetingEventSchema>;

export const bookingEvent = z.object({
  id: z.string(),
  selectedDate: z.date(),
  selectedTime: z.string(),
  formattedDate: z.string(),
  formattedTimeStamp: z.string(),
  businessName: z.string(),
  businessEmail: z.string(),
  duration: z.number(),
  locationUrl: z.string().url(),
  eventId: z.string(),
  userName: z.string(),
  userEmail: z.string().email(),
  userNote: z.string().or(z.literal("")),
});

export type TBookingEvent = z.infer<typeof bookingEvent>;
