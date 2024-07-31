"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import useCreateMeetingEvent from "@/hooks/useCreateMeetingEvent";
import { TBusiness } from "@/lib/types";
import { calculateSlots } from "@/lib/utils";
import { Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type Props = {
  businessName: string;
};

function PreviewMeeting({ businessName }: Props) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { meetingEvent } = useCreateMeetingEvent();

  const timeSlots = useMemo(
    () => calculateSlots(meetingEvent.duration),
    [meetingEvent.duration]
  );

  return (
    <div
      className="sm:px-5 py-10 shadow-lg m-5 border-t-8"
      style={{ borderTopColor: meetingEvent.themeColor }}
    >
      <h2 className="text-clampBase font-bold text-primary">VC-Meetings</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 mt-5 gap-5">
        {/* Meeting Info  */}
        <div className="p-4 space-y-3">
          <div>
            <p className="text-muted-foreground">Business Name</p>
            <h2 className="text-clampSm ml-2">{businessName}</h2>
          </div>

          <div>
            <p className="text-muted-foreground">Event Name</p>
            <h2 className="font-bold text-clampLg ml-2">
              {!!meetingEvent?.eventName
                ? meetingEvent.eventName
                : "Meeting Name"}
            </h2>
          </div>
          <div className="mt-5 flex flex-col gap-4">
            <h2 className="flex gap-2">
              <Clock />
              {meetingEvent.duration} Min
            </h2>
            <h2 className="flex gap-2">
              <MapPin />
              {meetingEvent.locationType} Meeting
            </h2>
            {meetingEvent?.locationUrl && (
              <Link href={"#"} className="text-primary">
                {meetingEvent.locationUrl}
              </Link>
            )}
          </div>
        </div>

        {/* Time & Date Selction  */}
        <div className="md:col-span-3 w-full">
          <h2 className="font-bold text-lg">Select Date & Time</h2>
          <div className="px-4 flex items-start flex-wrap gap-4">
            <Calendar
              big
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border mt-5 overflow-auto"
              disabled={(date) => date < new Date()}
            />
            <div className="flex flex-col w-full max-h-[300px] md:max-h-[500px] min-w-[150px] overflow-auto gap-4 flex-1">
              {timeSlots?.map((time, index) => (
                <Button
                  key={index}
                  className="border-primary text-primary"
                  variant="outline"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewMeeting;
