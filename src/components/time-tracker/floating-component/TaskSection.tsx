"use client";
import React, { useEffect, useRef } from "react";
import {
  SortAsc,
  ArrowLeftToLine,
  ArrowRightToLine,
  Pin,
  EyeOff,
} from "lucide-react";

interface TaskSectionProps {
  isOpen: boolean;
  onClose: () => void;
  anchorPoint: { x: number; y: number };
}

export default function TaskSection({
  isOpen,
  onClose,
  anchorPoint,
}: TaskSectionProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const menuItems = [
    { label: "Sort", icon: <SortAsc size={16} /> },
    { label: "Insert Left", icon: <ArrowLeftToLine size={16} /> },
    { label: "Insert Right", icon: <ArrowRightToLine size={16} /> },
    { label: "Pin Column", icon: <Pin size={16} /> },
    { label: "Hide Column", icon: <EyeOff size={16} /> },
  ];

  return (
    <div
      ref={menuRef}
      style={{ top: anchorPoint.y, left: anchorPoint.x }}
      className="fixed z-50 w-48 bg-white border border-[#EBEBEB] rounded-lg shadow-xl animate-in fade-in zoom-in duration-100"
    >
      {menuItems.map((item, idx) => (
        <button
          key={idx}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] rounded-lg text-[#64748B] hover:bg-[#F8FAFF] hover:text-[#4157FE] transition-colors group"
          onClick={() => {
            console.log(`${item.label} clicked`);
            onClose();
          }}
        >
          <span className="text-[#94A3B8]  group-hover:text-[#4157FE]">
            {item.icon}
          </span>
          <span className="font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
