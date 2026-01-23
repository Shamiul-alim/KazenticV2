import React from 'react';

export const hours = [
    '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM',
    '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM', '12:00 AM',
    '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM', '06:00 AM'
];

export default function TimeColumn() {
    return (
        <div className="w-20 min-w-[5rem] border-r border-gray-100 bg-white">
            {hours.map((time, i) => (
                <div key={`${time}-${i}`} className="h-24 relative">
                    <span className="absolute -top-3 right-3 text-[10px] text-gray-400 font-bold uppercase tracking-wider bg-white pl-1">
                        {time}
                    </span>
                </div>
            ))}
        </div>
    );
}