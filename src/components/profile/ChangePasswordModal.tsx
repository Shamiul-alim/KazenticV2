"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/Button";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
}: ChangePasswordModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] h-screen flex items-center justify-center bg-black/20  animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white w-full max-w-[400px] rounded-lg p-3 shadow-2xl relative animate-in zoom-in-95 duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[14px] font-semibold text-[#191F38] -tracking-tightx">
            Change Password
          </h2>
          <button
            onClick={onClose}
            className="w-5 h-5 flex items-center justify-center rounded-full bg-[#DBE9FF] hover:bg-[#e0eaff] transition-colors"
          >
            <Image
              src="/assets/cross.svg"
              alt={""}
              width={8.333333015441895}
              height={8.333333015441895}
            />
          </button>
        </div>

        <form className="px-2 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Label>Current Password</Label>
          <Input
            className="h-10"
            placeholder="Enter current password"
            type="password"
          />
          <Label>New Password</Label>
          <Input
            className="h-10"
            placeholder="Enter new password"
            type="password"
          />
          <Label>Confirm Password</Label>
          <Input
            className="h-10"
            placeholder="Re-enter your password"
            type="password"
          />

          <Button
            variant="success"
            size="lg"
            className="w-full flex items-center justify-center mt-9"
          >
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
}
