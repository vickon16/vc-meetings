import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        background: "bg-background text-foreground hover:bg-background/90",
        foreground: "bg-foreground text-background hover:bg-foreground/90",
        emerald: "bg-emerald-600 text-foreground hover:bg-emerald-600/90",
        destructive: "bg-red-600 text-white hover:bg-red-600/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        card: "bg-card text-card-foreground hover:bg-card/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "bg-transparent hover:bg-accent hover:text-accent-foreground",
        link: "text-muted-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-5 py-3",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-6 text-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      isLoading,
      disabled,
      icon: Icon,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          "flex items-center gap-1",
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        disabled={disabled || isLoading || false}
        {...props}
      >
        {!!isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {!!Icon && Icon}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
