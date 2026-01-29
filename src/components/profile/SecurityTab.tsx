"use client";
import { useState } from "react";
import profileData from "@/data/profileDetails.json";
import Image from "next/image";
import { Switch2 } from "../ui/switch2";
import Enable2FAModal from "./Enable2FAModal";
import ChangePasswordModal from "./ChangePasswordModal";

const SecurityItem = ({ title, desc, status, enabled, onClick }: any) => (
  <div
    onClick={onClick}
    className="bg-[#FFFFFF] border border-[#EBEBEB] rounded-md p-4 flex items-center justify-between mb-4 cursor-pointer"
  >
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 mb-1">
        <h4 className="font-semibold text-xs text-[#191F38] leading-6 -tracking-tight">
          {title}
        </h4>
        {status === "Not registered" && (
          <span className="bg-[#FFE0EB] text-[#C81C57] text-[11px] px-1.5 py-0.5 rounded-sm border border-[#C81C5780] flex items-center gap-1">
            <Image
              src="/assets/close-circle.svg"
              alt="cover"
              width={14}
              height={14}
            />{" "}
            Not registered
          </span>
        )}
        {status === "Disabled" && (
          <span className="bg-[#EBEBEB] text-[#697588] text-[11px] px-1.5 py-0.5 rounded-sm border border-[#69758880] flex items-center gap-1">
            <Image
              src="/assets/info-circle.svg"
              alt="cover"
              width={14}
              height={14}
            />{" "}
            Disabled
          </span>
        )}
      </div>
      <p className="text-[10px] font-medium text-[#697588] leading-5 -tracking-tight">
        {desc}
      </p>
    </div>
    <Switch2 disabled={enabled} />
  </div>
);

export default function SecurityTab() {
  const { security } = profileData;
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <div className="bg-[#FDFDFD] rounded-md border border-[#EBEBEB] px-4 py-4">
      <div className="flex items-start gap-3 mb-8">
        <div className="w-11 h-11 rounded-md bg-[#F2F9FE] flex items-center justify-center border border-[#4157FE33]">
          <Image
            src="/assets/security-user-blue.svg"
            alt="cover"
            width={24}
            height={24}
          />
        </div>
        <div className="flex flex-col justify-center pt-1">
          <h3 className="text-sm font-semibold text-[#191F38] leading-5 -tracking-tight">
            Security
          </h3>
          <p className="text-xs leading-5 -tracking-tight text-[#697588]">
            {security.personal.description}
          </p>
        </div>
      </div>

      <SecurityItem
        {...security.authenticator}
        onClick={() => setIs2FAModalOpen(true)}
      />
      <SecurityItem {...security.emailVer} />
      <SecurityItem {...security.smsVer} />

      {/* Password Section */}
      <div
        onClick={() => setIsPasswordModalOpen(true)}
        className="bg-[#FDFDFD] rounded-md border border-[#EBEBEB] px-4 py-4 flex items-center justify-between mb-4 mt-4"
      >
        <div>
          <h4 className="font-semibold text-xs text-[#191F38] leading-6 -tracking-tight">
            Password
          </h4>
          <div className="flex items-center text-[#697588] text-[10px] leading-5 -tracking-tight gap-1.5">
            {security.password.password}
            <Image
              src="/assets/eye.svg"
              alt="cover"
              width={12}
              height={12}
              className="flex justify-center items-center"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] leading-5 -tracking-tight text-[#697588]">
          Last changed {security.password.lastChanged}
          <Image
            src="/assets/arrow-up-right.svg"
            alt="cover"
            width={24}
            height={24}
          />
        </div>
      </div>

      {/* Log out section */}
      <div className="bg-[#FDFDFD] rounded-md border border-[#EBEBEB] px-4 py-4 flex items-center justify-between mb-4 mt-4">
        <div>
          <h4 className="font-semibold text-xs text-[#191F38] leading-6 -tracking-tight">
            Log out of all devices
          </h4>
          <p className="text-[11px] text-[#697588] leading-3.5 -tracking-tight">
            Sign out from all devices.
          </p>
        </div>
        <button className="flex items-center  text-[#DC2626] border border-[#EBEBEB] px-2 py-0.5 leading-5 tracking-tight rounded-lg text-[12px] font-medium hover:bg-red-50 gap-1">
          <Image src="/assets/logout.svg" alt="cover" width={12} height={12} />
          Log out all
        </button>
      </div>
      <Enable2FAModal
        isOpen={is2FAModalOpen}
        onClose={() => setIs2FAModalOpen(false)}
      />
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
}
