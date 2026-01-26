import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  RotateCcw, 
  CheckCircle, 
  CheckCircle2, 
  MoveRight, 
  ArrowRight, 
  Settings 
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/time-tracker/ui/table'
import { Checkbox } from './ui/checkbox';

const reviewData = [
  { id: 1, name: "Alif Hassan", initials: "AH", date: "Dec 07-Dec 13, 2025", duration: "9h 33m", limit: "9h", payable: "9h 33m", overLimit: "9h 33m", status: "to-review" },
  { id: 2, name: "Alif Hassan", initials: "AH", date: "Dec 07-Dec 13, 2025", duration: "9h 33m", limit: "9h", payable: "9h 33m", overLimit: "9h 33m", status: "changes-required" },
  { id: 3, name: "Alif Hassan", initials: "AH", date: "Dec 07-Dec 13, 2025", duration: "9h 33m", limit: "9h", payable: "9h 33m", overLimit: "9h 33m", status: "approved" },
  { id: 4, name: "Alif Hassan", initials: "AH", date: "Dec 07-Dec 13, 2025", duration: "9h 33m", limit: "9h", payable: "9h 33m", overLimit: "9h 33m", status: "to-review" },
  { id: 5, name: "Alif Hassan", initials: "AH", date: "Dec 07-Dec 13, 2025", duration: "9h 33m", limit: "9h", payable: "9h 33m", overLimit: "9h 33m", status: "changes-required" },
  { id: 6, name: "Alif Hassan", initials: "AH", date: "Dec 07-Dec 13, 2025", duration: "9h 33m", limit: "9h", payable: "9h 33m", overLimit: "9h 33m", status: "approved" },
  { id: 7, name: "Alif Hassan", initials: "AH", date: "Dec 07-Dec 13, 2025", duration: "9h 33m", limit: "9h", payable: "9h 33m", overLimit: "9h 33m", status: "to-review" },
  { id: 8, name: "Alif Hassan", initials: "AH", date: "Dec 07-Dec 13, 2025", duration: "9h 33m", limit: "9h", payable: "9h 33m", overLimit: "9h 33m", status: "changes-required" },
  { id: 9, name: "Alif Hassan", initials: "AH", date: "Dec 07-Dec 13, 2025", duration: "9h 33m", limit: "9h", payable: "9h 33m", overLimit: "9h 33m", status: "to-review" },
];

export const ReviewRequest = ({ onReviewClick = () => {} }: { onReviewClick: (row: any) => void }) => {
  const [openSections, setOpenSections] = useState({ 
    review: true, 
    changes: true, 
    approved: true 
  });

  const renderTable = (status: string) => {
    const items = reviewData.filter(item => item.status === status);
    if (items.length === 0) return <p className="p-4 text-xs text-slate-400">No records found.</p>;
    
   // ... keep state and data
    
    return (
      <div className="rounded-xl border border-[#ebebeb] overflow-hidden mb-8">
        <Table>
          <TableHeader className="bg-[#f3f9ff]">
            <TableRow className="hover:bg-transparent border-[#ebebeb]">
              <TableHead className="w-[30px] text-center">
                <Checkbox className="border-slate-300 data-[state=checked]:bg-[#4056fe]" />
              </TableHead>
              <TableHead className="text-[11px]  text-black  tracking-tighter">Details</TableHead>
              <TableHead className="w-[110px] text-[11px]  text-black  tracking-tighter text-center">Duration</TableHead>
              <TableHead className="w-[110px] text-[11px]  text-black  tracking-tighter text-center">Limit</TableHead>
              <TableHead className="w-[110px] text-[11px]  text-black  tracking-tighter text-center">Payable</TableHead>
              <TableHead className="w-[110px] text-[11px]  text-black  tracking-tighter text-center">Over Limit</TableHead>
              <TableHead className="w-[180px] text-[11px]  text-black  tracking-tighter">Status/Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((row) => (
              <TableRow key={row.id} className="border-[#f3f4f6] hover:bg-slate-50/50 transition-colors">
                <TableCell className="text-center">
                  <Checkbox className="border-slate-300 data-[state=checked]:bg-[#4056fe]" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#4056fe] text-white flex items-center justify-center text-[10px]">
                        {row.initials}
                      </div>
                      <span className="text-[12px] font-medium text-black">{row.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-slate-400">{row.date}</span>
                      <button 
                        type="button"
                        onClick={() => onReviewClick(row)} // This sends the 'row' data to the Manager
                        className="px-3 py-1 bg-[#4056fe] text-white text-[11px] rounded-[4px] flex items-center gap-1 hover:bg-blue-600"
                      >
                        Review <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="bg-[#dbe9ff] text-black text-[11px] tracking-tighter py-1.5 rounded-[4px] text-center">
                    {row.duration}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="bg-[#c4fee3] text-black text-[11px] tracking-tighter py-1.5 rounded-[4px] text-center">
                    {row.limit}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="bg-[#ffedd5] text-black text-[11px] tracking-tighter py-1.5 rounded-[4px] text-center">
                    {row.payable}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="bg-[#fee2e2] text-black text-[11px] tracking-tighter py-1.5 rounded-[4px] text-center">
                    {row.overLimit}
                  </div>
                </TableCell>
                <TableCell>
                  {status === 'to-review' && (
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 border border-[#ebebeb] rounded-[4px] bg-white text-orange-500 hover:bg-orange-50 transition-colors">
                        <MoveRight size={16} />
                      </button>
                      <button className="p-1.5 border border-[#ebebeb] rounded-[4px] bg-white text-emerald-500 hover:bg-emerald-50 transition-colors">
                        <CheckCircle2 size={16} />
                      </button>
                    </div>
                  )}
                  {status === 'changes-required' && (
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#fff7ed] border border-[#ffedd5] text-[#c2410c] text-[11px] font-bold rounded-[4px]">
                      <Settings size={12} />
                      <span>Changes required</span>
                    </div>
                  )}
                  {status === 'approved' && (
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#f0fdf4] border border-[#dcfce7] text-[#16a34a] text-[11px] font-bold rounded-[4px]">
                      <CheckCircle size={12} />
                      <span>Approved</span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-white p-6 space-y-4 animate-in fade-in duration-500">
      
      {/* To Review */}
      <div className="space-y-4 ">
        <button 
          onClick={() => setOpenSections(prev => ({ ...prev, review: !prev.review }))}
          className="flex items-center gap-2 group"
        >
          {openSections.review ? <ChevronDown size={18} className="text-slate-400" /> : <ChevronRight size={18} className="text-slate-400" />}
          <div className='flex flex-row gap-2 items-center'>
            <div className="flex items-center gap-2 px-3 py-1 border border-[#4056fe] rounded-lg text-[#4056fe] bg-white group-hover:bg-blue-50 transition-colors">
            <RotateCcw size={14} />
            <span className="text-[11px] font-bold tracking-tight">To Review</span>
          </div>
            <p className="text-[11px] items-center text-[#4056fe] bg-[#f3f9ff] rounded-[5px] border border-[#4056fe] px-2 py-0.5">
              {reviewData.filter(item => item.status === "to-review").length}
            </p>
          </div>
        </button>
        {openSections.review && renderTable('to-review')}
      </div>

      {/* Changes Required */}
      <div className="space-y-4 ">
        <div className='flex flex-row gap-2 items-center'>
          <button 
          onClick={() => setOpenSections(prev => ({ ...prev, changes: !prev.changes }))}
          className="flex items-center gap-2 group"
        >
          {openSections.changes ? <ChevronDown size={18} className="text-slate-400" /> : <ChevronRight size={18} className="text-slate-400" />}
          <div className="flex items-center gap-2 px-3 py-1 bg-[#fff7ed] border border-[#fdba74] rounded-lg text-[#c2410c] group-hover:bg-orange-100/50 transition-colors">
            <Settings size={14} />
            <span className="text-[11px] font-bold tracking-tight">Changes Required</span>
          </div>
        </button>
        <p className="text-[11px] items-center text-[#4056fe] bg-[#f3f9ff] rounded-[5px] border border-[#4056fe] px-2 py-0.5">
          {reviewData.filter(item => item.status === "changes-required").length}
        </p>
        </div>
        {openSections.changes && renderTable('changes-required')}
      </div>

      {/* Approved */}
      <div className="space-y-4">
        <div className='flex flex-row gap-2 items-center'>
          <button 
          onClick={() => setOpenSections(prev => ({ ...prev, approved: !prev.approved }))}
          className="flex items-center gap-2 group"
        >
          {openSections.approved ? <ChevronDown size={18} className="text-slate-400" /> : <ChevronRight size={18} className="text-slate-400" />}
          <div className="flex items-center gap-2 px-3 py-1 bg-[#f0fdf4] border border-[#bcf0da] rounded-lg text-[#16a34a] group-hover:bg-emerald-50 transition-colors">
            <CheckCircle size={14} />
            <span className="text-[11px] font-bold tracking-tight">Approved</span>
          </div>
        </button>
        <p className="text-[11px] items-center text-[#4056fe] bg-[#f3f9ff] rounded-[5px] border border-[#4056fe] px-2 py-0.5">
          {reviewData.filter(item => item.status === "approved").length}
        </p>
        </div>
        {openSections.approved && renderTable('approved')}
      </div>

    </div>
  );
};