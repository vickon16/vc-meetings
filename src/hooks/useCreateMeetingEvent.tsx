import { TMeetingEvent } from "@/lib/types";
import { locationTypes, themeColors } from "@/lib/utils";
import { create } from "zustand";

interface CreateMeetingEventStore {
  meetingEvent: TMeetingEvent;
  setAllMeetingEvent: (meetingEvent: TMeetingEvent) => void;
  setPartialMeetingEvent: (partialMeetingEvent: Partial<TMeetingEvent>) => void;
  reset: () => void;
}

export const defaultMeetingEvent: TMeetingEvent = {
  id: "",
  businessId: "",
  createdBy: "",
  duration: 30,
  eventName: "",
  locationType: locationTypes[0].name,
  locationUrl: "",
  themeColor: themeColors[0],
};

const useCreateMeetingEvent = create<CreateMeetingEventStore>((set) => ({
  meetingEvent: defaultMeetingEvent,
  setAllMeetingEvent: (meetingEvent) => set({ meetingEvent }),
  setPartialMeetingEvent: (partialMeetingEvent) =>
    set((state) => ({
      meetingEvent: {
        ...state.meetingEvent,
        ...partialMeetingEvent,
      },
    })),
  reset: () => set({ meetingEvent: defaultMeetingEvent }),
}));

export default useCreateMeetingEvent;
