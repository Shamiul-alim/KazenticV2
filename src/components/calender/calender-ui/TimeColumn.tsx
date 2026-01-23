import React from 'react';

const hours = [
    '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

export default function TimeColumn() {
    return (
        <div className="w-20 min-w-[5rem] border-r border-gray-100 bg-white">
            {hours.map((time) => (
                <div key={time} className="h-24 relative">
                    <span className="absolute -top-3 right-3 text-xs text-gray-400 font-medium bg-white pl-1">
                        {time}
                    </span>
                </div>
            ))}
        </div>
    );
}