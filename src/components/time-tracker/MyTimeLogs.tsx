import { CalendarDays, CheckCircle2, ChevronDown, ChevronLeftIcon, ChevronRight, CircleCheckBig, Clock, DollarSign, LayoutPanelLeft, Link2Off, MoreHorizontal } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '@/components/time-tracker/ui/Button'
import TimeSheets from './TimeSheets';
import TimeEntities from './TimeEntities';
import ReviewLogsSidebar from './ReviewLogsSidebar';


export default function MyTimeLogs() {
  const [activeView, setActiveView] = useState<'entities' | 'sheets'>('sheets');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar
  
  return (
    <div className="flex flex-col w-full"> 
      
      <div className='h-10 w-full flex flex-row justify-between border-b border-[#ebebeb] px-5 py-2 items-center'>
        <div className='flex flex-row space-x-3'>
          <div className='flex flex-row px-1 py-0 border border-[#ebebeb] rounded-[5px] items-center'>
            <DollarSign className='text-[#858f9f] ' size={12} strokeWidth={1.5}/>
            <p className='text-[#858f9f] text-xs'>Payable</p>
          </div>
          <div className='flex flex-row px-1 py-0 border border-[#ebebeb] rounded-[5px] items-center space-x-2'>
            <ChevronLeftIcon className='text-[#858f9f]' size={15}/>
            <CalendarDays className='text-[#858f9f]' size={15}/>
            <p className='text-[#858f9f] text-xs'>Jan 8-22</p>
            <ChevronRight className='text-[#858f9f]' size={15}/>
          </div>
          <div className='flex flex-row px-1 py-0 border border-[#ebebeb] rounded-[5px] items-center'>
            <p className='text-[#858f9f] text-xs'>This Week</p>
          </div>
        </div>

        {/* Right Side Group */}
        <div className='flex flex-row space-x-2 items-center'>
          <Button className="bg-[#4056fe] hover:bg-[#3344cc] text-[11px] h-6 px-2 rounded-[5px] shadow-none cursor-pointer ">
            Send For Review
          </Button>
          <CheckCircle2 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle on click
            className={`p-1 border rounded-[5px] border-[#ebebeb] cursor-pointer transition-all ${
              isSidebarOpen ? 'bg-[#4056fe] text-white' : 'text-[#4056fe] bg-white hover:bg-slate-50'
            }`} 
            size={28} 
          />

          {/* Toggle Buttons Container */}
          <div className='flex flex-row items-center border rounded-[5px] border-[#ebebeb] overflow-hidden'>
            <button 
              onClick={() => setActiveView('entities')}
              className={`flex flex-row items-center px-3 py-1 h-7 space-x-2 transition-colors ${
                activeView === 'entities' ? 'bg-[#f3f9ff] border-l-2 border-[#4056fe]' : 'bg-white'
              }`}
            >
              <p className={`text-[11px] ${activeView === 'entities' ? 'text-[#4056fe]' : 'text-[#858f9f]'}`}>
                Time Entities
              </p>
              <CalendarDays className={activeView === 'entities' ? 'text-[#4056fe]' : 'text-[#858f9f]'} size={14}/>
            </button>

            <button 
              onClick={() => setActiveView('sheets')}
              className={`flex flex-row items-center px-3 py-1 h-7 space-x-2 transition-colors ${
                activeView === 'sheets' ? 'bg-[#f3f9ff] border-l-2 border-[#4056fe]' : 'bg-white'
              }`}
            >
              <p className={`text-[11px] ${activeView === 'sheets' ? 'text-[#4056fe]' : 'text-[#858f9f]'}`}>
                Time Sheets
              </p>
              <LayoutPanelLeft className={activeView === 'sheets' ? 'text-[#4056fe]' : 'text-[#858f9f]'} size={14}/>
            </button>
          </div>
        </div>
      </div> {/* END OF HEADER */}

      {/* 2. CONTENT AREA (Set below the header) */}
      <div className="w-full">
        {activeView === 'sheets' ? <TimeSheets /> : <TimeEntities />}
        <ReviewLogsSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      </div>

    </div>
  )
}
