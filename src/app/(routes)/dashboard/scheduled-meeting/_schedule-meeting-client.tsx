import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CalendarCheck, Clock, List, Timer } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TBookingEvent } from "@/lib/types";
import { format } from "date-fns";

type Props = {
  meetingList: TBookingEvent[];
};

function ScheduledMeetingClient({ meetingList }: Props) {
  const filterMeetingList = (type: "upcoming" | "expired") => {
    if (type == "upcoming") {
      return meetingList.filter(
        (item) => item.formattedTimeStamp >= format(new Date(), "t")
      );
    } else {
      return meetingList.filter(
        (item) => item.formattedTimeStamp < format(new Date(), "t")
      );
    }
  };

  return (
    <div>
      <Tabs defaultValue="upcoming" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <ListComponents meetingList={filterMeetingList("upcoming")} />
        </TabsContent>
        <TabsContent value="expired">
          <ListComponents meetingList={filterMeetingList("expired")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ScheduledMeetingClient;

const ListComponents = ({ meetingList }: { meetingList: TBookingEvent[] }) => {
  return !meetingList.length ? (
    <div className="flex flex-col items-center justify-center">
      <p className="text-muted-foreground">No Meeting Found</p>
    </div>
  ) : (
    meetingList.map((meeting, index) => (
      <Accordion type="single" collapsible key={index}>
        <AccordionItem value="item-1">
          <AccordionTrigger>{meeting?.formattedDate}</AccordionTrigger>
          <AccordionContent>
            <div>
              <div className="mt-5 flex flex-col gap-4">
                <h2 className="flex gap-2">
                  <Clock />
                  {meeting?.duration} Min
                </h2>
                <h2 className="flex gap-2">
                  <CalendarCheck />
                  {meeting.formattedDate}
                </h2>
                <h2 className="flex gap-2">
                  <Timer />
                  {meeting.selectedTime}
                </h2>

                <Link
                  href={meeting?.locationUrl ? meeting?.locationUrl : "#"}
                  className="text-primary"
                >
                  {meeting?.locationUrl}
                </Link>
              </div>
              <Link href={meeting.locationUrl}>
                <Button className="mt-5">Join Now</Button>
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ))
  );
};
