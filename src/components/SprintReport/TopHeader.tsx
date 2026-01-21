// /**
//  * TopHeader Component
//  *
//  * The primary navigation header for the application.
//  * Includes:
//  * - Brand Logo
//  * - Global Search with Voice input
//  * - Notification Center
//  * - User Profile & Account settings
//  */

// import * as React from "react"

// // --- Icons ---
// import { Search, Bell, Grid, ChevronDown, Mic } from "lucide-react"

// // --- UI Components ---
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/SprintReport/ui/avatar"
// import { Button } from "@/components/SprintReport/ui/button"

// export const TopHeader = () => {
//     return (
//         <div className="h-12 w-full bg-[#131A57] flex items-center justify-between px-4 z-50">
//             {/* Left Section: Logo */}
//             <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 rounded-lg flex items-center justify-center">
//                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                         <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                         <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                 </div>
//             </div>

//             {/* Middle Section: Search */}
//             <div className="flex-1 max-w-md mx-4">
//                 <div className="relative group">
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//                     <input
//                         type="text"
//                         placeholder="Search ..."
//                         className="w-full bg-[#334155] border-none rounded-full py-1.5 pl-10 pr-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
//                     />
//                     <Mic className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer hover:text-white" />
//                 </div>
//             </div>

//             {/* Right Section: Actions & Profile */}
//             <div className="flex items-center gap-3">
//                 <div className="relative">
//                     <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-[#334155] h-8 w-8">
//                         <Bell className="w-5 h-5" />
//                     </Button>
//                     <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold border-2 border-[#1e293b]">12</span>
//                 </div>

//                 <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-[#334155] h-8 w-8">
//                     <Grid className="w-5 h-5" />
//                 </Button>

//                 <div className="flex items-center gap-2 pl-2 cursor-pointer hover:bg-[#334155] py-1 px-2 rounded-lg transition-colors group">
//                     <Avatar className="h-8 w-8 border border-white/20">
//                         <AvatarImage src="https://github.com/shadcn.png" />
//                         <AvatarFallback>JD</AvatarFallback>
//                     </Avatar>
//                     <div className="hidden md:flex flex-col text-left">
//                         <span className="text-xs font-bold text-white leading-tight">John Doe</span>
//                         <span className="text-[10px] text-gray-400 leading-tight">john@kazentic.com</span>
//                     </div>
//                     <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white" />
//                 </div>
//             </div>
//         </div>
//     )
// }
