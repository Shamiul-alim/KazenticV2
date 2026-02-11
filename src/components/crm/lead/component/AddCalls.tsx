"use client";
import React from "react";
import { X, Calendar as CalendarIcon, ChevronDown } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddCallsProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCalls = ({ isOpen, onClose }: AddCallsProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[550px]  border-none  rounded-lg overflow-hidden bg-white">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4">
          <DialogTitle className="text-sm font-bold text-[#191F38]">
            Add New Call Log
          </DialogTitle>
        </div>

        {/* Form Body */}
        <div className="px-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Status Select */}
            <div className="space-y-2">
              <Label>Status</Label>
              <Select>
                <SelectTrigger className="h-8 mt-1 text-xs border-[#EBEBEB] text-[#697588] rounded-lg focus:ring-[#4157FE]">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="answered">Answered</SelectItem>
                  <SelectItem value="no-answer">No Answer</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Follow up Date */}
            <div className="space-y-2">
              <Label>Follow up Date</Label>
              <div className="relative">
                <Input
                  placeholder="dd/mm/yyyy"
                  className="h-8 mt-1 text-xs border-[#EBEBEB] pr-10 rounded-lg focus-visible:ring-[#4157FE]"
                />
                <CalendarIcon
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#697588]"
                />
              </div>
            </div>
          </div>

          {/* Note Section */}
          <div className="space-y-2">
            <Label>Note</Label>
            <Textarea placeholder="Text" className="mt-1" />
          </div>

          {/* Footer Actions */}
          <div className="flex gap-4 pb-4">
            <Button
              variant="outline"
              size="lg"
              onClick={onClose}
              className="flex justify-center w-full"
            >
              Cancel
            </Button>
            <Button
              variant="success"
              size="lg"
              onClick={onClose}
              className="flex justify-center w-full"
            >
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCalls;
