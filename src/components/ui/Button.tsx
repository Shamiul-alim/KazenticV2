import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva("", {
  variants: {
    variant: {
      default: "bg-btn-primary text-btn-primary-foreground shadow-sm  hover:bg-btn-primary/90 rounded-md",
      destructive:
        "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      outline:
        "flex items-center gap-1 px-1.5 py-1 bg-[#FDFDFD] border border-[#EBEBEB] rounded-sm text-xs leading-3 tracking-tighter font-medium text-[#697588] cursor-pointer",
      secondary:
        "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
      success:
        "flex items-center gap-1 px-1.5 pr-2 py-1 bg-[#4157FE] rounded-sm text-xs leading-3 tracking-tighter font-medium text-[#FFFFFF] cursor-pointer",
      active:
        "flex items-center gap-1 px-[5.43px] h-5 bg-[#C4FFE2] border border-[#05966980] rounded-sm text-[11px] font-medium leading-4 tracking-tighter text-[#059669] cursor-pointer",
      type: "px-1.5 py-0.5 bg-[#F2F9FE] text-[#4157FE] rounded-sm border border-[#4157FE80] text-[11px] font-medium leading-4 tracking-tighter",
      inactive:
        "flex items-center gap-1 px-[5.43px] h-5 bg-[#EBEBEB] border border-[#69758880] rounded-md text-[11px] font-medium leading-4 tracking-tighter text-[#697588] cursor-pointer",
      transparent:
        "flex items-center gap-1 px-1.5 pr-2 py-1  rounded-lg text-xs leading-3 tracking-tighter font-medium text-[#4157FE] cursor-pointer",
      alert:
        "flex items-center gap-1 px-1.5 pr-2 py-1 bg-[#C3242A21] border border-[#DC262680] rounded-sm text-xs leading-3 tracking-tighter font-medium text-[#C3242A] cursor-pointer",
      pending:
        "flex items-center gap-1 px-1.5 pr-2 py-1 bg-[#FDBF0036] border border-[#92400E4D] rounded-sm text-xs leading-3 tracking-tighter font-medium text-[#92400E] cursor-pointer",
      progress:
        "flex items-center gap-1 px-1.5 pr-2 py-1 bg-[#F0E4FF] border border-[#722BCC80] rounded-sm text-xs leading-3 tracking-tighter font-medium text-[#722BCC] cursor-pointer",
    },
    size: {
      default: "px-1.5 py-1",
      sm: "px-1.5 py-0.5",
      md: "h-6 px-1.5",
      lg: "h-10 rounded-md px-8",
      icon: "h-9 w-9",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
