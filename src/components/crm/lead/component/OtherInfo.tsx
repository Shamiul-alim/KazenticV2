import React from "react";
import Image from "next/image";
import leadsData from "@/data/crm/lead/leads-data.json";
import {
  User,
  Tag as TagIcon,
  Flag,
  Facebook,
  Linkedin,
  Send,
  MessageSquare,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CustomTag } from "@/components/ui/custom-tag";

// Custom X icon to match branding
const XIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4l16 16m0-16L4 20" />
  </svg>
);

const OtherInfo = () => {
  const { otherInfo } = leadsData.leadDetails;

  const sections = [
    {
      label: "Owner",
      icon: User,
      customContent: (
        <div className="flex items-center gap-2 mt-1">
          <Avatar className="w-6 h-6">
            <AvatarImage src={otherInfo.owner.avatar} />
            <AvatarFallback>AW</AvatarFallback>
          </Avatar>
          <span className="text-[12px] text-[#697588]">
            {otherInfo.owner.name}
          </span>
        </div>
      ),
    },
    {
      label: "Tags",
      icon: TagIcon,
      customContent: (
        <div className="flex flex-wrap gap-1">
          {otherInfo.tags.map((tag, i) => (
            <CustomTag key={i}>{tag}</CustomTag>
          ))}
        </div>
      ),
    },
    {
      label: "Priority",
      icon: Flag,
      value: otherInfo.priority,
    },
    {
      label: "Facebook",
      icon: Facebook,
      value: otherInfo.socials.facebook,
    },
    {
      label: "Linkedin",
      icon: Linkedin,
      value: otherInfo.socials.linkedin,
    },
    {
      label: "X",
      icon: XIcon,
      value: otherInfo.socials.x,
    },
    {
      label: "Telegram",
      icon: Send,
      value: otherInfo.socials.telegram,
    },
    {
      label: "Whatsapp",
      icon: MessageSquare,
      value: otherInfo.socials.whatsapp,
    },
  ];

  return (
    <div className="p-4 space-y-5">
      {sections.map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="flex flex-col gap-2">
            {/* Header: Icon + Label */}
            <div className="flex items-center gap-1 text-[#191F38] font-semibold text-[12px]">
              <Icon size={16} strokeWidth={1.5} />
              <span>{item.label}</span>
            </div>

            {/* Value or Custom Content */}
            {item.customContent ? (
              item.customContent
            ) : (
              <p className="text-[12px] text-[#697588] pl-0">{item.value}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OtherInfo;
