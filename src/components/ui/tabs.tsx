"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

const tabsListVariants = cva(
  "inline-flex items-center justify-center text-sm",
  {
    variants: {
      variant: {
        default:
          "h-9 rounded-lg bg-muted p-1 text-muted-foreground",

        line:
          "h-auto w-full justify-start gap-2 border-b border-b-border bg-transparent p-0 text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    data-variant={variant}
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // base
      "relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",

      // DEFAULT
      "data-[state=active]:bg-transparent data-[state=active]:text-primary-dashboard data-[state=active]:border-b-2 data-[state=active]:border-primary-dashboard",
      "px-3 py-1",

      // LINE
      "group-data-[variant=line]:rounded-none group-data-[variant=line]:px-0 group-data-[variant=line]:pb-3",
      "group-data-[variant=line]:text-muted-foreground group-data-[variant=line]:data-[state=active]:text-primary",

      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
