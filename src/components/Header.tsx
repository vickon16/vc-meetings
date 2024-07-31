"use client";

import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

const headerLinksClass =
  "hover:text-primary transition-all duration-300 cursor-pointer";

function Header() {
  return (
    <div className="flex items-center justify-between p-5 shadow-border/50 shadow-sm">
      <h2 className="text-clampBase font-bold text-primary">VC-Meetings</h2>
      <ul className="hidden md:flex gap-14 font-medium text-clampMd">
        <li className={headerLinksClass}>Product</li>
        <li className={headerLinksClass}>Pricing</li>
        <li className={headerLinksClass}>Contact us</li>
        <li className={headerLinksClass}>About Us</li>
      </ul>
      <div className="flex gap-4">
        <LoginLink>
          <Button variant="ghost">Login</Button>
        </LoginLink>
        <RegisterLink className="hidden xs:block">
          <Button>Get Started</Button>
        </RegisterLink>
      </div>
    </div>
  );
}

export default Header;
