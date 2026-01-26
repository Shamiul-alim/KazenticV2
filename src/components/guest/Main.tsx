"use client"
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/sprint-report/ui/tabs"
import { Filter, LayoutGrid, List, ChevronDown, Plus } from 'lucide-react'
import Joined from './Joined'
import Invited from './Invited'
import { Button } from "@/components/sprint-report/ui/button"
import { cn } from "@/lib/utils"
import InviteGuestModal from './InviteGuestModal'
import ExportDropdown from './ExportDropdown'

const Main = () => {
    const [activeTab, setActiveTab] = useState('joined')
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)

    return (
        <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
            <Tabs defaultValue="joined" onValueChange={setActiveTab} className="w-full">
                <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-0.5">
                    <TabsList className="bg-transparent h-auto p-0 gap-8">
                        <TabsTrigger
                            value="joined"
                            className="relative px-0 py-2 !bg-transparent rounded-none text-gray-400 font-semibold cursor-pointer transition-colors duration-300 data-[state=active]:text-blue-600 hover:text-blue-500 !shadow-none outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 data-[state=active]:after:scale-x-100"
                        >
                            Joined
                        </TabsTrigger>

                        <TabsTrigger
                            value="invited"
                            className="relative px-0 py-2 !bg-transparent rounded-none text-gray-400 font-semibold cursor-pointer transition-colors duration-300 data-[state=active]:text-blue-600 hover:text-blue-500 !shadow-none outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 data-[state=active]:after:scale-x-100"
                        >
                            Invited
                        </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-3">
                        {activeTab === 'invited' && (
                            <ExportDropdown />
                        )}

                        <Button variant="outline" size="sm" className="h-9 gap-2 text-gray-600 border-gray-200">
                            <Filter className="size-3" />
                            Filter
                        </Button>

                        <div className="flex items-center bg-gray-100/60 p-1 rounded-lg border border-gray-200/80 shadow-inner">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setViewMode('grid')}
                                className={cn(
                                    "size-7 rounded-md transition-all duration-300",
                                    viewMode === 'grid'
                                        ? "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)] text-blue-600 border border-gray-100"
                                        : "text-gray-400 hover:text-gray-600 hover:bg-white/50"
                                )}
                            >
                                <LayoutGrid className="size-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setViewMode('list')}
                                className={cn(
                                    "size-7 rounded-md transition-all duration-300",
                                    viewMode === 'list'
                                        ? "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)] text-blue-600 border border-gray-100"
                                        : "text-gray-400 hover:text-gray-600 hover:bg-white/50"
                                )}
                            >
                                <List className="size-4" />
                            </Button>
                        </div>

                        {activeTab === 'invited' && (
                            <Button
                                onClick={() => setIsInviteModalOpen(true)}
                                className="h-9 gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-sm font-semibold px-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Invite Guest
                                <Plus className="size-4" />
                            </Button>
                        )}
                    </div>
                </div>

                <TabsContent value="joined" className="mt-0 outline-none">
                    <Joined viewMode={viewMode} />
                </TabsContent>
                <TabsContent value="invited" className="mt-0 outline-none">
                    <Invited viewMode={viewMode} />
                </TabsContent>
            </Tabs>

            <InviteGuestModal
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
            />
        </div>
    )
}

export default Main

