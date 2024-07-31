"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/firebase-config";
import { TBusiness } from "@/lib/types";
import { availableDaysList } from "@/lib/utils";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  businessInfo: TBusiness;
};

function AvailabilityClient({ businessInfo }: Props) {
  const [daysAvailable, setDaysAvailable] = useState(
    availableDaysList.map((item) => ({
      ...item,
      available: !!businessInfo.daysAvailable.includes(item.day),
    }))
  );
  const [startTime, setStartTime] = useState(businessInfo.startTime);
  const [endTime, setEndTime] = useState(businessInfo.endTime);
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  const handleSave = async () => {
    if (!user || !user.email) return;
    toast.loading("Updating...", { id: "update-business" });

    const docRef = doc(db, "Business", user?.email);
    const updateData: Partial<TBusiness> = {
      daysAvailable: daysAvailable
        .filter((item) => !!item.available)
        .map((item) => item.day),
      startTime: startTime,
      endTime: endTime,
    };

    await updateDoc(docRef, updateData);
    router.refresh();
    toast.success("Change Updated !", { id: "update-business" });
  };

  return (
    <>
      <div>
        <h2 className="font-bold">Availability Days</h2>
        <div className="flex items-center gap-6 my-3">
          {daysAvailable.map((item, index) => (
            <div
              key={index}
              className="flex gap-2 items-center border py-2 px-6 rounded-sm"
            >
              <Checkbox
                checked={item.available}
                onCheckedChange={(value) => {
                  setDaysAvailable((prev) =>
                    prev.map((prevItem) =>
                      prevItem.day == item.day
                        ? { ...prevItem, available: Boolean(value) }
                        : prevItem
                    )
                  );
                }}
              />
              <h2 className="text-clampMd">{item.day}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-bold mt-10">Availability Time</h2>
        <div className="flex gap-10">
          <div className="mt-3 space-y-1">
            <h2>Start Time</h2>
            <Input
              type="time"
              defaultValue={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="mt-3 space-y-1">
            <h2>End Time</h2>
            <Input
              type="time"
              defaultValue={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Button className="mt-10" onClick={handleSave}>
        Save
      </Button>
    </>
  );
}

export default AvailabilityClient;
