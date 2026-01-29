"use client";
import RequestChangeDetailView from "@/components/time-tracker/requre-change/RequireChange";
import { useState } from "react";

export default function page() {
  const [view, setView] = useState<"list" | "detail">("list");
  return (
    <div>
      <RequestChangeDetailView onBack={() => setView("list")} />
    </div>
  );
}
