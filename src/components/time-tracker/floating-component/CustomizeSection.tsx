"use client";
import { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CustomizeSectionProps {
  onClose: () => void;
}

export default function CustomizeSection({ onClose }: CustomizeSectionProps) {
  const [weeklyHours, setWeeklyHours] = useState(40);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const isInsideContainer = containerRef.current?.contains(target);
      const isInsidePortal = target.closest(
        "[data-radix-popper-content-wrapper]",
      );

      if (!isInsideContainer && !isInsidePortal) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const adjustHours = (amount: number) => {
    setWeeklyHours((prev) => Math.max(0, prev + amount));
  };

  return (
    <div
      ref={containerRef}
      className="absolute top-9 right-3 z-50 w-70 bg-white border border-[#EBEBEB] rounded-lg shadow-xl p-3 animate-in fade-in zoom-in-95 duration-200"
    >
      <div className="space-y-3 text-xs font-medium leading-5 tracking-tight text-[#191F38]">
        <div className="flex items-center justify-between">
          <span className="">My Capacity</span>
          <Select defaultValue="weekly">
            <SelectTrigger className="w-20 h-8 border-[#EBEBEB] text-[11px] font-medium text-[#697588] focus:ring-0">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="absolate right-7">
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center  justify-between">
          <span className="">Weekly Hours</span>
          <div className="flex w-20 items-center border border-[#EBEBEB] rounded-lg overflow-hidden h-8">
            <div className="px-3  text-[#64748B]  flex items-center bg-white h-full">
              {weeklyHours}h
            </div>
            <div className="flex flex-col">
              <button
                onClick={() => adjustHours(1)}
                className="flex-1 px-2 hover:bg-slate-502 flex items-center justify-center transition-colors"
              >
                <ChevronUp size={12} className="text-[#64748B]" />
              </button>
              <button
                onClick={() => adjustHours(-1)}
                className="flex-1 px-2 hover:bg-slate-50 flex items-center justify-center transition-colors"
              >
                <ChevronDown size={12} className="text-[#64748B]" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <Button
            variant="outline"
            size="lg"
            onClick={onClose}
            className="border-[1.5px] border-[#4157FE] text-[#4157FE]"
          >
            Reset
          </Button>
          <Button onClick={onClose} variant="success" size="lg">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
