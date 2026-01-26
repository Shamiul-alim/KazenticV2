import React from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  MessageSquareDiff, 
  Clock, 
  DollarSign, 
  Slash,
  MoreHorizontal,
  Calendar,
  ChevronDown,
  ArrowRight,
  Hourglass,
  CircleArrowRight,
  CircleCheck
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/time-tracker/ui/table';

interface ReviewDetailProps {
  data: any;
  onBack: () => void;
}

export default function ReviewDetail({ data, onBack }: ReviewDetailProps) {
  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen px-0 py-2 space-y-6 animate-in fade-in duration-300">
      
      {/* 1. TOP NAV & ACTIONS */}
      <div className="flex items-center justify-between bg-white px-2 py-1 rounded-lg border-b border-[#ebebeb]">
        <div className="flex items-center gap-1">
          <button onClick={onBack} className="p-1 hover:bg-slate-100 rounded-md transition-colors">
            <ArrowLeft size={18} className="text-slate-600" />
          </button>
          <div className="flex items-center gap-2 px-2 py-1 bg-slate-50 rounded border border-slate-100">
            <div className="w-4 h-4 p-1 rounded-full bg-[#4056fe] text-white flex items-center justify-center text-[9px]">
              {data.initials}
            </div>
            <span className="text-xs  text-black">{data.name}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded border border-slate-100 text-[11px] text-slate-500">
            <Calendar size={14} />
            <span>{data.date}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0 bg-[#fce8ca] text-[#a5541b] rounded border border-[#a5541b] text-[11px] font-bold">
            <Clock size={14} />
            <span>Pending</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-0.5 text-black text-[12px] border border-[#ebebeb] hover:bg-blue-50 rounded-md transition-colors">
            <ArrowRight className='text-[#4c60fe]' size={14} /> Request Change
          </button>
          <button className="flex items-center gap-1.5 px-3 py-0.5 bg-[#f0fdf4] border border-[#ebebeb] text-black text-[11px] rounded-md hover:bg-emerald-100 transition-colors">
            <CheckCircle2 className='text-[#16a34a]' size={14} /> Approve
          </button>
        </div>
      </div>

      {/* 2. SUMMARY CARDS */}
      <div className="flex flex-row gap-3 mx-5 items-center">
        <div className='flex flex-row gap-2 items-center border border-[#ebebeb] rounded-[10px] pr-20 pl-3 py-2 bg-[#fcfcfd]'> 
          <Hourglass className='bg-[#f3f9ff] border rounded-[5px] border-color[#4056fe] text-[#4056fe] p-2' size={40}/>
          <div className='flex flex-col gap-1  justify-start'>
            <p className='text-[11px] font-bold text-black'>Time Tracker</p>
            <p className='text-xs text-black'>36h 5m <span className='text-[#697588]'>/40h</span></p>
          </div>
        </div>

        <div className='flex flex-row gap-2 items-center border border-[#ebebeb] rounded-[10px] pr-20 pl-3 py-2 bg-[#fcfcfd]'> 
          <DollarSign className='bg-[#c4fee3] border rounded-[5px] border-color[#4ab190] text-[#4ab190] p-2' size={40}/>
          <div className='flex flex-col gap-1  justify-start'>
            <p className='text-[11px] font-bold text-black'>Payable</p>
            <p className='text-xs text-[#697588]'>25h</p>
          </div>
        </div>

        <div className='flex flex-row gap-2 items-center border border-[#ebebeb] rounded-[10px] pr-20 pl-3 py-2 bg-[#fcfcfd]'> 
          <DollarSign className='bg-[#fefffe] border rounded-[5px] border-color[#efefef] text-[#697588] p-2' size={40}/>
          <div className='flex flex-col gap-1  justify-start'>
            <p className='text-[11px] font-bold text-black'>Non Payable</p>
            <p className='text-xs text-black'>6h 5m <span className='text-[#697588]'>/40h</span></p>
          </div>
        </div>

        <div className='flex flex-row gap-2 items-center border border-[#ebebeb] rounded-[10px] pr-20 pl-3 py-2 bg-[#fcfcfd]'> 
          <CircleCheck className='bg-[#f3f9ff] border rounded-[5px] border-color[#efefef] text-[#697588] p-2' size={40}/>
          <div className='flex flex-col gap-1  justify-start'>
            <p className='text-[11px] font-bold text-black'>Approved At</p>
            <p className='text-xs text-black'>Thu, Jan 12, 2025 | 11:45 PM</p>
          </div>
        </div>
      </div>

      <div className='flex flex-row items-center mx-5'>
        <div className='flex flex-row px-1 py-0 border border-[#ebebeb] rounded-[5px] items-center justify-between'>
          <div className='flex flex-row gap-1 items-center'>
            <DollarSign className='text-[#858f9f] ' size={12} strokeWidth={1.5}/>
            <p className='text-[#858f9f] text-xs'>Payable</p>
          </div>
        </div>
      </div>

      {/* 3. TABLE SECTION */}
      <div className="bg-white rounded-xl mx-5 border border-[#ebebeb] overflow-hidden">
        {/* Date Row Header */}
        <div className="p-3 border-b border-[#ebebeb] flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2 text-black">
            <ChevronDown size={16} />
            <Calendar size={14} />
            <span className="text-[11px] font-bold">Mon, Jan 8</span>
          </div>
          <div className="text-[11px] font-bold text-black">9h <span className="text-black">/ 8h</span></div>
        </div>

        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="text-[10px] uppercase tracking-wider text-black border-none">
              <TableHead className="h-10">Task</TableHead>
              <TableHead className="h-10">Description</TableHead>
              <TableHead className="h-10">Payable</TableHead>
              <TableHead className="h-10">Tags</TableHead>
              <TableHead className="h-10">Signed In</TableHead>
              <TableHead className="h-10">Signed Out</TableHead>
              <TableHead className="h-10">Duration</TableHead>
              <TableHead className="h-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((item) => (
              <TableRow key={item} className="text-[11px] border-[#f8f8f8]">
                <TableCell className="font-medium text-black">[kzt-242] Create Pages using new design system.</TableCell>
                <TableCell className="text-black">-</TableCell>
                <TableCell>
                  {item % 2 === 0 ? <Slash size={14} className="text-slate-300" /> : <DollarSign size={14} className="text-emerald-500" />}
                </TableCell>
                <TableCell>
                  <span className="px-2 py-0.5 bg-purple-50 text-purple-600 border border-purple-100 rounded text-[10px]">Kazentic</span>
                </TableCell>
                <TableCell><span className="bg-[#c4fee3] px-2 py-1 rounded text-black">11:59 AM</span></TableCell>
                <TableCell><span className="bg-[#ffd0cd] px-2 py-1 rounded text-black">02:59 PM</span></TableCell>
                <TableCell><span className="bg-[#dbe9ff] px-2 py-1 rounded text-black ">05H : 00M</span></TableCell>
                <TableCell>
                   <div className="flex items-center gap-2">
                     <CheckCircle2 size={14} className="text-emerald-500" />
                     <MoreHorizontal size={14} className="text-slate-300" />
                   </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function SummaryCard({ icon, title, value, subValue, bgColor = "bg-white" }: any) {
  return (
    <div className={`${bgColor} p-4 rounded-xl border border-[#ebebeb] flex items-center gap-4`}>
      <div className="p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-bold text-slate-900">{title}</p>
        <p className="text-sm font-black text-slate-700">
          {value} <span className="text-slate-400 font-normal">{subValue}</span>
        </p>
      </div>
    </div>
  );
}