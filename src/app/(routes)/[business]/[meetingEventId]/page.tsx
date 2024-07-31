import { db } from "@/lib/firebase-config";
import { TBusiness, TMeetingEvent } from "@/lib/types";
import {
  doc,
  getDocs,
  getDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
import { redirect } from "next/navigation";
import MeetingEventClient from "./_meetingEventClient";

type Props = {
  params: { business?: string; meetingEventId?: string };
};

async function SharedMeetingEvent({ params }: Props) {
  if (!params?.business || !params?.meetingEventId)
    return redirect("/dashboard");
  // get the business info
  const q = query(
    collection(db, "Business"),
    where("businessName", "==", params.business)
  );

  const docSnapBusiness = await getDocs(q);
  const businessInfo = docSnapBusiness.docs?.[0]?.data() as TBusiness;
  if (!businessInfo) return redirect("/create-business");

  // get the meeting event details
  const docRefMeetingEvent = doc(db, "MeetingEvent", params?.meetingEventId);
  const docSnapMeetingEvent = await getDoc(docRefMeetingEvent);
  const meetingEvent = docSnapMeetingEvent.data() as TMeetingEvent;
  if (!meetingEvent) return redirect("/create-meeting");
  const newMeetingEvent: TMeetingEvent = {
    ...meetingEvent,
    businessId: JSON.stringify(meetingEvent.businessId),
  };

  return (
    <div>
      <MeetingEventClient
        meetingEvent={newMeetingEvent}
        businessInfo={businessInfo}
      />
    </div>
  );
}

export default SharedMeetingEvent;
