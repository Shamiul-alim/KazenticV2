// components/ui/ProgressBar.tsx

import React from "react";

interface ProgressBarProps {
  percentage: number;
  colorClass: string;
  label: string;
  subLabel: string;
}

const Progressbar: React.FC<ProgressBarProps> = ({
  percentage,
  colorClass,
  label,
  subLabel,
}) => {
  const textColorClass = colorClass.replace("bg-", "text-");

  return (
    <div className="flex-1 p-4 border border-[#EBEBEB] rounded-3xl">
      <div className="flex flex-col gap-5">
        <span className="font-semibold text-[#191F38] tracking-tighter leading-4 text-xs">
          {label}
        </span>
        <span className="text-[#697588] text-[11px] font-semibold leading-6">
          {subLabel}
        </span>
      </div>
      <div className="flex flex-row gap-1 w-full">
        {/* Segmented Progress Bar */}
        <div className="flex items-center gap-0.75 h-4.5 w-full">
          {Array.from({ length: 30 }).map((_, i) => {
            const isActive = i < (percentage / 100) * 30;

            return (
              <div
                key={i}
                className={`h-full w-0.75 flex-1 rounded-full transition-colors duration-300 ${
                  isActive ? colorClass : "bg-[#6975882B]"
                }`}
              />
            );
          })}
        </div>
        <div
          className={`flex items-center font-semibold text-[12px] leading-3 ${textColorClass}`}
        >
          <span className={`text-${colorClass}`}>{percentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default Progressbar;
