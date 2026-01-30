import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  extra?: React.ReactNode;
  className?: string;
  variant?: "default" | "dashboard";
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  extra,
  className = "",
  variant = "default",
}) => {
  const isDashboard = variant === "dashboard";
  return (
    <div
      className={`bg-[#FDFDFD] border border-[#EBEBEB] rounded-3xl  ${className}`}
    >
      {(title || extra) && (
        <div
          className={`flex justify-between items-center p-4 ${isDashboard
            ? "bg-[#F2F9FE] border-b rounded-tl-3xl rounded-tr-3xl border-[#EBEBEB]"
            : "bg-transparent"
            }`}
        >
          <h2 className="text-[14px] font-semibold text-[#191F38] leading-6 -tracking-normal">
            {title}
          </h2>
          {extra}
        </div>
      )}
      <div className="px-3.5 py-3.5">{children}</div>
    </div>
  );
};

export default Card;
