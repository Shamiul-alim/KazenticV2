"use client";
import { useEffect, useRef } from "react";

import Image from "next/image";
import { Check } from "lucide-react";

interface ThreeDotMenuProps {
  isOpen: boolean;
  onClose: () => void;
  anchorPoint: { x: number; y: number };
}

export default function ThreeDotMenu({
  isOpen,
  onClose,
  anchorPoint,
}: ThreeDotMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      style={{ top: anchorPoint.y, left: anchorPoint.x - 160 }}
      className="fixed z-100 w-46 bg-white border border-[#EBEBEB] rounded-lg shadow-xl  animate-in fade-in zoom-in-95 duration-100 text-xs font-medium tracking-tight leading-5 text-[#697588]"
    >
      <button className="group w-full flex items-center justify-between px-4 py-2.5 hover:bg-[#F2F9FE]  hover:text-[#4157FE] transition-colors rounded-tl-lg rounded-tr-lg">
        <div className="flex items-center gap-3">
          <div className="relative w-4 h-4">
            <Image
              src="/assets/arrow-circle-down.svg"
              alt=""
              fill
              className="opacity-100 group-hover:opacity-0 transition-opacity"
            />
            <Image
              src="/assets/arrow-circle-up.svg"
              alt=""
              fill
              className="opacity-0 group-hover:opacity-100 transition-opacity rotate-180"
            />
          </div>
          <span className="">Open Entry</span>
        </div>
        <Check size={16} />
      </button>

      <button className="group w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F2F9FE]  hover:text-[#4157FE] transition-colors">
        <div className="relative w-4 h-4">
          <Image
            src="/assets/calendar-normal.svg"
            alt=""
            fill
            className="opacity-100 group-hover:opacity-0 transition-opacity"
          />
          <Image
            src="/assets/calendar-blue.svg"
            alt=""
            fill
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>
        <span className="">Change Date</span>
      </button>

      <div className="h-px bg-[#EBEBEB] mx-2" />

      {/* Delete */}
      <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors rounded-bl-lg rounded-br-lg">
        <Image src="/assets/trash.svg" alt="" width={16} height={16} />
        <span className="text-[13px] font-medium text-[#DC2626]">Delete</span>
      </button>
    </div>
  );
}
