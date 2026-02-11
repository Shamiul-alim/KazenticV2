"use client";
import React from "react";
import { X, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface AddActivitiesProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddActivities = ({ isOpen, onClose }: AddActivitiesProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[550px] p-0 border-none  rounded-lg overflow-hidden bg-white">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4">
          <DialogTitle className="text-sm font-bold text-[#191F38]">
            Add New Activity Log
          </DialogTitle>
        </div>

        {/* Form Content */}
        <div className="px-4 space-y-4">
          {" "}
          <div className="grid grid-cols-2 gap-4">
            {/* Activity Title */}
            <div className="space-y-2">
              <Label>Activity Title</Label>
              <Input placeholder="" className="mt-1" />
            </div>

            {/* Type Selection */}
            <div className="space-y-2">
              <Label>Type</Label>
              <Select defaultValue="note">
                <SelectTrigger className="h-8 mt-1 text-xs border-[#EBEBEB] focus-visible:ring-[#4157FE] text-[#697588]">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="note">Note</SelectItem>
                  <SelectItem value="call">Call</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Details / Textarea */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-[#191F38]">
              Details
            </Label>
            <div className="relative border border-[#EBEBEB] rounded-lg overflow-hidden mt-1">
              <Textarea
                placeholder="Text"
                className=""
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 flex gap-4">
          <Button
            variant="outline"
            size="lg"
            className="w-full flex justify-center"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            size="lg"
            className="w-full flex justify-center text-center"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddActivities;
