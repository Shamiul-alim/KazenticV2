"use client";

import React from "react";
import { User, Briefcase, Mail, Phone, UserPlus } from "lucide-react";
import Card from "@/components/ui/card2";

import { defaultUserInfo } from "@/data/payroll-data";

const UserInfoItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-4">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F2F9FE]">
      <Icon className="h-5 w-5 text-[#2563EB]" />
    </div>
    <div>
      <p className="text-xs font-medium text-[#000000]">{label}</p>
      <p className="text-sm font-semibold text-[#717680]">{value}</p>
    </div>
  </div>
);

export function UserInfoCard() {
  return (
    <Card
      title="User Information"
      extra={
        <div className="flex items-center gap-2 rounded-full bg-[#F2F9FE] px-3 py-1">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2563EB] text-[10px] text-white">
            {defaultUserInfo.firstName.charAt(0)}
          </div>
          <span className="text-xs font-medium text-[#191F38]">
            {defaultUserInfo.firstName} {defaultUserInfo.lastName}
          </span>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2">
        <UserInfoItem
          icon={User}
          label="First Name"
          value={defaultUserInfo.firstName}
        />
        <UserInfoItem
          icon={User}
          label="Last Name"
          value={defaultUserInfo.lastName}
        />
        <UserInfoItem
          icon={Briefcase}
          label="Designation"
          value={defaultUserInfo.designation}
        />
        <UserInfoItem
          icon={UserPlus}
          label="Position"
          value={defaultUserInfo.position}
        />
        <UserInfoItem icon={Mail} label="Email" value={defaultUserInfo.email} />
        <UserInfoItem
          icon={Phone}
          label="Phone"
          value={defaultUserInfo.phone}
        />
      </div>
    </Card>
  );
}
