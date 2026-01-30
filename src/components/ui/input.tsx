import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "flex w-full rounded-md font-medium leading-5 tracking-tighter transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border border-[#EBEBEB] bg-[#FFFFFF] text-[#9BA2AD] focus-visible:ring-[#EBEBEB]",
        outlined: "border-2 border-[#EBEBEB] bg-transparent text-gray-900 focus-visible:border-blue-500 focus-visible:ring-blue-500",
        ghost: "border-0 bg-transparent text-gray-900 focus-visible:bg-gray-100 focus-visible:ring-gray-200",
        filled: "border-0 bg-gray-100 text-gray-900 focus-visible:bg-gray-200 focus-visible:ring-gray-300",
      },
      size: {
        sm: "h-8 px-3 py-1.5 text-xs",
        default: "h-10 px-4 py-2 text-sm",
        lg: "h-12 px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    }
  }
);

export interface InputProps extends Omit<React.ComponentProps<"input">, "size">, VariantProps<typeof inputVariants> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, size, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariants({ variant, size }),
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
