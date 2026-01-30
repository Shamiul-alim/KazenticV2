'use client';

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { X, Trash2, Edit3, Check, Bell, AlertCircle, Info } from 'lucide-react';
import { cn } from "@/lib/utils";
import { NoticeType } from './NoticeCard';

interface NoticeDetailsProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    notice: {
        id: string;
        title: string;
        author: { name: string; avatar?: string };
        time: string;
        date: string;
        description: string;
        type: NoticeType;
        publishedAt: string;
    } | null;
}

const typeStyles = {
    Holiday: {
        icon: Bell,
        iconColor: 'text-[#4157FE]',
        badgeBg: 'bg-[#F2F9FE]',
        badgeText: 'text-[#4157FE]',
        badgeBorder: 'border-[#4157FE80]',
    },
    Announcement: {
        icon: AlertCircle,
        iconColor: 'text-[#EA580C]',
        badgeBg: 'bg-[#FFF7ED]',
        badgeText: 'text-[#EA580C]',
        badgeBorder: 'border-[#EA580C80]',
    },
    Info: {
        icon: Info,
        iconColor: 'text-[#9333EA]',
        badgeBg: 'bg-[#FAF5FF]',
        badgeText: 'text-[#9333EA]',
        badgeBorder: 'border-[#9333EA80]',
    },
};

export default function NoticeDetails({ open, onOpenChange, notice }: NoticeDetailsProps) {
    if (!notice) return null;

    const styles = typeStyles[notice.type];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[550px] gap-0 border-none p-0 !rounded-[20px] overflow-hidden">
                <div className="bg-white p-8">
                    <DialogHeader className="mb-6 flex flex-row items-center justify-between space-y-0">
                        <DialogTitle className="text-[18px] font-bold text-[#191F38]">Notice Details</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                        {/* Notice Title Row */}
                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-2">
                                <p className="text-[14px] font-bold text-[#191F38]">Notice Title</p>
                                <p className="text-[14px] text-[#697588]">{notice.title}</p>
                            </div>
                            <div className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#05966950] bg-[#C4FFE2] px-2.5 py-1 text-[12px] font-medium text-[#059669]">
                                <Check className="h-3.5 w-3.5" />
                                <span>Published</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <p className="text-[14px] font-bold text-[#191F38]">Description</p>
                            <p className="text-[14px] leading-relaxed text-[#697588]">
                                {notice.description}
                            </p>
                        </div>

                        {/* Posted By & On Row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <p className="text-[14px] font-bold text-[#191F38]">Posted By</p>
                                <p className="text-[14px] text-[#697588]">{notice.author.name}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[14px] font-bold text-[#191F38]">Posted On</p>
                                <p className="text-[14px] text-[#697588]">{notice.date} | {notice.time}</p>
                            </div>
                        </div>

                        {/* Occasion Date & Notice Type Row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <p className="text-[14px] font-bold text-[#191F38]">Occasion Date</p>
                                <p className="text-[14px] text-[#697588]">{notice.date}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[14px] font-bold text-[#191F38]">Notice Type</p>
                                <div>
                                    <span className={cn(
                                        "inline-block rounded-md border px-3 py-0.5 text-[11px] font-medium leading-4 tracking-tighter",
                                        styles.badgeBg,
                                        styles.badgeText,
                                        styles.badgeBorder
                                    )}>
                                        {notice.type}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-10 flex justify-end gap-3">
                        <Button
                            variant="outline"
                            className="h-10 gap-2 border-[#EBEBEB] bg-white px-5 text-[#C3242A] hover:bg-red-50 !rounded-lg"
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="text-xs font-semibold">Delete</span>
                        </Button>
                        <Button
                            className="h-10 gap-2 bg-[#4157FE] px-8 text-white hover:bg-[#4157FE]/90 !rounded-lg"
                        >
                            <Edit3 className="h-4 w-4" />
                            <span className="text-xs font-semibold">Edit</span>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
