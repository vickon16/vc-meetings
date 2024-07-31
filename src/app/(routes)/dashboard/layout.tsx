import React, { PropsWithChildren } from "react";
import SideNavBar from "./_components/SideNavBar";
import DashboardHeader from "./_components/DashboardHeader";

function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      <div className="hidden md:block min-w-64 md:flex-[0.18] w-full bg-secondary/50 h-screen">
        <SideNavBar />
      </div>
      <div className="md:flex-[0.82] w-full">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
