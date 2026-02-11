"use client";
import Image from "next/image";
import leadsData from "@/data/crm/lead/leads-data.json";
import {
  MoreHorizontal,
  Clock,
  Plus,
  SendHorizontal,
  Paperclip,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { FilterPopover } from "@/components/sprint-overview/custom/filters/filter-popover";
import { Button } from "@/components/ui/Button";
import AddNotes from "./AddNotes";
import React from "react";

const Notes = () => {
  const { notes } = leadsData.leadDetails;
  const [isAddNoteOpen, setIsAddNoteOpen] = React.useState(false);

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD] rounded-bl-lg rounded-br-lg">
      {/* Header Section */}
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-[#191F38] leading-6">
            Notes
          </h3>
          <p className="text-[11px] text-[#697588]">
            Lorem ipsum dolor sit amet consectetur. Pulvinar non praesent sit
            nisi pharetra faucibus.
          </p>
        </div>
        <div className="flex gap-2">
          <FilterPopover />
          <Button onClick={() => setIsAddNoteOpen(true)} variant="success">
            <Plus size={14} /> Add Notes
          </Button>
        </div>
      </div>

      {/* Notes List */}
      <div className="p-4 space-y-4 overflow-y-auto">
        {notes.map((note) => (
          <Card
            key={note.id}
            className="border border-[#EBEBEB] bg-[#FFFFFF] shadow-none rounded-lg"
          >
            <CardContent className="p-4">
              {/* Note Header */}
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-[12px] font-semibold text-[#191F38]">
                  {note.title}
                </h4>
                <div className="flex items-center gap-3 text-[#9CA3AF]">
                  <Image
                    src="/assets/messages-2-gray.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                  <MoreHorizontal
                    size={16}
                    className="cursor-pointer hover:text-[#191F38]"
                  />
                </div>
              </div>

              {/* Note Body */}
              <p className="text-[11px] text-[#697588] leading-[18px] mb-4">
                {note.content}
              </p>

              {/* Note Footer (Timestamp) */}
              <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#EBEBEB] font-medium rounded-sm text-xs leading-5 text-[#191F38]">
                <Clock size={12} />
                <span className="text-[10px] font-medium">
                  {note.timestamp}
                </span>
              </div>

              {/* Comment Thread (if exists) */}
              {note.comments.length > 0 && (
                <div className="mt-4 space-y-4">
                  {note.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 items-start">
                      <Avatar className="w-7 h-7">
                        <AvatarImage src={comment.avatar} />
                        <AvatarFallback className="bg-[#4157FE] text-white text-[10px]">
                          {comment.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 bg-[#F2F9FE] border border-[#EBEBEB] rounded-xl p-3 relative">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[11px] font-bold text-[#191F38]">
                            {comment.user}
                          </span>
                          <span className="text-[10px] text-[#9CA3AF]">
                            {comment.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#697588]">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Reply Input Field */}
                  <div className="flex gap-3 items-center pt-2">
                    <Avatar className="w-7 h-7">
                      <AvatarFallback className="bg-[#F97316] text-white text-[10px]">
                        CN
                      </AvatarFallback>
                    </Avatar>
                    <div className="relative flex-1">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                        <Paperclip size={14} />
                      </div>
                      <Input
                        placeholder="Type here.."
                        className="h-9 pl-9 pr-10 bg-white border-[#EBEBEB] text-[11px] focus-visible:ring-[#4157FE] rounded-lg"
                      />
                      <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4157FE] hover:text-[#3748d6]">
                        <SendHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <AddNotes
        isOpen={isAddNoteOpen}
        onClose={() => setIsAddNoteOpen(false)}
      />
    </div>
  );
};

export default Notes;
