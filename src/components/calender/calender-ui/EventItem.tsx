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
            className={`
        relative w-full rounded-md border-l-4 p-2 text-xs hover:brightness-95 cursor-pointer transition-all
        ${styles.bg} ${styles.border} ${styles.text}
        ${variant === 'block' ? 'h-full flex flex-col justify-start gap-1 py-1' : 'flex items-center justify-between pr-8'}
      `}
        >
            <div className={`flex ${variant === 'block' ? 'flex-col w-full' : 'flex-col gap-1.5'}`}>
                {/* Title Section */}
                <div className="font-medium text-sm truncate">{event.title}</div>

                {/* Metadata Section */}
                <div className={`flex items-center gap-2 ${variant === 'block' ? 'flex-wrap mt-0.5' : ''}`}>

                    {/* Type Badge */}
                    {event.typeLabel && (
                        <span className={`px-2 py-0.5 rounded border border-current bg-opacity-50 ${styles.tagBg} ${styles.tagText} uppercase text-[10px] font-bold tracking-wider`}>
                            {event.typeLabel}
                        </span>
                    )}

                    {/* Duration / All Day */}
                    {event.duration ? (
                        <div className="flex items-center gap-1 opacity-80">
                            <Clock size={12} />
                            <span>{event.duration}</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1 opacity-80">
                            <Clock size={12} />
                            <span>All Day</span>
                        </div>
                    )}

                    {/* Priority */}
                    {event.priority === 'High' && (
                        <div className="flex items-center gap-1 text-red-500 font-semibold">
                            <Flag size={12} fill="currentColor" />
                            <span>High</span>
                        </div>
                    )}

                    {/* Time Range Text */}
                    {event.startTime && (
                        <span className="opacity-75">
                            {event.startTime} - {event.endTime}
                        </span>
                    )}
                </div>
            </div>

            {/* Assignees (Avatar) */}
            {event.assignees && event.assignees.length > 0 && (
                <div className={`flex -space-x-2 ${variant === 'row' ? 'relative' : 'absolute bottom-2 right-2'}`}>
                    {event.assignees.map((src, i) => (
                        <img key={i} src={src} alt="User" className="w-6 h-6 rounded-full border-2 border-white" />
                    ))}
                </div>
            )}

            {/* Menu Dots */}
            <div className="absolute top-2 right-2 opacity-50 hover:opacity-100">
                <MoreHorizontal size={16} />
            </div>
        </div>
    );
}