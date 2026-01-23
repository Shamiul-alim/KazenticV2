import React from 'react';
import { MoreHorizontal, Clock, Flag } from 'lucide-react';

interface EventItemProps {
    event: {
        title: string;
        typeLabel?: string;
        startTime?: string;
        endTime?: string;
        duration?: string;
        priority?: string;
        color: 'green' | 'purple' | 'blue';
        assignees?: string[];
    };
    variant?: 'row' | 'block'; // 'row' for All Day section, 'block' for Time Grid
    onClick?: (e: React.MouseEvent) => void;
}

const colorStyles = {
    green: {
        bg: 'bg-emerald-100',
        border: 'border-emerald-500',
        text: 'text-emerald-700',
        tagBg: 'bg-white',
        tagText: 'text-emerald-600',
    },
    purple: {
        bg: 'bg-purple-100',
        border: 'border-purple-500',
        text: 'text-purple-700',
        tagBg: 'bg-purple-200',
        tagText: 'text-purple-700',
    },
    blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-500',
        text: 'text-blue-700',
        tagBg: 'bg-blue-100',
        tagText: 'text-blue-600',
    },
};

export default function EventItem({ event, variant = 'row', onClick }: EventItemProps) {
    const styles = colorStyles[event.color];

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                onClick?.(e);
            }}
            title={event.title}
            className={`
        relative w-full rounded-md border-l-4 p-1.5 text-xs hover:brightness-95 cursor-pointer transition-all overflow-hidden
        ${styles.bg} ${styles.border} ${styles.text}
        ${variant === 'block' ? 'h-full flex flex-col justify-start gap-0.5 py-1' : 'flex items-center justify-between pr-8'}
      `}
        >
            <div className={`flex flex-col min-w-0 flex-1 ${variant === 'block' ? 'w-full' : 'gap-1'}`}>
                {/* Title Section */}
                <div className="flex items-center gap-1.5 min-w-0 mb-0.5">
                    <div className="font-bold text-[13px] truncate leading-tight flex-1">{event.title}</div>
                    {event.priority === 'High' && (
                        <Flag size={10} fill="#ef4444" className="text-red-500 shrink-0" />
                    )}
                </div>

                {/* Metadata Section */}
                <div className={`flex items-center gap-x-2 gap-y-1 ${variant === 'block' ? 'flex-wrap' : ''}`}>
                    {/* Time Range - First priority for time blocks */}
                    {event.startTime && event.startTime !== 'All Day' && (
                        <div className="flex items-center gap-1 opacity-90 font-medium whitespace-nowrap">
                            <Clock size={11} className="shrink-0" />
                            <span className="text-[10px]">
                                {event.startTime}{event.endTime ? ` - ${event.endTime}` : ''}
                            </span>
                        </div>
                    )}

                    {/* Type Badge */}
                    {event.typeLabel && (
                        <span className={`px-1.5 py-0.5 rounded border border-current bg-opacity-20 ${styles.tagBg} ${styles.tagText} uppercase text-[9px] font-bold tracking-wider whitespace-nowrap`}>
                            {event.typeLabel}
                        </span>
                    )}

                    {/* Duration / All Day */}
                    {event.duration && (
                        <div className="flex items-center gap-1 opacity-70 whitespace-nowrap text-[10px]">
                            <span>({event.duration})</span>
                        </div>
                    )}

                    {/* Priority */}
                    {event.priority === 'High' && (
                        <div className="flex items-center gap-0.5 text-red-600 font-bold whitespace-nowrap text-[10px]">
                            <span>High</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Assignees (Avatar) */}
            {event.assignees && event.assignees.length > 0 && (
                <div className={`flex -space-x-1.5 shrink-0 ${variant === 'row' ? 'relative ml-2' : 'absolute bottom-1 right-1 scale-75 origin-bottom-right'}`}>
                    {event.assignees.slice(0, 3).map((src, i) => (
                        <img key={i} src={src} alt="User" className="w-5 h-5 rounded-full border border-white shadow-sm" />
                    ))}
                </div>
            )}

            {/* Menu Dots */}
            <div className="absolute top-1.5 right-1.5 opacity-30 hover:opacity-100 group-hover:block hidden">
                <MoreHorizontal size={14} />
            </div>
        </div>
    );
}