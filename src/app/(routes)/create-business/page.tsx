"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/firebase-config";
import { TBusiness } from "@/lib/types";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function CreateBusiness() {
  const [businessName, setBusinessName] = useState("");
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onCreateBusiness = async () => {
    if (!user || !user.email) return;
    setIsLoading(true);

    const newBusiness = {
      id: new Date().getTime().toString(),
      businessName: businessName.toLocaleLowerCase().replace(" ", "_"),
      email: user.email,
      userName: user.given_name + " " + (user?.family_name || ""),
      daysAvailable: [],
      startTime: "",
      endTime: "",
    } satisfies TBusiness;
    await setDoc(doc(db, "Business", user.email), newBusiness).then((resp) => {
      toast("New Business Created!");
      router.replace("/dashboard");
    });
    setIsLoading(false);
  };
  return (
    <div className="p-14 items-center flex flex-col gap-20 my-10">
      <h2 className="text-clampBase font-bold text-primary">VC-Meetings</h2>
      <div className="flex flex-col items-center gap-3 max-w-3xl">
        <h2 className="text-clampLg font-bold">
          What should we call your business?
        </h2>
        <p className="text-muted-foreground">
          You can always change this later from settings
        </p>
        <div className="w-full mt-6 space-y-4">
          <label className="text-primary">Business Name</label>
          <Input
            placeholder="e.g. Vickonary"
            className="h-12"
            onChange={(event) => setBusinessName(event.target.value)}
          />
          <Button
            className="w-full"
            size="lg"
            disabled={!businessName}
            isLoading={isLoading}
            onClick={onCreateBusiness}
          >
            Create Business
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateBusiness;
