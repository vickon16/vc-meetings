import { Toaster } from "@/components/ui/sonner";
import { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default Providers;
