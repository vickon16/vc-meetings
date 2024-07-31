import { db } from "@/lib/firebase-config";
import { TBusiness } from "@/lib/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { doc, getDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import AvailabilityClient from "./_availability-client";

async function Availability() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.email) return redirect("/");

  const docRef = doc(db, "Business", user.email);
  const docSnap = await getDoc(docRef);
  const businessInfo = docSnap.data() as TBusiness;
  if (!businessInfo) return redirect("/create-business");

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Availability</h2>
      <hr className="my-7"></hr>

      <AvailabilityClient businessInfo={businessInfo} />
    </div>
  );
}

export default Availability;
