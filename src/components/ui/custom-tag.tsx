import { X } from "lucide-react";

export const CustomTag = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-1 px-2  border border-[#EBEBEB] rounded-sm bg-white text-[11px] text-[#697588]">
    {children}
    <X
      size={14}
      className="cursor-pointer text-[#9CA3AF] hover:text-[#191F38]"
    />
  </div>
);
