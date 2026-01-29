"use client";
import Image from "next/image";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";

interface RequestFormProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function RequestForm({ isOpen, onClose }: RequestFormProps) {
  const router = useRouter();
  if (!isOpen) return null;

  return (
    <div className="fixed h-screen inset-0 z-50 flex items-center justify-center bg-black/20 ">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-115 rounded-xl shadow-xl p-4 relative animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[#191F38] text-sm leading-5  font-semibold tracking-tight">
            Send Time For Review
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#DBE9FF] text-[#4157FE] hover:bg-blue-200 transition-colors"
          >
            <Image src="/assets/cross.svg" alt="" width={10} height={10} />
          </button>
        </div>

        {/* Content Section */}
        <div className="">
          <label className="text-[#697588] text-[13px] leading-4.25 font-medium tracking-tight">
            Time Entries
          </label>

          {/* Time Entry Card */}
          <div
            onClick={() => router.push("/time-tracker/pending")}
            className="group  border border-[#EBEBEB] rounded-[8px] mt-2 px-2 py-3.5 flex items-center gap-4 relative overflow-hidden hover:border-[#4157FE] hover:bg-[#F8FAFF] cursor-pointer"
          >
            {/* Blue Left Accent */}
            <div className="absolute left-2 top-2 bottom-0 w-[2px] h-13 bg-[#4157FE]" />

            <div className="pl-3">
              <div className="text-[#191F38] text-[14px] font-medium leading-5 tracking-tight">
                8h 50m
              </div>
              <div className="text-[#697588] text-[11px] font-medium">
                Jan 8 - Jan 13, 2025
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-5">
          <Button
            variant="outline"
            size="lg"
            onClick={onClose}
            className="border-[1.5px] border-[#4157FE] text-[#4157FE]"
          >
            Cancel
          </Button>
          <Button variant="success" size="lg">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
