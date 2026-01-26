import { X, MoreHorizontal, Clock, ArrowLeft, Dot, Ellipsis, Undo2, ExternalLink, Check, Link } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewLogsSidebar({ isOpen, onClose }: SidebarProps) {
    const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const toggleMenu = (index: number) => {
    setActiveMenu(activeMenu === index ? null : index);
  };
  return (
    <>
      {/* Background Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 transition-opacity" onClick={onClose} />
      )}

      {/* Sidebar Container */}
      <div className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="hover:bg-slate-100 p-1 rounded-full">
               <ArrowLeft size={20} className="text-black " />
            </button>
            <h2 className="font-semibold text-black text-sm">Time Logs Sent For Review</h2>
          </div>
          <div className="bg-blue-50 p-1.5 rounded-full text-[#4056fe] cursor-pointer">
            <button onClick={onClose} className="hover:bg-slate-100 p-1 rounded-full">
               <X size={14} />
            </button>
            
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-3 flex flex-col gap-4 overflow-y-auto h-[calc(100vh-60px)] bg-slate-50/30">
          {[...Array(6)].map((_, i) => (
            <div key={i} className='flex flex-col border border-[#ebebeb] rounded-[10px] p-2'>
                <div className='flex flex-col border-l-2 border-[#4056fe] px-2 pb-2 gap-1.5'>
                    <div className='flex flex-col border-b py-1 border-[#ebebeb]'>
                        <div className='flex flex-row justify-between'>
                            <p className='text-xs text-black'>8h 50m</p>
                            <div className='flex flex-row gap-2 items-center'>
                                <button className='flex flex-row gap-2 text-[#a85c25] items-center bg-[#fce8ca] px-1 py-0.25 border border-[#a85c25] rounded-[5px]'>
                                    <Clock size={14}/>
                                    <p className='text-xs'>Pending</p>
                                </button>
                                <div className="relative">
                    <Ellipsis 
                      className='text-[#697588] cursor-pointer hover:text-slate-900' 
                      size={15} 
                      onClick={() => toggleMenu(i)} 
                    />

                    {/* DROPDOWN INTERFACE (image_fbd7d2.png) */}
                    {activeMenu === i && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-[#ebebeb] rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in duration-150">
                        {/* Open Option */}
                        <div className="flex items-center justify-between px-3 py-2 bg-[#f3f9ff] text-[#4056fe] text-[12px] font-medium cursor-pointer">
                          <div className="flex items-center gap-2">
                            <ExternalLink size={14} />
                            <span>Open</span>
                          </div>
                          <Check size={12} />
                        </div>
                        
                        {/* Copy URL Option */}
                        <div className="flex items-center gap-2 px-3 py-2 text-slate-600 text-[12px] hover:bg-slate-50 cursor-pointer transition-colors">
                          <Link size={14} />
                          <span>Copy URL</span>
                        </div>

                        <div className="h-[1px] bg-[#ebebeb] mx-1" />

                        {/* Withdraw Option */}
                        <div className="flex items-center gap-2 px-3 py-2 text-slate-600 text-[12px] hover:bg-slate-50 cursor-pointer transition-colors">
                          <Undo2 size={14} />
                          <span>Withdraw</span>
                        </div>
                      </div>
                    )}
                  </div>
                
                            </div>
                        </div>
                        <p className='text-[#697588] text-[11px]'>Jan 8- Jan 13, 25</p>
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <p className='text-[#697588] text-[11px]'> Submitted by:  </p>
                        <span className='bg-[#4056fe] rounded-full text-white text-[7px] p-1'>AH</span>
                        <p className='text-[#697588] text-[11px]'> Alif Hasan, Jan-12 at 12:00pm  </p>
                    </div> 
                </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}