"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { db } from "@/lib/firebase-config";
import { TBusiness, TMeetingEvent } from "@/lib/types";
import { deleteDoc, doc } from "firebase/firestore";
import { Clock, Copy, MapPin, Pen, Settings, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  eventList: TMeetingEvent[];
  businessInfo: TBusiness;
};

function MeetingTypeClient({ businessInfo, eventList }: Props) {
  const router = useRouter();

  const onDeleteMeetingEvent = async (event: TMeetingEvent) => {
    await deleteDoc(doc(db, "MeetingEvent", event?.id)).then((resp) => {
      toast("Meeting Event Deleted!");
      router.refresh();
    });
  };

  const onCopyClickHandler = (event: TMeetingEvent) => {
    const meetingEventUrl =
      process.env.NEXT_PUBLIC_BASE_URL +
      "/" +
      businessInfo.businessName +
      "/" +
      event.id;
    navigator.clipboard.writeText(meetingEventUrl);
    toast("Copied to Clicpboard");
  };

  return !!eventList.length ? (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {eventList?.map((event, index) => (
        <div
          key={index}
          className="border shadow-md  border-t-8 rounded-lg p-5 flex flex-col gap-4"
          style={{ borderTopColor: event?.themeColor }}
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-medium text-xl">{event?.eventName}</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Settings className="cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="flex gap-2">
                  <Pen /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex gap-2"
                  onClick={() => onDeleteMeetingEvent(event)}
                >
                  <Trash /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex justify-between">
            <h2 className="flex gap-2 text-muted-foreground">
              <Clock /> {event.duration} Min{" "}
            </h2>
            <h2 className="flex gap-2 text-muted-foreground">
              <MapPin /> {event.locationType}
            </h2>
          </div>
          <hr></hr>
          <div className="flex justify-between">
            <h2
              className="flex gap-2 text-sm text-primary items-center cursor-pointer"
              onClick={() => {
                onCopyClickHandler(event);
              }}
            >
              <Copy className="h-4 w-4" /> Copy Link{" "}
            </h2>
            <Button
              variant="outline"
              className="rounded-full text-primary border-primary "
            >
              Share
            </Button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center min-h-[30dvh] justify-center gap-5 w-full">
      <p className="text-muted-foreground"> No Meeting Events Yet</p>
    </div>
  );
}

export default MeetingTypeClient;
