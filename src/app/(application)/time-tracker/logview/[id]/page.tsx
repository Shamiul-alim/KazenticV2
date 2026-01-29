"use client";
import LogView from "@/components/time-tracker/logview/LogView";

import { useState } from "react";

export default function page() {
  const [view, setView] = useState<"list" | "detail">("list");
  return (
    <div>
      <LogView onBack={() => setView("list")} />
    </div>
  );
}
