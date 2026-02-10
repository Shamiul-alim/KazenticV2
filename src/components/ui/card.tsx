import * as React from "react"

import { cn } from "@/lib/utils"

interface CardProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  title?: string;
  extra?: React.ReactNode;
  className?: string;
  variant?: "default" | "dashboard";
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  extra,
  className = "",
  variant = "default",
}) => {
  const isDashboard = variant === "dashboard";
  return (
    <div
      className={`bg-[#FDFDFD] border border-[#EBEBEB] rounded-3xl  ${className}`}
    >
      {(title || extra) && (
        <div
          className={`flex justify-between items-center p-4 ${isDashboard
            ? "bg-[#F2F9FE] border-b rounded-tl-3xl rounded-tr-3xl border-[#EBEBEB]"
            : "bg-transparent"
            }`}
        >
          <h2 className="text-[14px] font-semibold text-[#191F38] leading-6 -tracking-normal">
            {title}
          </h2>
          {extra}
        </div>
      )}
      <div className="px-3.5 py-3.5">{children}</div>
    </div>
  );
};

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-base leading-snug font-medium group-data-[size=sm]/card:text-sm", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 group-data-[size=sm]/card:px-3", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("bg-muted/50 rounded-b-xl border-t p-4 group-data-[size=sm]/card:p-3 flex items-center", className)}
      {...props}
    />
  )
}

export default Card;

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
