"use client";
import PendingDetailView from "@/components/time-tracker/Pending";
import { useState } from "react";

export default function page() {
  const [view, setView] = useState<"list" | "detail">("list");
  return (
    <div>
      <PendingDetailView onBack={() => setView("list")} />
    </div>
  );
}
