"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";

const heroImages = [
  { id: "1", src: "/profile1.png", style: "right-36" },
  { id: "2", src: "/profile2.png", style: "top-48 left-16" },
  { id: "3", src: "/profile3.png", style: "bottom-20 left-36" },
  { id: "4", src: "/profile4.png", style: "right-16 bottom-20" },
];

function Hero() {
  return (
    <div className="flex flex-col items-center relative pt-20">
      {heroImages.map((heroImage) => (
        <div
          className={cn(
            "h-[100px] aspect-square rounded-full overflow-hidden -z-1 absolute hidden lg:block",
            heroImage.style
          )}
          key={heroImage.id}
        >
          <Image
            src={heroImage.src}
            alt="hero-image"
            fill
            className="h-full object-cover"
          />
        </div>
      ))}
      <div className="text-center max-w-3xl space-y-6">
        <h2 className="font-bold !text-clamp2Xl text-primary">
          Easy scheduling ahead
        </h2>
        <h2 className="text-xl mt-5 text-muted-foreground">
          VC-Meetings is your scheduling automation platform for eliminating the
          back-and-forth emails to find the perfect time — and so much more.
        </h2>
        <div className="flex gap-4 flex-col space-y-6">
          <div className="flex justify-center gap-8 flex-wrap">
            <RegisterLink>
              <Button className="p-7 flex gap-2">
                <Image src="/google.png" alt="google" width={30} height={30} />
                Sign up with Google
              </Button>
            </RegisterLink>
            <RegisterLink>
              <Button className="p-7 flex gap-2">
                <Image
                  src="/facebook.png"
                  alt="google"
                  width={30}
                  height={30}
                />
                Sign up with Facebook
              </Button>
            </RegisterLink>
          </div>
          <hr></hr>
          <RegisterLink>
            <h2>
              <span className="text-primary">Sign up Free with Email.</span> No
              Credit card required
            </h2>
          </RegisterLink>
        </div>
      </div>
    </div>
  );
}

export default Hero;
