"use client";

import { useState } from "react";
import ProjectDetails from "@/components/project/projectDetails/ProjectDetails";
import ProjectNavbar from "@/components/project/projectDetails/ProjectNavbar";
import ProjectDashboard from "@/components/project/projectDetails/ProjectDashboard";

export default function Page() {
  const [activeSection, setActiveSection] = useState("overview");

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <ProjectDetails />;
      case "dashboard":
        return <ProjectDashboard />;
      default:
        return (
          <div className="p-6 text-gray-400">
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}{" "}
            view coming soon...
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <ProjectNavbar activeTab={activeSection} onTabChange={setActiveSection} />
      <main>{renderContent()}</main>
    </div>
  );
}
