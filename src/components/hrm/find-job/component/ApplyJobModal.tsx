"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

interface ApplyJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: any;
}

export const ApplyJobModal = ({ isOpen, onClose, job }: ApplyJobModalProps) => {
  if (!isOpen || !job) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/2
    0"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg w-full max-w-[500px] shadow-xl animate-in fade-in zoom-in duration-200 px-4 py-3"
      >
        {/* Header */}
        <div className="flex items-center justify-between  ">
          <h2 className="text-sm font-bold text-[#191F38]">
            Apply to {job.title}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-[#EEF2FF] text-[#4157FE] hover:bg-[#E0E7FF] transition-colors"
          >
            <X size={16} strokeWidth={3} />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {/* Profile Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#191F38] ">
              Select your job profile
            </label>
            <Select defaultValue="tonmoy">
              <SelectTrigger className="h-[72px] border-[#EBEBEB] rounded-xl px-4 focus:ring-1 focus:ring-[#4157FE]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FDFDFD] overflow-hidden shrink-0">
                    <Image
                      src="/assets/profile.svg"
                      alt="Avatar"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-[#191F38]">
                      Tonmoy Asif
                    </p>
                    <p className="text-[11px] text-[#697588]">
                      Frontend Developer
                    </p>
                  </div>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tonmoy">Tonmoy Asif</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#191F38]">Contact Info</h3>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#191F38]">
                Email
              </label>
              <p className="text-xs text-[#697588]">tonmoy@deepchainlabs.com</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#191F38]">
                Mobile No.
              </label>
              <p className="text-xs text-[#697588]">+880182345960</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 p-5 ">
          <Button
            variant="outline"
            onClick={onClose}
            className="h-10 px-4 rounded-xl border-[#EBEBEB] text-[#4157FE] font-bold text-xs"
          >
            Cancel
          </Button>
          <Button
            className="h-10 px-4 rounded-xl bg-[#4157FE] text-white font-bold text-xs hover:bg-[#3346d6]"
            onClick={() => {
              alert("Application Submitted!");
              onClose();
            }}
          >
            Submit Application
          </Button>
        </div>
      </div>
    </div>
  );
};
