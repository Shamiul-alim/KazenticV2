import Image from "next/image";
import leadsData from "@/data/crm/lead/leads-data.json";
import {
  Phone,
  MapPin,
  Calendar,
  Clock,
  Mail,
  Globe,
  Briefcase,
  DollarSign,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/Button";
import Notes from "../component/Notes";
import Calls from "../component/Calls";
import Files from "../component/File";
import Contacts from "../component/Contacts";
import Activities from "../component/Activites";
import OtherInfo from "../component/OtherInfo";

const LeadDetails = () => {
  const { leadDetails } = leadsData;

  const leadInfoItems = [
    {
      label: "Creation Date",
      value: leadDetails.info.creationDate,
      icon: Calendar,
      padded: false,
    },
    {
      label: "Last Modified",
      value: leadDetails.info.lastModified,
      icon: Clock,
      padded: true,
    },
    {
      label: "Secondary Email",
      value: leadDetails.info.secondaryEmail,
      icon: Mail,
      padded: true,
    },
    {
      label: "Secondary Phone",
      value: leadDetails.info.secondaryPhone,
      icon: Phone,
      padded: true,
    },
    {
      label: "Lead Source",
      value: leadDetails.info.leadSource,
      icon: Globe,
      padded: true,
    },
    {
      label: "Industry",
      value: leadDetails.info.industry,
      icon: Briefcase,
      padded: true,
    },
    {
      label: "Lead Value",
      value: leadDetails.info.leadValue,
      icon: DollarSign,
      padded: true,
    },
    {
      label: "Follow Up Date",
      value: leadDetails.info.followUpDate,
      icon: Calendar,
      padded: true,
    },
  ];

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 p-4 border-t border-[#EBEBEB]">
      <div className="w-full md:w-60 shrink-0 flex flex-col gap-6 bg-[#FDFDFD] border border-[#EBEBEB] rounded-lg p-0">
        <div className="flex flex-col items-center pt-8 pb-4">
          <div className="relative mb-3">
            <Avatar className="w-16 h-16">
              <Image
                src={leadDetails.profile.avatar}
                alt={leadDetails.profile.name}
                width={64}
                height={64}
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#10B981] border-2 border-white rounded-full"></span>
          </div>
          <h2 className="text-[16px] font-bold text-[#191F38] mb-1">
            {leadDetails.profile.name}
          </h2>
          <p className="text-[11px] text-[#697588] mb-4">
            {leadDetails.profile.email}
          </p>

          <div className="flex gap-3">
            <Button variant="outline" className="px-1.5 py-1.5">
              <Image src="/assets/call.svg" alt="" width={14} height={14} />
            </Button>
            <Button variant="outline">
              <Image src="/assets/location.svg" alt="" width={14} height={14} />
            </Button>
          </div>
        </div>

        {/* Sidebar Tabs */}
        <div className="w-full">
          <Tabs defaultValue="lead-info" className="w-full">
            <TabsList>
              <TabsTrigger value="lead-info">Lead Info</TabsTrigger>
              <TabsTrigger value="other-info">Other Info</TabsTrigger>
            </TabsList>

            <TabsContent value="lead-info" className=" m-0">
              <div className="p-4 space-y-5">
                {leadInfoItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div key={index} className="flex flex-col gap-2">
                      <div className="flex items-center gap-1 text-[#191F38] font-semibold text-[12px]">
                        <Icon size={12} strokeWidth={2.5} />
                        <span>{item.label}</span>
                      </div>

                      <p className="text-[11px] text-[#697588]">{item.value}</p>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            <TabsContent value="other-info" className=" m-0">
              <OtherInfo />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="bg-[#FFFFFF] border border-[#EBEBEB] rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-[#191F38] leading-6">
              Pipeline Status
            </h3>
            <Button variant="outline" size="md">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1"></span>
              Closed <ChevronDown size={12} className="ml-1 opacity-50" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-2 flex justify-center">
            {leadDetails.pipelineSteps.map((step, idx) => (
              <div
                key={idx}
                className={`
                            flex items-center gap-1.5 px-3 py-1.5 rounded border text-[11px] font-medium cursor-pointer transition-colors
                            ${
                              step.status === "current"
                                ? "bg-[#F2F9FE] border-[#4157FE4F] text-[#4157FE] shadow-lg"
                                : "bg-white border-[#EBEBEB] text-[#697588] hover:bg-gray-50"
                            }
                        `}
              >
                {step.status === "current" && <CheckCircle2 size={12} />}
                {step.status !== "current" && (
                  <CheckCircle2 size={12} className="text-[#E5E7EB]" />
                )}
                {step.label}
              </div>
            ))}
          </div>
        </div>

        {/* Main Tabs & Activities */}
        <div className="bg-[#FDFDFD] border border-[#EBEBEB] rounded-lg h-full flex flex-col">
          <Tabs defaultValue="activities" className="w-full">
            {/* Tab Header */}
            <div className="bg-[#FDFDFD] rounded-tl-lg rounded-tr-lg border-b border-[#EBEBEB] pt-3 ">
              <TabsList className="bg-transparent h-auto p-0 ">
                {["Activities", "Notes", "Calls", "Files", "Contacts"].map(
                  (tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab.toLowerCase()}
                      className="pb-2.5 px-15"
                    >
                      {tab}
                    </TabsTrigger>
                  ),
                )}
              </TabsList>
            </div>

            <TabsContent value="activities" className=" m-0">
              <Activities />
            </TabsContent>
            <TabsContent value="notes" className="m-0">
              <Notes />
            </TabsContent>
            <TabsContent value="calls" className="m-0">
              <Calls />
            </TabsContent>
            <TabsContent value="files" className="m-0">
              <Files />
            </TabsContent>
            <TabsContent value="contacts" className="m-0">
              <Contacts />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
