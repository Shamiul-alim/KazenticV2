import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/time-tracker/ui/Button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/time-tracker/ui/table'
import { Check, CircleArrowLeft, CircleArrowOutUpLeft, CircleArrowRight, CircleChevronDown, DollarSign, DollarSignIcon, Globe, LogOut, LogOutIcon, LucideDollarSign, OutdentIcon, Utensils, Zap, ZapOff } from 'lucide-react'
import React, { useState } from 'react'

export default function TimeTracker () {
    const [open, setOpen] = useState(true)
  return (
    
    <section id="time-tracker" className='w-full bg-white min-h-screen'>
        <div className='h-10 w-full flex flex-row justify-between border-b  border-[#ebebeb] px-5 py-2 items-center'>
            <div className='flex flex-row px-1 py-0 border border-[#ebebeb] rounded-[5px] items-center'>
                <DollarSign className='text-[#858f9f] ' size={12} strokeWidth={1.5}/>
                <p className='text-[#858f9f] text-xs'>Payable</p>
            </div>

            <div>
               <Button className="bg-[#4056fe] hover:bg-[#3344cc] 
                text-[11px] h-6 px-2 rounded-[5px] shadow-none cursor-pointer ">
                Send For Review</Button>
            </div>
        </div>

        <div className='px-2 flex flex-col bg-white border border-[#ebebeb] mx-3 my-3 px-3 py-2 rounded-[10px] h-18'>
            <div className='w-full border-l-2 px-2 border-green-400 flex flex-row justify-between items-center'>
                <div>
                    <div className='flex flex-col gap-1'>
                        <div className='flex flex-row items-center space-x-1 '>
                            <Avatar className="w-6 h-6">
                                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                                <AvatarFallback className="bg-[#4056fe] text-white text-8px]">JD</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-[#8b8f9b] font-semibold">Alif Hasan</span>
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex flex-row items-center gap-2'>
                                <span className='text-xs  text-[#9eaaff] '>
                                    [kzt-242]
                                </span>
                                
                                <span className='text-xs text-[#c5cbd0]'>
                                    Create Page using Design System
                                </span>
                                <div className='mx-3 flex flex-row items-center border bg-[#e1ffef] border-[#99d7c3] px-1 rounded-[5px] gap-x-0.5'> 
                                    <Check className='text-[#99d7c3]' size={13}/>
                                    <p className='text-[#99d7c3] text-xs uppercase' >Complete</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' flex flex-row items-center gap-2 ' >
                    <LogOutIcon className='text-[#6476fe]' size={16} strokeWidth={2}/>
                    <p className='text-[#4c60fe] text-sm font-bold' >Out of Office</p>
                </div>
                <div className='flex flex-row items-center gap-2.5'>
                    <div className='w-20 flex flex-col bg-[#e1ffef] items-start p-1 rounded-[5px] gap-2'>
                        <p className='text-[11px] text-[#93d2bf]'>Signed in</p>
                        <p className='text-[12px] text-[#8b8f9b]'>10:00 AM</p>
                    </div>
                    <div className='w-20 flex flex-col bg-[#ecf2ff] items-start p-1 rounded-[5px] gap-2'>
                        <p className='text-[11px] text-[#a5aefe]'>Duration</p>
                        <p className='text-[12px] text-[#8b8f9b]'>10H : 00M</p>
                    </div>
                    <CircleChevronDown className='text-[#737b8570]'/>
                </div>
            </div>
        </div>

        <div className='px-2 flex flex-col bg-white border border-[#ebebeb] mx-3 my-3 px-3 py-2 rounded-[10px] h-18'>
            <div className='w-full border-l-2 px-2 border-[#9159d9] flex flex-row justify-between items-center'>
                <div>
                    <div className='flex flex-col gap-1'>
                        <div className='flex flex-row items-center space-x-1 '>
                            <Avatar className="w-6 h-6">
                                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                                <AvatarFallback className="bg-[#4056fe] text-white text-8px]">JD</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-black font-semibold">John Doe</span>
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex flex-row items-center gap-2'>
                                <span className='text-xs  text-[#7081fc] '>
                                    [kzt-242]
                                </span>
                                
                                <span className='text-xs text-[#8f97a4]'>
                                    Create Page using Design System
                                </span>
                                <div className='mx-3 flex flex-row items-center border bg-[#f1e5ff] border-[#9159d9] px-1 rounded-[5px] gap-x-0.5'> 
                                    <Zap className='text-[#9159d9]' size={13}/>
                                    <p className='text-[#9159d9] text-xs uppercase' >In Progress</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               

                <div className='flex flex-row items-center gap-2.5'>
                    <div className='w-20 flex flex-col bg-[#c4fee3] items-start p-1 rounded-[5px] gap-2'>
                        <p className='text-[11px] text-[#34b089]'>Signed in</p>
                        <p className='text-[12px] text-black'>10:00 AM</p>
                    </div>
                    <div className='w-20 flex flex-col bg-[#dbe9ff] items-start p-1 rounded-[5px] gap-2'>
                        <p className='text-[11px] text-[#697afe]'>Duration</p>
                        <p className='text-[12px] text-black'>10H : 00M</p>
                    </div>
                    <CircleChevronDown className={'text-[#737b8570]'}/>
                </div>
            </div>
        </div>

        <div className={`px-3 py-2 flex flex-col border border-[#ebebeb] mx-3 mt-3 transition-all duration-200 ${
                open 
                ? 'bg-[#f3f9ff] rounded-t-[10px] border-b-0' 
                : 'bg-white rounded-[10px] mb-3'
            }`}>
            <div className='w-full border-l-2 px-2 border-[#9159d9] flex flex-row justify-between items-center'>
                <div>
                    <div className='flex flex-col gap-1'>
                        <div className='flex flex-row items-center space-x-1 '>
                            <Avatar className="w-6 h-6">
                                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                                <AvatarFallback className="bg-[#4056fe] text-white text-8px]">JD</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-black font-semibold">John Doe</span>
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex flex-row items-center gap-2'>
                                <span className='text-xs  text-[#7081fc] '>
                                    [kzt-242]
                                </span>
                                
                                <span className='text-xs text-[#8f97a4]'>
                                    Create Page using Design System
                                </span>
                                <div className='mx-3 flex flex-row items-center border bg-[#f1e5ff] border-[#9159d9] px-1 rounded-[5px] gap-x-0.5'> 
                                    <Zap className='text-[#9159d9]' size={13}/>
                                    <p className='text-[#9159d9] text-xs uppercase' >In Progress</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row items-center gap-2.5'>
                    <div className='w-20 flex flex-col bg-[#c4fee3] items-start p-1 rounded-[5px] gap-2'>
                        <p className='text-[11px] text-[#34b089]'>Signed in</p>
                        <p className='text-[12px] text-black'>10:00 AM</p>
                    </div>
                    <div className='w-20 flex flex-col bg-[#dbe9ff] items-start p-1 rounded-[5px] gap-2'>
                        <p className='text-[11px] text-[#697afe]'>Duration</p>
                        <p className='text-[12px] text-black'>10H : 00M</p>
                    </div>
                    <CircleChevronDown className="text-[#737b8570] cursor-pointer"
                        onClick={() => setOpen(!open)}/>
                </div>
            </div>
        </div>
        
        {open && (
        <div className="flex flex-col px-3 py-2 gap-2 mx-3 bg-[#f3f9ff] ">
            <div className='flex flex-col gap-2'>
                <p className='text-[12px] font-bold text-[#252323]'>Description</p>
                <p className='text-[12px] text-[#8b96a5]'>
                    This is The Task Description This is The Task Description This is The Task Description
                </p>
            </div>
            <div className='flex flex-col gap-2'>
                <p className='text-[12px] font-bold text-[#252323]'>Time Breakdown</p>
                <div className="w-full border border-[#ebebeb] rounded-lg bg-white overflow-hidden h-auto">
                    <Table>
                        <TableHeader className="bg-slate-50 ">
                        <TableRow className="hover:bg-transparent items-center border-b border-[#ebebeb]">
                            <TableHead className="text-[11px] font-semibold text-slate-900">Signed in</TableHead>
                            <TableHead className="text-[11px] font-semibold text-slate-900">Task Name</TableHead>
                            <TableHead className="text-[11px] font-semibold text-slate-900">Payable</TableHead>
                            <TableHead className="text-[11px] font-semibold text-slate-900">Signed out</TableHead>
                            <TableHead className="text-[11px] font-semibold text-slate-900">Duration</TableHead>
                            <TableHead className="text-[11px] font-semibold text-slate-900">Break</TableHead>
                            <TableHead className="text-[11px] font-semibold text-slate-900">Reason</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {/* Row 1 - Prayer Break */}
                        <TableRow className="h-11 border-b border-[#ebebeb]">
                            <TableCell className="px-4">
                            <div className="bg-[#c4fee3] text-black text-[11px] font-medium py-1 rounded-sm text-center w-24">11:59 AM</div>
                            </TableCell>
                            <TableCell className="min-w-[280px]">
                            <span className="text-blue-600 font-semibold text-[11px]">[kzt-242]</span>
                            <span className="text-slate-900 text-[11px] ml-1">Create Pages using new design system (Design)</span>
                            </TableCell>
                            <TableCell>
                            <div className="flex justify-center">
                                <div className="border border-slate-200 p-1 rounded-sm bg-emerald-50/30">
                                <DollarSign size={14} className="text-emerald-500" />
                                </div>
                            </div>
                            </TableCell>
                            <TableCell><div className="bg-[#ffe5b7] text-black text-[11px] font-medium py-2 rounded-md text-center w-24">02:59 PM</div></TableCell>
                            <TableCell><div className="bg-[#dbe9ff] text-black text-[11px] font-medium py-2 rounded-md text-center w-24">05H : 00M</div></TableCell>
                            <TableCell><div className="bg-[#fff2e6] text-black text-[11px] font-medium py-2 rounded-md text-center w-24">03H : 00M</div></TableCell>
                            <TableCell>
                            <div className="flex items-center gap-1.5 border border-orange-200 text-orange-600 px-2 py-1 rounded-md w-fit">
                                <OutdentIcon size={14} />
                                <span className="text-[10px] font-bold ">Prayer Break</span>
                            </div>
                            </TableCell>
                        </TableRow>

                        {/* Row 2 - Dinner Break */}
                        <TableRow className="h-11 border-b border-[#ebebeb]">
                            <TableCell className="px-4"><div className="bg-[#ccffeb] text-black text-[11px] font-medium py-2 rounded-md text-center w-24">11:59 AM</div></TableCell>
                            <TableCell className="min-w-[280px]">
                            <span className="text-blue-600 font-semibold text-[11px]">[kzt-242]</span>
                            <span className="text-slate-900 text-[11px] ml-1">Create Pages using new design system (Design)</span>
                            </TableCell>
                            <TableCell>
                            <div className="flex justify-center">
                                <div className="border border-slate-200 p-1 rounded-sm">
                                <DollarSign size={14} className="text-slate-400" />
                                </div>
                            </div>
                            </TableCell>
                            <TableCell><div className="bg-[#ffe5b7] text-black text-[11px] font-medium py-2 rounded-md text-center w-24">02:59 PM</div></TableCell>
                            <TableCell><div className="bg-[#e6f0ff] text-black text-[11px] font-medium py-2 rounded-md text-center w-24">02:59 PM</div></TableCell>
                            <TableCell><div className="bg-[#fff2e6] text-black text-[11px] font-medium py-2 rounded-md text-center w-24">02:59 PM</div></TableCell>
                            <TableCell>
                            <div className="flex items-center gap-1.5 border border-emerald-200 text-emerald-600 px-2 py-1 rounded-md w-fit">
                                <Utensils size={14} />
                                <span className="text-[10px] font-bold ">Dinner Break</span>
                            </div>
                            </TableCell>
                        </TableRow>

                        {/* Row 3 - Out of Office */}
                        <TableRow className="h-11 border-b border-[#ebebeb]">
                            <TableCell className="px-4"><div className="bg-[#ccffeb] text-black text-[11px] font-medium py-2 rounded-md text-center w-24">11:59 AM</div></TableCell>
                            <TableCell className="min-w-[280px]">
                            <span className="text-blue-600 font-semibold text-[11px]">[kzt-242]</span>
                            <span className="text-slate-700 text-[11px] ml-1">Create Pages using new design system (Design)</span>
                            </TableCell>
                            <TableCell>
                            <div className="flex justify-center">
                                <div className="border border-slate-200 p-1 rounded-sm">
                                <LucideDollarSign size={14} className="text-slate-400" />
                                </div>
                            </div>
                            </TableCell>
                            <TableCell><div className="bg-[#ffe5b7] text-black text-[11px] font-medium py-2 rounded-md text-center w-24">02:59 PM</div></TableCell>
                            <TableCell><div className="bg-[#e6f0ff] text-black text-[11px] font-medium py-2 rounded-md text-center w-24">02:59 PM</div></TableCell>
                            <TableCell><div className="bg-[#fff2e6] text-black text-[11px] font-medium py-2 rounded-md text-center w-24">02:59 PM</div></TableCell>
                            <TableCell>
                            <div className="flex items-center gap-1.5 border border-blue-200 text-blue-600 px-2 py-1 rounded-md w-fit">
                                <LogOut size={14} />
                                <span className="text-[10px] font-bold ">Out of Office</span>
                            </div>
                            </TableCell>
                        </TableRow>

                        {/* Row 3 - Out of Office */}
                        <TableRow className="h-11 border-b border-[#ebebeb]">
                            <TableCell className="px-4"><div className="bg-[#ccffeb] text-[#006644] text-[11px] font-medium py-2 rounded-md text-center w-24">11:59 AM</div></TableCell>
                            <TableCell className="min-w-[280px]">
                            <span className="text-blue-600 font-semibold text-[11px]">[kzt-242]</span>
                            <span className="text-slate-700 text-[11px] ml-1">Create Pages using new design system (Design)</span>
                            </TableCell>
                            <TableCell>
                            <div className="flex justify-center">
                                <div className="border border-slate-200 p-1 rounded-sm">
                                <LucideDollarSign size={14} className="text-slate-400" />
                                </div>
                            </div>
                            </TableCell>
                            <TableCell><div className="bg-[#ffe5b7] text-black text-[11px] font-medium py-2 rounded-md text-center w-24">02:59 PM</div></TableCell>
                            <TableCell><div className="bg-[#e6f0ff] text-black text-[11px] font-medium py-2 rounded-md text-center w-24">02:59 PM</div></TableCell>
                            <TableCell><div className="bg-[#fff2e6] text-black text-[11px] font-medium py-2 rounded-md text-center w-24">02:59 PM</div></TableCell>
                            <TableCell>
                            <div className="flex items-center gap-1.5 border border-blue-200 text-blue-600 px-2 py-1 rounded-md w-fit">
                                <LogOut size={14} />
                                <span className="text-[10px] font-bold ">Out of Office</span>
                            </div>
                            </TableCell>
                        </TableRow>

                        {/* Row 3 - Out of Office */}
                        <TableRow className="h-11 border-b border-[#ebebeb]">
                            <TableCell className="px-4"><div className="bg-[#ccffeb] text-[#006644] text-[11px] font-medium py-2 rounded-md text-center w-24">11:59 AM</div></TableCell>
                            <TableCell className="min-w-[280px]">
                            <span className="text-blue-600 font-semibold text-[11px]">[kzt-242]</span>
                            <span className="text-slate-700 text-[11px] ml-1">Create Pages using new design system (Design)</span>
                            </TableCell>
                            <TableCell>
                            <div className="flex justify-center">
                                <div className="border border-slate-200 p-1 rounded-sm">
                                <LucideDollarSign size={14} className="text-slate-400" />
                                </div>
                            </div>
                            </TableCell>
                            <TableCell><div className="bg-[#ffe5b7] text-black text-[11px] font-medium py-2 rounded-md text-center w-24">02:59 PM</div></TableCell>
                            <TableCell><div className="bg-[#e6f0ff] text-black text-[11px] font-medium py-2 rounded-md text-center w-24">02:59 PM</div></TableCell>
                            <TableCell><div className="bg-[#fff2e6] text-black text-[11px] font-medium py-2 rounded-md text-center w-24">02:59 PM</div></TableCell>
                            <TableCell>
                            <div className="flex items-center gap-1.5 border border-blue-200 text-blue-600 px-2 py-1 rounded-md w-fit">
                                <LogOut size={14} />
                                <span className="text-[10px] font-bold ">Out of Office</span>
                            </div>
                            </TableCell>
                        </TableRow>



                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
      )}
    </section>
  )
}
