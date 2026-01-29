"use client";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "../../ui/Button";

interface RequestChangeProps {
  onClose: () => void;
  name: string;
}

export default function RequestChange({ onClose, name }: RequestChangeProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-[60] animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center z-[70] pointer-events-none">
        <div className="w-[440px] bg-white rounded-lg border border-[#EBEBEB] pointer-events-auto animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-4">
            <h2 className="text-[18px] font-semibold text-[#191F38] tracking-tight">
              Request Changes
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full bg-[#EEF2FF] text-[#4157FE] hover:bg-[#E0E7FF] transition-colors"
            >
              <X size={16} strokeWidth={3} />
            </button>
          </div>

          {/* Body */}
          <div className="px-4 py-4">
            <p className="text-[14px] leading-[1.4] text-[#64748B] font-medium tracking-tight">
              Time entries for this period will be unlocked, and{" "}
              <span className="">{name}</span> will get notified to make and
              resubmit changes.
            </p>
          </div>

          {/* Footer */}
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
    </>
  );
}
