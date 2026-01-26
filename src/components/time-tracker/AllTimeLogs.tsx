import { ArrowLeft, Bolt, CheckCircle2, ChevronDown, Clock, DollarSign, MoreHorizontal, Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '@/components/time-tracker/ui/Button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/time-tracker/ui/table'
import { TimeLogDetails } from '../TimeLogDetails';

export default function AllTimeLogs() {
  const members = [
    { id: 1, name: "Alif Hassan", avatar: "AH" },
    { id: 2, name: "Tonmoy Asif", avatar: "TA" },
    { id: 3, name: "John Doe", avatar: "JD" },
    { id: 4, name: "Nat qwe", avatar: "NQ" },
  ];

  const [isMemberMenuOpen, setIsMemberMenuOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDetailRow, setSelectedDetailRow] = useState<any | null>(null);
  const [openSettingsId, setOpenSettingsId] = useState<number | null>(null);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });
  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const rows = [
    { id: 1, logo: "AH", Name: "Alif Hassan", dailyHours: [0, 8, 8, 8, 8, 8, 0], isCompleted: true },
    { id: 2, logo: "JD", Name: "John Doe", dailyHours: [0, 4, 8, 2, 8, 6, 0], isCompleted: false },
    { id: 3, logo: "JD", Name: "John Doe", dailyHours: [0, 8, 7, 8, 8, 8, 0], isCompleted: true },
    { id: 4, logo: "JD", Name: "John Doe", dailyHours: [2, 2, 2, 2, 2, 2, 2], isCompleted: false },
    { id: 5, logo: "JD", Name: "John Doe", dailyHours: [0, 8, 8, 8, 4, 8, 0], isCompleted: false },
    { id: 6, logo: "JD", Name: "John Doe", dailyHours: [0, 0, 8, 8, 8, 8, 0], isCompleted: true }
  ];

  if (selectedDetailRow) {
    return (
      <TimeLogDetails 
        data={selectedDetailRow} 
        onBack={() => setSelectedDetailRow(null)} 
      />
    );
  }

  return (
    <section id="allLogs" className='w-full h-full bg-white flex flex-col'>
      {/* Header Controls */}
      <div className='flex flex-row justify-between px-4 py-2 border-b border-[#ebebeb] items-center'>
        <div className='flex flex-row px-2 py-0.5 border border-[#ebebeb] rounded-[5px] items-center h-fit bg-slate-50/50'>
          <DollarSign className='text-[#858f9f]' size={12} strokeWidth={1.5} />
          <p className='text-[#858f9f] text-[11px] font-medium'>Payable</p>
        </div>

        <div className="relative"> 
          <Button 
            onClick={() => setIsMemberMenuOpen(!isMemberMenuOpen)}
            className='flex flex-row px-2 py-1 border border-[#ebebeb] rounded-[5px] items-center gap-1 cursor-pointer bg-white hover:bg-slate-50 shadow-none h-7'
          >
            <p className='text-[#858f9f] text-xs'>All members</p>
            <ChevronDown className='text-[#858f9f]' size={15} strokeWidth={1.5} />
          </Button>

          {isMemberMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsMemberMenuOpen(false)} />
              <div className="absolute top-full right-0 mt-1 w-56 bg-white border border-[#ebebeb] rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in duration-150">
                <div className="p-2 border-b border-[#f8f9fa]">
                  <div className="relative flex items-center bg-[#f8f9fa] rounded-lg px-2 py-1.5">
                    <Search className="text-slate-400 mr-2" size={14} />
                    <input 
                      type="text" 
                      placeholder="Search" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent text-[13px] outline-none w-full text-slate-600"
                    />
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto py-1">
                  {filteredMembers.map((member) => (
                    <div 
                      key={member.id}
                      onClick={() => {
                        setSelectedMember(member.id);
                        setIsMemberMenuOpen(false);
                      }}
                      className={`flex items-center justify-between px-3 py-2 cursor-pointer ${selectedMember === member.id ? 'bg-[#f3f9ff]' : 'hover:bg-slate-50'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                          <img src={`https://ui-avatars.com/api/?name=${member.name}&background=random`} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                        <span className={`text-[13px] ${selectedMember === member.id ? 'text-[#4056fe] font-medium' : 'text-slate-600'}`}>{member.name}</span>
                      </div>
                      <div className={`w-3.5 h-3.5 rounded-[4px] border flex items-center justify-center ${selectedMember === member.id ? 'border-[#4056fe]' : 'border-slate-300'}`}>
                        {selectedMember === member.id && <div className="w-2 h-2 bg-[#4056fe] rounded-[2px]" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="border border-[#ebebeb] rounded-lg bg-white overflow-hidden mx-4 my-4 shadow-sm">
        <Table className="border-collapse">
          <TableHeader className="bg-slate-50">
            <TableRow className="bg-[#f3f9ff] border-b border-[#ebebeb] hover:bg-[#f3f9ff] h-8">
              <TableHead className="tracking-tighter text-[10px] py-0 px-3 font-bold text-black border-r border-[#ebebeb] w-[450px] h-8">
                People
              </TableHead>

              {['Sun, Dec 8', 'Mon, Dec 9', 'Tue, Dec 10', 'Wed, Dec 11', 'Thu, Dec 12', 'Fri, Dec 13', 'Sat, Dec 14', 'Total'].map((day) => (
                <TableHead 
                  key={day} 
                  className="tracking-tighter text-[10px] py-0 px-1 font-bold text-black border-r border-[#ebebeb] text-center w-[80px] h-8 whitespace-nowrap"
                >
                  {day}
                </TableHead>
              ))}
              
              
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((row) => {
              const rowTotal = row.dailyHours.reduce((acc, curr) => acc + curr, 0);
              
              return (
                <TableRow 
                  key={row.id}
                  onClick={() => {
                    if (openSettingsId === null) {
                      setSelectedDetailRow(row);
                    }
                  }}
                  className="h-8 bg-white border-b border-[#ebebeb] cursor-pointer hover:bg-slate-50/80 transition-colors"
                >
                  <TableCell className="border-r border-[#ebebeb] py-0 px-3 h-8">
                        <div className='flex flex-row justify-between px-0'>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-5 h-5 text-white text-[9px] bg-[#4056fe] rounded-full uppercase">
                            {row.logo}
                          </span> 
                          <span className="text-[11px] font-medium text-slate-800 truncate">{row.Name}</span>
                          <span className="text-[10px] text-slate-300">({rowTotal}h)</span>
                      </div>
                      <div className="relative">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); 
                            e.preventDefault(); 
                            
                            const rect = e.currentTarget.getBoundingClientRect();
                            setPopoverPos({ 
                              top: rect.bottom + 8, 
                              left: rect.left - 280 
                            });
                            
                            setOpenSettingsId(openSettingsId === row.id ? null : row.id);
                          }}
                          className={`p-1 rounded-md transition-colors ${openSettingsId === row.id ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
                        >
                          <Bolt className='text-[#9aa3ad]' size={18}/>
                        </button>
                        {openSettingsId === row.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-[1000]" 
                              onClick={(e) => {
                                e.stopPropagation(); 
                                setOpenSettingsId(null);
                              }} 
                            />
                            
                            <div 
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                position: 'fixed',
                                top: `${popoverPos.top}px`,
                                left: `${popoverPos.left}px`,
                              }}
                              className="z-[1001] w-[320px] bg-white border border-[#ebebeb] rounded-xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-150"
                            >
                            <div className="space-y-2 text-left">
                              <div className="flex justify-between items-center">
                                <span className="text-[11px] text-[#191f38]">{row.Name}'s Timezone</span>
                                <span className="text-[11px] text-[#191f38]">+06 (UTC+6)</span>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-[11px] text-[#191f38]">My Capacity</span>
                                <div className="flex items-center gap-1 border border-[#ebebeb] rounded-lg px-2 py-1 bg-white min-w-[100px] justify-between cursor-pointer">
                                  <span className="text-[12px] text-slate-600">Weekly</span>
                                  <ChevronDown size={14} className="text-slate-400" />
                                </div>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-[11px] text-[#191f38]">Weekly Hours</span>
                                <div className="flex items-center gap-1 border border-[#ebebeb] rounded-lg px-2 py-1 bg-white min-w-[100px] justify-between cursor-pointer">
                                  <span className="text-[11px] text-[#191f38]">40h</span>
                                  <ChevronDown size={14} className="text-slate-400" />
                                </div>
                              </div>
                              
                              <div className="pt-2 border-t border-[#f8f9fa] flex justify-end gap-2">
                                <button 
                                  className="px-4 py-1.5 text-[12px] font-semibold text-[#4056fe] border border-[#4056fe] rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  Reset
                                </button>
                                <button className="px-6 py-1.5 text-[12px] font-semibold text-white bg-[#4056fe] rounded-lg hover:bg-blue-600 shadow-sm transition-colors">
                                  Save
                                </button>
                              </div>
                            </div>
                            </div>
                          </>
                        )}
                      </div>
                      </div>
                    </TableCell>

                  {row.dailyHours.map((hours, index) => {
                    const isFullDay = hours >= 8;
                    const percentage = Math.min((hours / 8) * 100, 100);

                    return (
                      <TableCell 
                        key={index} 
                        className="h-8 p-0 text-center bg-[#f3f5f7]/50 text-slate-700 text-[11px] border-r border-[#ebebeb] w-[80px]"
                        style={{
                          borderTop: '6px solid',
                          borderImage: isFullDay 
                            ? 'none' 
                            : `linear-gradient(to right, #fd6667 ${percentage}%, #e5e5e4 ${percentage}%) 1`,
                          borderTopColor: isFullDay ? '#10b880' : '#ebebeb'
                        }}
                      >
                        {hours}h
                      </TableCell>
                    );
                  })}

                  <TableCell className="border-r border-[#ebebeb] text-center font-bold text-[11px] bg-white text-slate-900">
                    {rowTotal}h
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}