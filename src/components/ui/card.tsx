// components/ui/Card.tsx

import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  extra?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  extra,
  className = "",
}) => (
  <div
    className={`bg-[#FDFDFD] border border-[#EBEBEB] rounded-3xl p-4 ${className}`}
  >
    {(title || extra) && (
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[14px] font-semibold text-[#191F38] leading-6 tracking-tighter">
          {title}
        </h2>
        {extra}
      </div>
    )}
    {children}
  </div>
);

export default Card;
