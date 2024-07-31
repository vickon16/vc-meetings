"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import useCreateMeetingEvent from "@/hooks/useCreateMeetingEvent";
import { db } from "@/lib/firebase-config";
import { meetingEventSchema, TMeetingEvent } from "@/lib/types";
import { cn, locationTypes, meetingDurations, themeColors } from "@/lib/utils";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { doc, setDoc } from "firebase/firestore";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function MeetingForm() {
  const { meetingEvent, setPartialMeetingEvent } = useCreateMeetingEvent();
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  const onCreateClick = async () => {
    if (!user || !user.email) return;
    toast.loading("Creating Meeting Event...", { id: "create-meeting" });
    const id = Date.now().toString();

    const newMeetingEvent: TMeetingEvent = {
      ...meetingEvent,
      id: id,
      createdBy: user.email,
      businessId: doc(db, "Business", user.email),
    };

    const validator = meetingEventSchema.safeParse(newMeetingEvent);
    if (!validator.success) {
      console.log(validator.error.flatten().fieldErrors);
      return toast.error("Invalid Meeting Event", { id: "create-meeting" });
    }

    await setDoc(doc(db, "MeetingEvent", id), newMeetingEvent);
    await new Promise((r) => setTimeout(r, 2000));
    toast.success("New Meeting Event Created!", { id: "create-meeting" });
    router.refresh();
    router.replace("/dashboard/meeting-type");
  };

  return (
    <div className="p-6 space-y-6">
      <Link href={"/dashboard"} className="flex gap-2">
        <ChevronLeft /> Cancel
      </Link>
      <h2 className="font-bold text-2xl my-4">Create New Event</h2>
      <hr></hr>

      <div className="flex flex-col gap-5 my-4">
        <h2 className="font-bold">Event Name *</h2>
        <Input
          placeholder="Name of your meeting event"
          onChange={(event) =>
            setPartialMeetingEvent({
              eventName: event.target.value,
            })
          }
        />

        <h2 className="font-bold">Duration *</h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="max-w-40">
              {meetingEvent.duration} Min
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {meetingDurations.map((option, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() =>
                  setPartialMeetingEvent({ duration: option.value })
                }
              >
                {option.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <h2 className="font-bold">Location *</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-3">
          {locationTypes.map((option, index) => (
            <div
              key={index}
              className={cn(
                `border flex flex-col justify-center items-center p-3 rounded-lg cursor-pointer hover:border-primary`,
                {
                  "bg-secondary border-primary":
                    meetingEvent.locationType == option.name,
                }
              )}
              onClick={() =>
                setPartialMeetingEvent({ locationType: option.name })
              }
            >
              <Image
                src={option.icon}
                width={30}
                height={30}
                alt={option.name}
              />
              <h2>{option.name}</h2>
            </div>
          ))}
        </div>

        {meetingEvent.locationType && (
          <>
            <h2 className="font-bold">Add {meetingEvent.locationType} Url *</h2>
            <Input
              placeholder="Add Url"
              onChange={(event) =>
                setPartialMeetingEvent({ locationUrl: event.target.value })
              }
            />
          </>
        )}
        <h2 className="font-bold">Select Theme Color</h2>
        <div className="flex justify-evenly flex-wrap">
          {themeColors.map((color, index) => (
            <div
              key={index}
              className={cn(`size-9 rounded-full`, {
                "border-4 border-foreground": meetingEvent.themeColor == color,
              })}
              style={{ backgroundColor: color }}
              onClick={() => setPartialMeetingEvent({ themeColor: color })}
            ></div>
          ))}
        </div>
      </div>

      <Button
        className="w-full mt-9"
        disabled={!meetingEvent.eventName || !meetingEvent.locationUrl}
        onClick={() => onCreateClick()}
      >
        Create
      </Button>
    </div>
  );
}

export default MeetingForm;
