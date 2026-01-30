'use client';
import React from 'react';
import { MoreHorizontal, User, Clock, Calendar, Bell, AlertCircle, Info, Edit3, Trash2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export type NoticeType = 'Holiday' | 'Announcement' | 'Info';

interface NoticeCardProps {
    title: string;
    author: {
        name: string;
        avatar?: string;
    };
    time: string;
    date: string;
    description: string;
    type: NoticeType;
    publishedAt: string;
    onClick?: () => void;
    className?: string;
}

const typeStyles = {
    Holiday: {
        icon: Bell,
        iconColor: 'text-[#4157FE]',
        bgColor: 'bg-[#F2F9FE]',
        badgeBg: 'bg-[#F2F9FE]',
        badgeText: 'text-[#4157FE]',
        badgeBorder: 'border-[#4157FE80]',
    },
    Announcement: {
        icon: AlertCircle,
        iconColor: 'text-[#EA580C]',
        bgColor: 'bg-[#FFF7ED]',
        badgeBg: 'bg-[#FFF7ED]',
        badgeText: 'text-[#EA580C]',
        badgeBorder: 'border-[#EA580C80]',
    },
    Info: {
        icon: Info,
        iconColor: 'text-[#9333EA]',
        bgColor: 'bg-[#FAF5FF]',
        badgeBg: 'bg-[#FAF5FF]',
        badgeText: 'text-[#9333EA]',
        badgeBorder: 'border-[#9333EA80]',
    },
};

const NoticeCard: React.FC<NoticeCardProps> = ({
    title,
    author,
    time,
    date,
    description,
    type,
    publishedAt,
    onClick,
    className,
}) => {
    const styles = typeStyles[type];
    const Icon = styles.icon;

    return (
        <div
            className={cn(
                "group relative flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-md cursor-pointer",
                className
            )}
            onClick={onClick}
        >
            <div className="flex items-start justify-between">
                <div className="flex gap-4">
                    <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl", styles.bgColor)}>
                        <Icon className={cn("h-6 w-6", styles.iconColor)} />
                    </div>
                    <div className="flex flex-col gap-1.5 pt-0.5">
                        <h3 className="text-[15px] font-bold text-[#111827]">{title}</h3>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-gray-500">
                            <div className="flex items-center gap-2">
                                <div className="h-6 w-6 overflow-hidden rounded-full bg-gray-100">
                                    <User className="h-full w-full p-1 text-gray-400" />
                                </div>
                                <span className="font-medium text-gray-700">{author.name}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span>{time}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span>{date}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                    <Popover>
                        <PopoverTrigger asChild>
                            <button
                                className="rounded-lg p-1 text-gray-300 hover:bg-gray-50 hover:text-gray-500 transition-colors"
                            >
                                <MoreHorizontal className="h-6 w-6" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-[180px] border-gray-100 p-2 shadow-lg !rounded-xl">
                            <div className="flex flex-col gap-1">
                                <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-[14px] font-medium text-[#697588] transition-colors hover:bg-gray-50">
                                    <Edit3 className="h-4 w-4" />
                                    <span>Edit Notice</span>
                                </button>
                                <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-[14px] font-medium text-[#DC2626] transition-colors hover:bg-red-50">
                                    <Trash2 className="h-4 w-4" />
                                    <span>Delete Notice</span>
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="space-y-4">
                <p className="text-[14px] leading-relaxed text-gray-600">
                    {description}
                </p>

                <div className="flex items-center justify-between border-t border-gray-50 pt-5">
                    <span className={cn(
                        "rounded-lg border px-3 py-0.5 text-[12px] font-medium",
                        styles.badgeBg,
                        styles.badgeText,
                        styles.badgeBorder
                    )}>
                        {type}
                    </span>
                    <span className="text-[12px] text-gray-400">
                        Published {publishedAt}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NoticeCard;
