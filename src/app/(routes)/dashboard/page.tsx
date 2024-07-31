import { db } from "@/lib/firebase-config";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { doc, getDoc } from "firebase/firestore";
import { redirect } from "next/navigation";

async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.email) redirect("/");
  const docRef = doc(db, "Business", user.email);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return redirect("/create-business");
  }

  return redirect("/dashboard/meeting-type");
}

export default Dashboard;
