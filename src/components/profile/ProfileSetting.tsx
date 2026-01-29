"use client";

import { useState } from "react";
import Image from "next/image";
import profileData from "@/data/profileDetails.json";
import ProfileInfoTab from "./ProfileInfoTab";
import SocialTab from "./SocialTab";
import SecurityTab from "./SecurityTab";
import NotificationsTab from "./NotificationsTab";
import { Button } from "../ui/Button";

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("Profile");
  const { header } = profileData;

  const tabs = ["Profile", "Social Profiles", "Security", "Notifications"];

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileInfoTab />;
      case "Social Profiles":
        return <SocialTab />;
      case "Security":
        return <SecurityTab />;
      case "Notifications":
        return <NotificationsTab />;
      default:
        return <ProfileInfoTab />;
    }
  };

  return (
    <div className="h-lvw bg-[#FFFFFF]">
      {/* 1. Header Section */}
      <div className="relative w-full">
        <div className=" group h-44 w-full bg-[#F2F9FE] overflow-hidden relative object-cover border-b border-t border-[#EBEBEB]">
          <Image
            src="/images/cover.png"
            alt="cover"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#111928]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
            <p className="text-white text-sm font-medium">
              Replace Cover Image
            </p>
            <div className="flex gap-3">
              <button className="px-3 py-1.5 bg-[#4157FE] text-white text-xs font-semibold rounded-lg hover:bg-[#3245d1] transition-colors">
                Replace Image
              </button>
              <button className="px-3 py-1.5 bg-transparent border border-white text-white text-xs font-semibold rounded-lg hover:bg-white/10 transition-colors">
                Remove
              </button>
            </div>
          </div>
        </div>

        {/* Profile Card Overlay */}
        <div className="mx-auto px-6 relative -mt-10 flex items-end justify-between">
          <div className="flex items-end gap-2">
            <div className="w-20 h-20 rounded-2xl bg-[#FDBF00] text-[#FFFFFF] flex items-center justify-center text-4xl font-bold  shadow-[0_3.2px_19.2px_0_rgba(255,159,0,0.38)] z-10">
              {header.avatarInitials}
            </div>
            <h1 className="text-sm font-semibold text-[#191F38] mb-3 ">
              {header.name}
            </h1>
          </div>
          <Button variant="success" size="md" className="mb-2">
            <Image
              src="/assets/edit-white.svg"
              alt="cover"
              width={14}
              height={14}
            />
            Edit
          </Button>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className=" mx-auto  mt-8 border-b border-[#EBEBEB]">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={` w-27.5 text-center px-1 py-3 text-xs font-medium -tracking-normal leading-4 transition-colors relative ${
                activeTab === tab
                  ? "text-[#4157FE] border-b border-[#4157FE]"
                  : "text-[#697588]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Main Content Area */}
      <div className=" mx-auto p-4  h-screen  bg-[#FFFFFF]">
        {renderContent()}
      </div>
    </div>
  );
}
