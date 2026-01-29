"use client";
import Approve from "@/components/time-tracker/approve/Approve";
import { useState } from "react";

export default function page() {
  const [view, setView] = useState<"list" | "detail">("list");
  return (
    <div>
      <Approve onBack={() => setView("list")} />
    </div>
  );
}
