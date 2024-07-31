import { db } from "@/lib/firebase-config";
import { TBookingEvent } from "@/lib/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { redirect } from "next/navigation";
import ScheduledMeetingClient from "./_schedule-meeting-client";

async function ScheduledMeeting() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.email) redirect("/dashboard");
  const q = query(
    collection(db, "ScheduledMeetings"),
    where("businessEmail", "==", user.email)
  );
  const querySnapshot = await getDocs(q);

  let meetingList: TBookingEvent[] = [];
  querySnapshot.forEach((doc) => {
    meetingList.push(doc.data() as TBookingEvent);
  });

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Scheduled Meetings</h2>
      <hr className="my-5"></hr>

      <ScheduledMeetingClient meetingList={meetingList} />
    </div>
  );
}

export default ScheduledMeeting;
