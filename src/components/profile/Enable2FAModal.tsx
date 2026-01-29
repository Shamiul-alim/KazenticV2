"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";

interface Enable2FAModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Enable2FAModal({
  isOpen,
  onClose,
}: Enable2FAModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
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
      {/* Modal Container */}
      <div
        ref={modalRef}
        className="bg-white w-full max-w-[540px] h-screen rounded-lg p-3 shadow-2xl relative animate-in zoom-in-95 duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-[14px] font-semibold text-[#191F38] -tracking-tightx">
            Enable 2FA
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

        {/* Step 1: Apps */}
        <div className="mb-8 px-3">
          <p className="text-[#191F38] text-xs leading-5 font-medium -tracking-tight mb-8">
            <span className=" mr-1">1.</span>
            You will need an authentication mobile app to complete this process,
            such as one of the following :
          </p>
          <div className="flex items-center gap-7 ml-6">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/google.svg"
                alt="Google"
                width={18}
                height={18}
              />
              <span className="text-[#191F38] font-medium text-[14px] leaidng-5 -tracking-tight">
                Google Authenticator
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/assets/microsoft.svg"
                alt="Microsoft"
                width={18}
                height={18}
              />
              <span className="text-[#191F38] font-medium text-[14px] leaidng-5 -tracking-tight">
                Microsoft Authenticator
              </span>
            </div>
          </div>
        </div>

        {/* Step 2: QR Code */}
        <div className="mb-15 px-3">
          <p className="text-[#191F38] text-xs leading-5 font-medium -tracking-tight mb-12">
            <span className="font-bold mr-2">2.</span>
            Scan the QR code with your authenticator, If you can&apos;t scan the
            code, you can enter this secret key into your authentication app.
          </p>
          <div className="flex flex-col items-center">
            <div className="mb-4 ">
              <Image
                src="/assets/qr.svg"
                alt="QR Code"
                width={106}
                height={106}
                className="object-contain"
              />
            </div>
            <p className="text-[#191F38] font-semibold text-xs -tracking-tight leading-5 mb-4">
              JUJFD-NFOFM-FKDJO-PDJOD-JKOLIO
            </p>
            <Button variant="type" className="flex gap-1">
              Copy key
              <Image src="/assets/copy.svg" alt="copy" width={16} height={16} />
            </Button>
          </div>
        </div>

        {/* Step 3: Verify */}
        <div className="mb-10 px-3">
          <p className="text-[#191F38] text-xs leading-5 font-medium -tracking-tight mb-8">
            <span className="font-bold mr-2">3.</span>
            After scanning the QR code above, enter the six-digit code generated
            by your authenticator.
          </p>
          <div className="flex justify-center gap-3">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                className={`w-16.25 h-9 rounded-lg border border-[#EBEBEB] text-center text-xs font-bold focus:outline-[#4157FE] transition-all`}
                placeholder={i < 4 ? "4" : ""}
              />
            ))}
          </div>
          <div className="text-center mt-6">
            <button className="text-[#4157FE] text-xs font-medium leading05 -tracking-tight hover:underline">
              Do you need help?
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={onClose}
            className="text-[#4157FE]"
          >
            Cancel
          </Button>
          <Button variant="success" size="lg">
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
}
