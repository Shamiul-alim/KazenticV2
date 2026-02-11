import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import navData from "@/data/projectNavbar.json";
import Image from "next/image";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavbarProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

export default function ProjectNavbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <nav className="flex items-center w-full h-8 bg-[#FFFFFF] border-b border-[#EBEBEB] overflow-x-auto hide-scrollbar flex-shrink-0">
      <div className="flex items-center">
        {navData.items.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "relative flex items-center gap-x-2 px-3 py-1.25 text-xs font-medium leading-5 tracking-tighter transition-colors whitespace-nowrap",
                isActive ? "text-[#4157FE]" : "text-[#697588]",
              )}
            >
              <Image
                src={`/assets/${isActive ? item.activeIcon : item.icon}`}
                alt={item.label}
                width={16}
                height={16}
              />
              <span>{item.label}</span>

              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4157FE]" />
              )}
            </button>
          );
        })}
      </div>

      <button className="flex items-center gap-x-1 px-3 text-xs font-medium leading-5 text-[#697588] tracking-tighter transition-colors hover:text-[#4157FE] whitespace-nowrap">
        <Image src="/assets/plus-gray.svg" alt="group" width={16} height={16} />
        <span>View</span>
      </button>
    </nav>
  );
}
