"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const checkboxVariants = cva("", {
  variants: {
    variant: {
      default: "",
    },
    size: {
      default: "size-4",
      sm: "size-3.5",
      lg: "size-5",
      xs: "size-2.5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  VariantProps<typeof checkboxVariants> { }

const checkIconSizeByVariant: Record<
  NonNullable<CheckboxProps["size"]>,
  number
> = {
  xs: 8,
  sm: 10,
  default: 12,
  lg: 14,
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant, size, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "grid place-content-center peer shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      checkboxVariants({ variant, size, className }),
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("grid place-content-center text-current")}
    >
      <Check size={checkIconSizeByVariant[size ?? "default"]} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
