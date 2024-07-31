import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { Clock, Copy, MapPin, Pen, Settings, Trash } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { db } from "@/lib/firebase-config";
import { TBusiness, TMeetingEvent } from "@/lib/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import MeetingTypeClient from "./_meeting-type-client";

async function MeetingType() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.email) return redirect("/");

  const q = query(
    collection(db, "MeetingEvent"),
    where("createdBy", "==", user?.email),
    orderBy("id", "desc")
  );
  const querySnapshot = await getDocs(q);

  let eventList: TMeetingEvent[] = [];
  querySnapshot.forEach((doc) => {
    const newEvent = doc.data() as TMeetingEvent;
    const newSafeEvent = {
      ...newEvent,
      businessId: !!newEvent.businessId
        ? JSON.stringify(newEvent.businessId)
        : "",
    };
    eventList.push(newSafeEvent);
  });

  const docRef = doc(db, "Business", user.email);
  const docSnap = await getDoc(docRef);
  const businessInfo = docSnap.data() as TBusiness;
  if (!businessInfo) return redirect("/create-business");

  return (
    <div className="p-5">
      <div className="flex flex-col gap-5">
        <h2 className="font-bold text-3xl">Meeting Event Type</h2>
        <Input placeholder="Search" className="max-w-xs " />
        <hr></hr>
      </div>

      <MeetingTypeClient eventList={eventList} businessInfo={businessInfo} />
    </div>
  );
}

export default MeetingType;
