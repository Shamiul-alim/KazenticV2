'use client'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from '@/components/time-tracker/ui/navigation-menu'
import { Bolt, ChevronDown, CircleCheck, CirclePause, Clock4, Hourglass, ListChecks, MoveUpRight, Timer } from 'lucide-react'
import React, { useState } from 'react' // Import useState
import MyTimeLogs from './MyTimeLogs'
import TimeTracker from './TimeTracker';
import AllTimeLogs from './AllTimeLogs'
import RequestReview from './RequestReview';


export default function Navbar2() {
const [activeTab, setActiveTab] = useState('tracker');
  return (
    <div className="w-full bg-white
        flex flex-col items-center flex-1">
{/*
          <div className='w-full border-b-2 border-[#ebebeb] h-12 flex flex-row justify-between'>

             <div className='w-100  flex flex-row'>
              <div className='flex flex-row items-center border-r-2 border-[#ebebeb] px-4 space-x-4 my-2 '> 
                <p className="font-bold text-xs bg-[#4056fe] px-2 py-1 text-white rounded-[5px]">K</p>
                <p className="font-bold text-black text-xs">Kazentic</p>
                <ChevronDown size={20} className="text-slate-600" />
              </div>

              <div className='flex flex-row items-center px-4 space-x-3 my-2 '> 
                <Timer className='text-[#b2b9c2]'/>
                <p className="font-bold text-[#b2b9c2] text-xs">Time Tracker</p>
              </div>
            </div> */}

            {/* <div className='w-auto px-4 flex flex-row space-x-3'>
              <div className='flex flex-row items-center py-0 px-2 space-x-1 my-2 border border-[#b2b9c2] rounded-[5px]'> 
                <p className="text-sm text-[#697588]">Task Summary</p>
                <ListChecks className='text-[#2d2e30] border rounded-[5px] border-[#697588] ' size={20} strokeWidth={1.3}/>
              </div>

              <div className='flex flex-row items-center py-0 px-2 space-x-1 my-2 border border-[#b2b9c2] rounded-[5px]'> 
                 <p className="text-sm text-[#697588]">Manage Tasks</p>
                <MoveUpRight className='text-[#2d2e30]' size={20} strokeWidth={1.3}/>
              </div>

              <div className='bg-[#f2f2f2] flex flex-row items-center py-0 px-2 space-x-1 my-2 border border-[#b2b9c2] rounded-[5px]'>
                <p className="font-bold text-sm text-[#151516]">02:14:10</p>
                <CirclePause className='text-[#d82c2c]' size={20}/>
              </div>
            </div> 
          </div> */}

          <div className='w-full h-8 border border-[#ebebeb] flex flex-row justify-between'>
        <NavigationMenu className='hidden lg:flex space-x-3 list-none h-full items-center px-0'>
          
          {/* TAB 1: Time Tracker */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <button 
                onClick={() => setActiveTab('tracker')} 
                className={`flex flex-row items-center gap-2 h-8 border-b-2 transition-colors px-2 ${
                  activeTab === 'tracker' ? 'border-[#4056fe]' : 'border-transparent'
                }`}
              >
                <Clock4 className={activeTab === 'tracker' ? 'text-[#4056fe]' : 'text-[#b2b9c2]'} size={18}/>
                <p className={`text-xs ${activeTab === 'tracker' ? 'text-[#4056fe]' : 'text-[#b2b9c2]'}`}>
                  Time Tracker
                </p>
              </button>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* TAB 2: My Time Logs */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <button 
                onClick={() => 
                  setActiveTab('logs')} // Update state on click
                className={`flex flex-row items-center gap-2 h-8 border-b-2 transition-colors px-2 ${
                  activeTab === 'logs' ? 'border-[#4056fe]' : 'border-transparent'
                }`}
              >
                <Timer className={activeTab === 'logs' ? 'text-[#4056fe]' : 'text-[#b2b9c2]'} size={18}/>
                <p className={`text-xs ${activeTab === 'logs' ? 'text-[#4056fe]' : 'text-[#b2b9c2]'}`}>
                  My Times Log
                </p>
              </button>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
                <button onClick={() => setActiveTab('allLogs')}
                className={`flex flex-row items-center gap-2 h-8 border-b-2 transition-colors px-2 ${
                  activeTab === 'allLogs' ? 'border-[#4056fe]' : 'border-transparent'}`}
                >
                <Hourglass className={activeTab === 'allLogs' ? 'text-[#4056fe]' : 'text-[#b2b9c2]'} size={18}/>
                <p className={`text-xs ${activeTab === 'allLogs' ? 'text-[#4056fe]' : 'text-[#b2b9c2]'}`}>
                  All Times Log
                </p>
                </button>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
                <button onClick={() => setActiveTab('review')}
                className={`flex flex-row items-center gap-2 h-8 border-b-2 transition-colors px-2 ${
                  activeTab === 'review' ? 'border-[#4056fe]' : 'border-transparent'}`}
                >
                <CircleCheck className={activeTab === 'review' ? 'text-[#4056fe]' : 'text-[#b2b9c2]'} size={18}/>
                <p className={`text-xs ${activeTab === 'review' ? 'text-[#4056fe]' : 'text-[#b2b9c2]'}`}>
                  Request Review
                </p>
                </button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenu>
        {activeTab === 'logs' && (
          <button className='flex flex-row items-center gap-2 h-4 p-2.5 my-1 mx-4 border rounded-[5px] border-[#b2b9c2] hover:bg-slate-50 transition-colors'>
              <Bolt className='text-[#8f99a7]' size={15}/> 
              <p className='text-[#8f99a7] text-xs'>Customize</p>
          </button>
        )}
      </div>

      {/* Step 2: Conditional Rendering of Sections */}
      <div className="w-full p-0">
        {activeTab === 'tracker' && <TimeTracker/>}
        {activeTab === 'logs' && <MyTimeLogs />}
        
        {activeTab == 'allLogs' && <AllTimeLogs/>}
        {activeTab == 'review' && <RequestReview/>}
      </div>
    </div>
  )
}
