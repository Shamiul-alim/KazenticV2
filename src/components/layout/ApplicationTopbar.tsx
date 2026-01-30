'use client';

import { ChevronDown, LayoutDashboardIcon } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import PlayCircleIcon from "../sprint-overview/icons/play-circle";
import PlayOutlineIcon from "../icons/play-outline";
import { SprintSelectPopover } from "../sprint-overview/custom/sprint-select/sprint-select-popover";
import { SPRINTS_MOCK_DATA } from "@/data/sprint-data";

export default function ApplicationTopbar() {
  const router = useRouter();
  const pathname = usePathname();

  const renderBreadcrumbs = () => {
    switch (pathname) {
      case `/sprint-overview/${pathname.split('/')[2]}`:
        return <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/sprint-overview/1">
                <div className="flex items-center gap-2 text-gray-500">
                  <PlayOutlineIcon className="w-4 h-4 text-[#697588] stroke-[#697588]" />
                  <span className="text-xs font-medium leading-4 tracking-tighter text-[#697588]">
                    Sprints
                  </span>
                </div>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>|</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="flex flex-row gap-2">
                <LayoutDashboardIcon className="w-4 h-4 text-[#697588]" />
                Sprint Category
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator>|</BreadcrumbSeparator>
            <BreadcrumbItem>
              <SprintSelectPopover value={pathname.split('/')[2]} sprints={SPRINTS_MOCK_DATA} onChange={(sprintId) => {
                router.push(`/sprint-overview/${sprintId}`);
              }}>
                <BreadcrumbPage className="flex flex-row gap-2">
                  <PlayCircleIcon className="w-4 h-4 stroke-muted" />
                  {
                    `${SPRINTS_MOCK_DATA.find(sprint => sprint.id === pathname.split('/')[2])?.name} 
                    (${SPRINTS_MOCK_DATA.find(sprint => sprint.id === pathname.split('/')[2])?.range} )`
                  }
                  <ChevronDown size={14} className="text-gray-400" />
                </BreadcrumbPage>
              </SprintSelectPopover>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      case `/tasks/${pathname.split('/')[2]}`:
        return <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/tasks">
                <div className="flex items-center gap-2 text-gray-500">
                  <PlayOutlineIcon className="w-4 h-4 text-[#697588] stroke-[#697588]" />
                  <span className="text-xs font-medium leading-4 tracking-tighter text-[#697588]">
                    Tasks
                  </span>
                </div>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      default:
        break;
    }
  }

  return (
    <header className="flex h-[2.188rem] w-full items-center bg-[#FFFFFF] py-4 px-3">
      <div className="flex items-center gap-1">
        {/* Workspace Switcher */}
        <button className="group flex items-center gap-2 rounded-md p-1 transition-colors hover:bg-gray-50 cursor-pointer">
          <Image
            src="/assets/K-fill.svg"
            alt="kazentic-logo"
            width={16}
            height={16}
          />
          <span className="text-xs leading-4 tracking-tighter font-semibold text-[#191F38]">
            Kazentic
          </span>
          <ChevronDown
            size={14}
            className="text-gray-400 group-hover:text-gray-600"
          />
        </button>

        {/* Vertical Separator */}
        <div className="h-4 w-[0.1rem] bg-gray-300 mx-1" aria-hidden="true" />

        {/* Breadcrumb Section */}
        {renderBreadcrumbs()}
      </div>
    </header>
  );
}
