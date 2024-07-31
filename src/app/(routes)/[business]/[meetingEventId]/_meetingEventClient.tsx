"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/firebase-config";
import {
  bookingEvent,
  TBookingEvent,
  TBusiness,
  TMeetingEvent,
} from "@/lib/types";
import { calculateSlots, cn } from "@/lib/utils";
import { render } from "@react-email/render";
import { format } from "date-fns";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { CalendarCheck, Clock, MapPin, Timer } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import Email from "../../../../../emails";
import { sendEmailAction } from "@/actions";

type Props = {
  meetingEvent: TMeetingEvent;
  businessInfo: TBusiness;
};

function MeetingEventClient({ meetingEvent, businessInfo }: Props) {
  const [date, setDate] = useState<Date>(new Date());
  const [enableTimeSlot, setEnabledTimeSlot] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userNote, setUserNote] = useState("");
  const [prevBookingEvent, setPrevBookingEvent] = useState<TBookingEvent[]>([]);
  const [step, setStep] = useState(1);
  const router = useRouter();

  const timeSlots = useMemo(
    () => calculateSlots(meetingEvent.duration),
    [meetingEvent.duration]
  );

  const getPrevBookingEvent = useCallback(
    async (date: Date) => {
      const q = query(
        collection(db, "ScheduledMeetings"),
        where("selectedDate", "==", date),
        where("eventId", "==", meetingEvent.id)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) =>
        setPrevBookingEvent((prev) => [...prev, doc.data() as TBookingEvent])
      );
    },
    [meetingEvent.id]
  );

  const handleDateChange = async (date: Date | undefined) => {
    if (!date) return;
    setDate(date);
    await getPrevBookingEvent(date);
    setEnabledTimeSlot(true);
  };

  const handleScheduleEvent = async () => {
    toast.loading("Scheduling Event...", { id: "schedule-event" });
    const docId = Date.now().toString();

    const newBookingEvent: TBookingEvent = {
      id: docId,
      selectedDate: date,
      selectedTime: selectedTime,
      formattedDate: format(date, "PPP"),
      formattedTimeStamp: format(date, "t"),
      businessName: businessInfo.businessName,
      businessEmail: businessInfo.email,
      duration: meetingEvent.duration,
      locationUrl: meetingEvent.locationUrl,
      eventId: meetingEvent.id,
      userName: userName,
      userEmail: userEmail,
      userNote: userNote,
    };

    const validator = bookingEvent.safeParse(newBookingEvent);
    if (!validator.success) {
      console.log(validator.error.flatten().fieldErrors);
      return toast.error("Invalid Event Data", { id: "schedule-event" });
    }

    await setDoc(doc(db, "ScheduledMeetings", docId), validator.data);
    const emailHtml = render(
      <Email
        businessName={businessInfo?.businessName}
        date={format(date, "PPP").toString()}
        duration={meetingEvent?.duration}
        meetingTime={selectedTime}
        meetingUrl={meetingEvent.locationUrl}
        userFirstName={userName}
      />
    );

    await sendEmailAction(userEmail, emailHtml);
    toast.success("Meeting Scheduled successfully!", { id: "schedule-event" });
    return router.replace("/confirmation");
  };

  return (
    <div
      className="p-4 sm:m-10 sm:p-10 shadow-lg border-t-8"
      style={{ borderTopColor: meetingEvent.themeColor }}
    >
      <h2 className="text-clampBase font-bold text-primary">VC-Meetings</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
        {/* Meeting Info  */}
        <div className="p-4 border-r space-y-4">
          <h2>{businessInfo?.businessName}</h2>
          <h2 className="font-bold text-3xl">{meetingEvent.eventName}</h2>
          <div className="mt-5 flex flex-col gap-4">
            <h2 className="flex gap-2">
              <Clock />
              {meetingEvent?.duration} Min{" "}
            </h2>
            <h2 className="flex gap-2">
              <MapPin />
              {meetingEvent?.locationType} Meeting{" "}
            </h2>
            <h2 className="flex gap-2">
              <CalendarCheck />
              {format(date, "PPP")}{" "}
            </h2>
            {selectedTime && (
              <h2 className="flex gap-2">
                <Timer />
                {selectedTime}
              </h2>
            )}

            <Link href={meetingEvent.locationUrl} className="text-primary">
              {meetingEvent?.locationUrl}
            </Link>
          </div>
        </div>

        {/* Time & Date Selction  */}
        {step == 1 ? (
          <div className="md:col-span-2 space-y-4 px-4 ">
            <h2 className="font-bold text-lg">Select Date & Time</h2>
            <div className="flex w-full flex-wrap items-start gap-4">
              <Calendar
                big
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                className="rounded-md border mt-5 overflow-auto"
                disabled={(date) =>
                  date < new Date() ||
                  !businessInfo.daysAvailable.includes(format(date, "EEEE"))
                }
              />

              <div className="flex flex-col w-full max-h-[300px] md:max-h-[500px] min-w-[150px] overflow-auto gap-4 flex-1">
                {timeSlots?.map((time, index) => (
                  <Button
                    key={index}
                    disabled={
                      !enableTimeSlot ||
                      prevBookingEvent.filter(
                        (item) => item.selectedTime === time
                      ).length > 0
                    }
                    onClick={() => setSelectedTime(time)}
                    className={cn(`border-primary text-primary`, {
                      "bg-secondary": time == selectedTime,
                    })}
                    variant="outline"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 px-8 flex flex-col gap-3">
            <h2 className="font-bold text-xl">Enter Details</h2>
            <div className="space-y-2">
              <h2>Name *</h2>
              <Input onChange={(event) => setUserName(event.target.value)} />
            </div>
            <div className="space-y-2">
              <h2>Email *</h2>
              <Input onChange={(event) => setUserEmail(event.target.value)} />
            </div>
            <div className="space-y-2">
              <h2>Share any Notes </h2>
              <Input onChange={(event) => setUserNote(event.target.value)} />
            </div>
            <div>
              <h2 className="text-xs text-gray-400">
                By Proceeding, you confirm that you read and agree Vickonary
                terms and condition
              </h2>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-3 justify-end">
        {step == 2 && (
          <Button variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
        )}
        {step == 1 ? (
          <Button
            className="mt-10 float-right"
            disabled={!selectedTime || !date}
            onClick={() => setStep(step + 1)}
          >
            Next
          </Button>
        ) : (
          <Button
            disabled={!userEmail || !userName}
            onClick={handleScheduleEvent}
          >
            Schedule
          </Button>
        )}
      </div>
    </div>
  );
}

export default MeetingEventClient;
