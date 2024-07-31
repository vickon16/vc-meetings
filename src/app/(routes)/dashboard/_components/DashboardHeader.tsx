"use client";

import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function DashboardHeader() {
  const { user } = useKindeBrowserClient();

  return !user ? null : (
    <div className="p-4 px-10 flex items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2">
          <Image
            src={user?.picture || "/profile-placeholder.png"}
            alt="logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <ChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>

          <DropdownMenuItem>
            <LogoutLink>Logout</LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DashboardHeader;
