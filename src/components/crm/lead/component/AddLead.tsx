"use client";
import React from "react";
import { X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AddLeadProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddLead = ({ isOpen, onClose }: AddLeadProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[550px] overflow-hidden h-full flex flex-col p-0">
        {/* Header */}
        <div className="shrink-0 flex items-center bg-[#FDFDFD] justify-between px-4 py-3 border-b border-[#EBEBEB]">
          <h3 className="text-sm font-bold text-[#191F38]">Add Lead</h3>
          <SheetClose></SheetClose>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 bg-[#FDFDFD]  hide-scrollbar">
          <div>
            <Label>Lead Name</Label>
            <Input className="mt-1" placeholder="Enter lead name" />
          </div>

          <div>
            <Label>Lead Type</Label>
            <div className="grid grid-cols-2 gap-3 mt-1">
              <Button
                variant="outline"
                className="border-[#4157FE] bg-[#F2F9FE] text-[#4157FE] text-xs h-8"
              >
                Person
              </Button>
              <Button
                variant="outline"
                className="border-[#EBEBEB] text-[#697588] text-xs h-8 hover:bg-white"
              >
                Organization
              </Button>
            </div>
          </div>

          <div>
            <Label>Person Name</Label>
            <Input className="mt-1" placeholder="Enter person name" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <Label>Contacts</Label>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="new-contact"
                  className="border-[#4157FE] data-[state=checked]:bg-[#4157FE]"
                />
                <span className="text-[11px] text-[#4157FE] font-medium">
                  New Contact?
                </span>
              </div>
            </div>
            <Input placeholder="Search or add contact" />
          </div>

          {/* Grouped Contact Details Section */}
          <div className="p-4 border border-[#EBEBEB] rounded-lg bg-[white] space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input />
              </div>
            </div>
            <div>
              <Label>Email</Label>
              <Input />
            </div>
          </div>

          {/* Phone Section */}
          <div className="p-4 border border-[#EBEBEB] rounded-lg bg-white space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Primary Phone</Label>
                <Input />
              </div>
              <div>
                <Label>Type</Label>
                <Select>
                  <SelectTrigger className="border-[#EBEBEB] text-xs h-8 text-[#697588]">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Secondary Phone</Label>
                <Input />
              </div>
              <div>
                <Label>Type</Label>
                <Select>
                  <SelectTrigger className="border-[#EBEBEB] text-xs h-8 text-[#697588]">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Email Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Primary Email</Label>
              <Input />
            </div>
            <div>
              <Label>Secondary Email</Label>
              <Input />
            </div>
          </div>

          {/* Value Section */}
          <div className="p-4 border border-[#EBEBEB] rounded-lg bg-white space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Value</Label>
                <Input />
              </div>
              <div>
                <Label>Currency</Label>
                <Select>
                  <SelectTrigger className="border-[#EBEBEB] text-xs h-8 text-[#697588]">
                    <SelectValue placeholder="USD" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="p-3 flex items-center justify-end gap-3 bg-[#FDFDFD]">
            <Button
              variant="outline"
              onClick={onClose}
              size="lg"
              className="text-[#4157FE] h"
            >
              Cancel
            </Button>
            <Button variant="success" size="lg">
              Add Lead
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddLead;
