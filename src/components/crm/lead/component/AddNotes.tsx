"use client";
import React from "react";
import { X, UploadCloud } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface AddNotesProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNotes = ({ isOpen, onClose }: AddNotesProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[550px] p-0 border-none rounded-lg overflow-hidden bg-white">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4">
          <DialogTitle className="text-sm font-bold text-[#191F38]">
            Add New Note
          </DialogTitle>
        </div>

        {/* Form Body */}
        <div className="px-4 space-y-4">
          {/* Activity Title */}
          <div className="space-y-2">
            <Label>Activity Title</Label>
            <Input placeholder="" className="mt-1" />
          </div>

          {/* Details */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#191F38]">
              Details
            </label>
            <Textarea placeholder="Text" className="mt-1" />
          </div>

          {/* Attachments Section */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#191F38]">
              Attachments
            </label>
            <div className="border-2 border-dashed border-[#EBEBEB] rounded-xl p-8 flex flex-col items-center justify-center bg-[#FDFDFD] cursor-pointer hover:bg-[#F2F9FE] transition-colors group mt-1">
              <div className="w-12 h-12 bg-[#F2F9FE] rounded-full flex items-center justify-center mb-3">
                <div className=" rounded-lg flex items-center justify-center">
                  <Image
                    src="/assets/document-upload.svg"
                    alt=""
                    width={33.6}
                    height={33.6}
                  />
                </div>
              </div>
              <p className="text-xs font-bold text-[#191F38] mb-1">
                Drag and drop file here
              </p>
              <p className="text-[10px] text-[#697588]">
                or click to browse (4mb Max)
              </p>
            </div>
            <p className="text-[10px] text-[#697588] pt-1">
              Some data formats such as dates, colors, numbers may not be
              recognized.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-4 py-5 flex gap-4 bg-white ">
          <Button
            variant="outline"
            size="lg"
            onClick={onClose}
            className="w-full flex justify-center"
          >
            Cancel
          </Button>
          <Button
            variant="success"
            size="lg"
            onClick={onClose}
            className="w-full flex justify-center"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNotes;
