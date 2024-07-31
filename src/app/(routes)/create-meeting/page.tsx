import { db } from "@/lib/firebase-config";
import MeetingForm from "./_components/MeetingForm";
import PreviewMeeting from "./_components/PreviewMeeting";
import { doc, getDoc } from "firebase/firestore";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { TBusiness } from "@/lib/types";

async function CreateMeeting() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.email) return redirect("/");

  const docRef = doc(db, "Business", user.email);
  const docSnap = await getDoc(docRef);
  const businessInfo = docSnap.data() as TBusiness;
  if (!businessInfo) return redirect("/create-business");

  return (
    <div className="flex w-full md:flex-row flex-col">
      <div className="shadow-md h-screen bg-secondary/50 md:flex-[0.3]">
        <MeetingForm />
      </div>
      <div className="md:flex-[0.7] w-full">
        <PreviewMeeting businessName={businessInfo.businessName} />
      </div>
    </div>
  );
}

export default CreateMeeting;
