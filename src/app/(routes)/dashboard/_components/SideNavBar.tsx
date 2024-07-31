"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Briefcase, Calendar, Clock, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  {
    id: 1,
    name: "Meeting Type",
    path: "/dashboard/meeting-type",
    icon: Briefcase,
  },
  {
    id: 2,
    name: "Scheduled Meeting",
    path: "/dashboard/scheduled-meeting",
    icon: Calendar,
  },
  {
    id: 3,
    name: "Availability",
    path: "/dashboard/availability",
    icon: Clock,
  },
  {
    id: 4,
    name: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];

function SideNavBar() {
  const pathname = usePathname();

  return (
    <div className="p-5 py-14">
      <h2 className="text-clampBase font-bold text-primary">VC-Meetings</h2>

      <Link
        href={"/create-meeting"}
        className={buttonVariants({
          className: "flex gap-2 w-full mt-7 !rounded-full",
        })}
      >
        <Plus /> Create
      </Link>

      <div className="mt-5 flex flex-col gap-3">
        {menu.map((item, index) => (
          <Link
            href={item.path}
            key={index}
            className={buttonVariants({
              variant: item.path === pathname ? "secondary" : "ghost",
              className: "flex gap-2 w-full items-center !justify-start h-12",
            })}
          >
            <item.icon /> {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideNavBar;
