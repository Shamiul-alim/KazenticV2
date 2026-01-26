import { CalendarDays, CheckCircle2, ChevronDown, ChevronLeftIcon, ChevronRight, CircleCheckBig, Clock, DollarSign, LayoutPanelLeft, Link2Off, MoreHorizontal } from 'lucide-react'
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/time-tracker/ui/table'
export default function TimeSheets() {

  const [openRows, setOpenRows] = useState<Record<number, boolean>>({ 5: true });
  const toggleRow = (id: number) => {
    setOpenRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
    
  const rows = Array.from({ length: 7 }, (_, i) => ({
    id: i,
    taskCode: "[kzt-242]",
    taskName: "Create Pages using new design system.",
    isCompleted: i > 5 
  }));
  return (
    <div className="border border-[#ebebeb] rounded-lg bg-white overflow-hidden h-auto mx-4 my-4">
      <Table className="border-collapse">
        <TableHeader className="bg-slate-50">
          <TableRow className="bg-[#f3f9ff] items-center border-b border-[#ebebeb] hover:bg-[#f3f9ff]">
            <TableHead className="text-[11px] font-semibold text-slate-900 border-r border-[#ebebeb] w-[300px]">Tasks</TableHead>
            {['Sun, Dec 8', 'Mon, Dec 9', 'Tue, Dec 10', 'Wed, Dec 11', 'Thu, Dec 13', 'Fri, Dec 14', 'Sat, Dec 15', 'Total'].map((day) => (
              <TableHead key={day} className="text-[11px] font-semibold text-slate-900 border-r border-[#ebebeb] text-center w-[80px]">
                {day}
              </TableHead>
            ))}
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => {
            const isOpen = openRows[row.id];

            return (
              <React.Fragment key={row.id}>
                {/* Main Task Row */}
                <TableRow className={`${isOpen ? 'bg-[#f3f9ff]/20' : 'bg-white'} border-b border-[#ebebeb] transition-colors hover:bg-slate-50/50`}>
                  <TableCell className="border-r border-[#ebebeb] py-1 px-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleRow(row.id)} className="text-slate-400 hover:text-slate-600 transition-transform">
                        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </button>
                      <p className="text-[12px] tracking-tighter">
                        <span className="text-black font-medium mr-1">{row.taskCode}</span> 
                        {row.taskName}
                      </p>
                    </div>
                  </TableCell>

                  {/* Daily Log Cells */}
                  <TableCell className="border-r border-[#ebebeb] text-center text-slate-400 bg-slate-50/50">-</TableCell>
                  <TableCell className="border-r border-[#ebebeb] text-center text-[12px] relative p-0">
                    <div className="absolute top-0 left-[0%] right-[70%] h-[3px] bg-red-400 rounded-b-sm" />
                    1h
                  </TableCell>
                  {[...Array(4)].map((_, i) => (
                    <TableCell key={i} className="border-r border-[#ebebeb] text-center text-[12px] relative p-0">
                      <div className="absolute top-0 left-1 right-1 h-[3px] bg-emerald-500 rounded-b-sm" />
                      9h
                    </TableCell>
                  ))}
                  <TableCell className="border-r border-[#ebebeb] text-center text-slate-400 bg-slate-50/50">-</TableCell>
                  <TableCell className="border-r border-[#ebebeb] text-center font-bold text-[12px]">37h</TableCell>

                  {/* Actions (Clock or Check) */}
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      {row.isCompleted ? (
                        <CheckCircle2 size={16} className="text-emerald-500" />
                      ) : (
                        <Clock size={16} className="text-orange-400 stroke-[2.5]" />
                      )}
                      <MoreHorizontal size={18} className="text-slate-300 cursor-pointer hover:text-slate-600" />
                    </div>
                  </TableCell>
                </TableRow>

                {/* Sub-Rows Breakdown */}
                {isOpen && (
                  <>
                    <TableRow className="bg-[#f8fbff] border-b border-[#ebebeb]/50 border-dotted">
                      <TableCell className="pl-10 py-1 border-r border-[#ebebeb]">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#dbe9ff] text-black rounded-[5px] border border-[#bfdbfe] text-[11px]">
                            <Clock className='text-[#4b60ff]' size={12} /> 11:59 AM - 2:00 PM
                          </div>
                          <div className="p-1 bg-white border border-[#ebebeb] rounded shadow-sm">
                            <DollarSign size={12} className="text-emerald-500" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell colSpan={9} className="bg-white/50 border-r border-[#ebebeb]"></TableCell>
                    </TableRow>
                    <TableRow className="bg-[#f8fbff] border-b border-[#ebebeb]">
                      <TableCell className="pl-10 py-1 border-r border-[#ebebeb]">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#dbe9ff] text-black rounded-[5px] border border-[#bfdbfe] text-[11px]">
                            <Clock className='text-[#4b60ff]' size={12} /> 2:30 PM - 4:00 PM
                          </div>
                          <div className="p-1 bg-white border border-[#ebebeb] rounded shadow-sm">
                            <Link2Off size={12} className="text-slate-400" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell colSpan={9} className="bg-white/50 border-r border-[#ebebeb]"></TableCell>
                    </TableRow>
                  </>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  )
}
