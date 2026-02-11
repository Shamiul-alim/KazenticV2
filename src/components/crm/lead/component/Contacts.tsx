import React from "react";
import Image from "next/image";
import leadsData from "@/data/crm/lead/leads-data.json";
import {
  Plus,
  MoreHorizontal,
  Phone,
  Mail,
  Briefcase,
  MapPin,
} from "lucide-react";

// --- Shadcn UI Components ---
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FilterPopover } from "@/components/sprint-overview/custom/filters/filter-popover";

const Contacts = () => {
  const { contacts } = leadsData.leadDetails;

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] rounded-bl-lg rounded-br-lg">
      {/* Header Section */}
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-[#191F38] leading-6">
            Contacts
          </h3>
          <p className="text-[11px] text-[#697588]">
            Lorem ipsum dolor sit amet consectetur. Pulvinar non praesent sit
            nisi pharetra faucibus.
          </p>
        </div>
        <div className="flex gap-2">
          <FilterPopover />
          <Button variant="success">
            <Plus size={14} /> Add Contact
          </Button>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
        {contacts.map((contact) => (
          <Card
            key={contact.id}
            className="border border-[#EBEBEB] bg-[#FFFFFF] shadow-none rounded-lg"
          >
            <CardContent className="p-4">
              {/* Profile Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10 border border-[#EBEBEB]">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10B981] border-2 border-white rounded-full"></span>
                  </div>
                  <div>
                    <h4 className="text-[12px] font-bold text-[#191F38]">
                      {contact.name}
                    </h4>
                    <p className="text-[10px] text-[#697588]">
                      {contact.email}
                    </p>
                  </div>
                </div>
                <button className="text-[#9CA3AF] hover:text-[#191F38] pt-1">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              {/* Info Rows */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 flex items-center justify-center rounded-full border border-[#EBEBEB] bg-white text-[#697588]">
                    <Phone size={12} />
                  </div>
                  <span className="text-[11px] text-[#697588] font-medium">
                    {contact.phone}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 flex items-center justify-center rounded-full border border-[#EBEBEB] bg-white text-[#697588]">
                    <Briefcase size={12} />
                  </div>
                  <span className="text-[11px] text-[#697588] font-medium">
                    {contact.role}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 flex items-center justify-center rounded-full border border-[#EBEBEB] bg-white text-[#697588]">
                    <MapPin size={12} />
                  </div>
                  <span className="text-[11px] text-[#697588] font-medium">
                    {contact.location}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
