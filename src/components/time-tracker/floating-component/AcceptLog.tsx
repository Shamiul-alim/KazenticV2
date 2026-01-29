"use client";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import Image from "next/image";

interface AcceptLogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

export default function AcceptLog({
  isOpen,
  onClose,
  onConfirm,
  userName,
}: AcceptLogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 ">
      <div className="w-[440px] bg-white rounded-lg border border-[#EBEBEB] pointer-events-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4">
          <h2 className="text-[18px] font-semibold text-[#191F38] tracking-tight leading-6">
            Approve Time Log?
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-[#EEF2FF] text-[#4157FE] hover:bg-[#E0E7FF] transition-colors"
          >
            <X size={16} strokeWidth={3} />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 py-4">
          <p className="text-[14px] leading-5 text-[#697588] font-normal">
            {userName} will get notified and all time entries will be locked and
            approved.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 px-6 pb-6 mt-2">
          <Button
            variant="outline"
            className="border-[#4157FE] text-[#4157FE] px-6 h-9 text-[13px] font-semibold hover:bg-blue-50"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button className="bg-[#4157FE] text-white px-6 h-9 text-[13px] font-semibold hover:bg-[#3649D1]">
            Request
          </Button>
        </div>
      </div>
    </div>
  );
}
