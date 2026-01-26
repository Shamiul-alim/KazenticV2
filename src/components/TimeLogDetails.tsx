import React, { useState, useRef } from 'react'
import { Clock, MoveLeft, Bolt, ChevronDown } from 'lucide-react'
import TimeSheets from './time-tracker/TimeSheets';

interface TimeLogDetailsProps {
  data: {
    Name: string;
    dailyHours: number[];
    logo: string;
  };
  onBack: () => void;
}
export const TimeLogDetails = ({ data, onBack }: TimeLogDetailsProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const total = data.dailyHours.reduce((a, b) => a + b, 0);
  
  // Ref to help position the popover relative to the button
  const buttonRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full h-full bg-white flex flex-col p-4 ">
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-row gap-3 items-center'>
            <button onClick={onBack} className='p-2 bg-[#f5f4f6] text-[#262d44] rounded-[10px] hover:bg-[#e8e7e9] transition-colors'>
              <MoveLeft size={18}/>
            </button>

            <div className='flex flex-row gap-2 items-center px-2 py-1 border-[#e5e7eb] border rounded-[8px]'>
                <span className='bg-[#4056fe] rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold text-white uppercase'>
                  {data.logo}
                </span>
                <p className='text-[13px] font-medium text-[#4b5563]'>{data.Name}</p>
            </div>
        </div>

        {/* CUSTOMIZE BUTTON */}
        <div 
          ref={buttonRef}
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className='flex items-center gap-2 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors relative'
        >
          <Bolt size={14} />
          <p className='text-[12px] font-semibold text-slate-600'>Customize</p>

          {isSettingsOpen && (
            <>
              {/* Overlay to close */}
              <div className="fixed inset-0 z-[100] cursor-default" onClick={(e) => {
                e.stopPropagation();
                setIsSettingsOpen(false);
              }} />

              {/* Popover */}
              <div 
                onClick={(e) => e.stopPropagation()}
                className="absolute top-full right-0 mt-2 w-[300px] bg-white border border-[#ebebeb] rounded-xl shadow-2xl z-[101] p-4 animate-in fade-in zoom-in duration-150 cursor-default"
              >
                <div className="space-y-4 text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] font-medium text-black">{data.Name}'s Timezone</span>
                    <span className="text-[13px] text-slate-400">+06 (UTC+6)</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[13px] text-black font-medium">Capacity</span>
                    <div className="flex items-center gap-1 border border-[#ebebeb] rounded-lg px-2 py-1 bg-white min-w-[100px] justify-between">
                      <span className="text-[12px] text-slate-600">Weekly</span>
                      <ChevronDown size={14} className="text-slate-400" />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#f8f9fa] flex justify-end gap-2">
                    <button 
                      onClick={() => setIsSettingsOpen(false)}
                      className="px-4 py-1.5 text-[12px] font-semibold text-[#4056fe] border border-[#4056fe] rounded-lg hover:bg-blue-50"
                    >
                      Reset
                    </button>
                    <button className="px-6 py-1.5 text-[12px] font-semibold text-white bg-[#4056fe] rounded-lg hover:bg-blue-600">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <TimeSheets/>
    </section>
  )
}