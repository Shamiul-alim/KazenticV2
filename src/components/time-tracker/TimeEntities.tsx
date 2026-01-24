import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/time-tracker/ui/table'
import { 
  ChevronDown, Clock, MoreHorizontal, DollarSign, 
  Link2Off, Calendar, ChevronRight 
} from 'lucide-react';

const TimeEntities = () => {
  // Mock data representing the groups in your screenshot
  const dayGroups = [
    { date: "Mon, Jan 8", total: "9h", target: "8h" },
    { date: "Tue, Jan 9", total: "9h", target: "8h" }
  ];

  const rowsPerDay = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col gap-6 p-4 bg-slate-50/30 min-h-screen">
      {dayGroups.map((group, groupIdx) => (
        <div key={groupIdx} className="flex flex-col gap-2">
          
          {/* Section Header: Date and Daily Total */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-slate-600 bg-white border border-[#ebebeb] px-2 py-1 rounded-md shadow-sm">
              <ChevronDown size={14} className="text-slate-400" />
              <Calendar size={14} className="text-slate-400" />
              <span className="text-xs font-medium">{group.date}</span>
            </div>
            
            <div className="flex items-center gap-1 bg-white border border-[#ebebeb] px-2 py-1 rounded-md text-[11px] font-medium shadow-sm">
              <Clock size={12} className="text-red-500" />
              <span className="text-red-500">{group.total}</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-500">{group.target}</span>
            </div>
          </div>

          {/* Table for this specific day */}
          <div className="border border-[#ebebeb] rounded-lg bg-white overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-[#f8f9fa]">
                <TableRow className="border-b border-[#ebebeb] hover:bg-transparent">
                  <TableHead className="text-[11px] font-semibold text-slate-500 w-[35%]">Task</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-500 w-[15%] text-center">Description</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-500 w-[10%] text-center">Payable</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-500 w-[10%] text-center">Tags</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-500 w-[10%] text-center">Signed In</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-500 w-[10%] text-center">Signed Out</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-500 w-[10%] text-center">Duration</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              
              <TableBody>
                {rowsPerDay.map((row, idx) => (
                  <TableRow key={idx} className="border-b border-[#ebebeb] last:border-0 hover:bg-slate-50/50">
                    <TableCell className="py-3 px-4 text-[12px] text-slate-700">
                      [kzt-242] Create Pages using new design system.
                    </TableCell>
                    
                    <TableCell className="text-center text-slate-400">-</TableCell>
                    
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        {idx % 3 === 0 ? (
                          <div className="p-1.5 border border-[#ebebeb] rounded-md"><DollarSign size={14} className="text-[#059669]" /></div>
                        ) : (
                          <div className="p-1.5 border border-[#ebebeb] rounded-md"><DollarSign size={14} className="text-slate-300" /></div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <span className="px-2 py-0.5 bg-[#f1e5ff] text-[#732acc] border border-[#732acc] rounded text-[10px] font-medium">
                        Kazentic
                      </span>
                    </TableCell>

                    <TableCell className="text-center">
                      <span className="px-3 py-1 bg-[#c4fee3] text-black rounded-md text-[11px] font-medium">11:59 AM</span>
                    </TableCell>

                    <TableCell className="text-center">
                      <span className="px-3 py-1 bg-[#ffd0cd] text-black rounded-md text-[11px] font-medium">02:59 PM</span>
                    </TableCell>

                    <TableCell className="text-center">
                      <span className="px-3 py-1 bg-[#dbe9ff] text-black rounded-md text-[11px] font-medium">05H : 00M</span>
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-orange-400" />
                        <MoreHorizontal size={18} className="text-slate-300 cursor-pointer" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimeEntities;