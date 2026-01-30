'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/Button";
import { Filter, Plus } from 'lucide-react';
import NoticeCard, { NoticeType } from './NoticeCard';
import NoticeDetails from './NoticeDetails';
import { AddNoticeSidebar } from '@/components/leaves/manage-leaves/add-notice-sidebar';
import { FilterPopover } from '@/components/sprint-overview/custom/filters/filter-popover';

const MOCK_NOTICES = [
    {
        id: '1',
        title: 'Holiday Due To Shab E-Barat',
        author: { name: 'Alan Walker' },
        time: '02:45 PM',
        date: 'Aug 08, 2025',
        description: 'Deepchain Labs will remain closed on March 08, 2024 (Wednesday) on the occasion of Shab-e-Barat. All activities will resume on March 09, 2024 (Thursday).',
        type: 'Holiday' as NoticeType,
        publishedAt: 'Aug 06, 2025 • 2:30 PM'
    },
    {
        id: '2',
        title: 'System Maintenance Notice',
        author: { name: 'Alan Walker' },
        time: '02:45 PM',
        date: 'Aug 08, 2025',
        description: 'Scheduled system maintenance will occur this weekend. Services may be temporarily unavailable.',
        type: 'Announcement' as NoticeType,
        publishedAt: 'Aug 06, 2025 • 2:30 PM'
    },
    {
        id: '3',
        title: 'New Security Guidelines',
        author: { name: 'Alan Walker' },
        time: '02:45 PM',
        date: 'Aug 08, 2025',
        description: 'Please review the updated security guidelines document in your employee portal.',
        type: 'Info' as NoticeType,
        publishedAt: 'Aug 06, 2025 • 2:30 PM'
    }
];

export default function Notice() {
    const [selectedNotice, setSelectedNotice] = useState<typeof MOCK_NOTICES[0] | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isAddSidebarOpen, setIsAddSidebarOpen] = useState(false);

    const handleNoticeClick = (notice: typeof MOCK_NOTICES[0]) => {
        setSelectedNotice(notice);
        setIsDetailsOpen(true);
    };

    return (
        <div className="min-h-screen bg-white p-6">
            <div className="mx-auto max-w-[1400px]">
                <Tabs defaultValue="upcoming" className="w-full">
                    <div className="mb-6 flex flex-wrap md:flex-nowrap items-center border-b border-gray-100 pb-0">
                        <TabsList variant="line" className="h-auto">
                            <TabsTrigger value="upcoming" className="px-6 pb-4 text-[14px] font-medium data-[state=active]:text-[#4157FE]">
                                Upcoming (4)
                            </TabsTrigger>
                            <TabsTrigger value="previous" className="px-6 pb-4 text-[14px] font-medium data-[state=active]:text-[#4157FE]">
                                Previous (0)
                            </TabsTrigger>
                        </TabsList>

                        <div className="ml-auto flex items-center gap-3">
                            <FilterPopover />
                            <Button
                                onClick={() => setIsAddSidebarOpen(true)}
                                className="h-7 flex items-center gap-2 bg-[#4157FE] px-4 text-white hover:bg-[#4157FE]/90 !rounded-md whitespace-nowrap"
                            >
                                <Plus className="h-3 w-3" />
                                <span className="text-xs">Add New</span>
                            </Button>
                        </div>
                    </div>

                    <TabsContent value="upcoming" className="mt-0 space-y-4">
                        {MOCK_NOTICES.map((notice) => (
                            <NoticeCard
                                key={notice.id}
                                {...notice}
                                onClick={() => handleNoticeClick(notice)}
                            />
                        ))}
                    </TabsContent>

                    <TabsContent value="previous" className="mt-0">
                        <div className="flex h-[400px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50/50">
                            <p className="text-gray-400">No previous notices</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            <NoticeDetails
                open={isDetailsOpen}
                onOpenChange={setIsDetailsOpen}
                notice={selectedNotice}
            />

            <AddNoticeSidebar
                isOpen={isAddSidebarOpen}
                onClose={() => setIsAddSidebarOpen(false)}
            />
        </div>
    );
}