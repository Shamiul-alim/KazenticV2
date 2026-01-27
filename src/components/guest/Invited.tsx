import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/sprint-report/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/sprint-report/ui/avatar"
import { StatusBadge } from "@/components/sprint-report/ui/status-badge"
import { invitedGuests as initialGuests } from "@/data/guest-data"
import { Copy, ChevronsUpDown, CheckCircle2, AlertCircle, SendHorizontal, Trash2 } from 'lucide-react'
import { cn } from "@/lib/utils"

import GridView from './GridView'

const Invited = ({ viewMode = 'list' }: { viewMode?: 'list' | 'grid' }) => {
    const [guests, setGuests] = useState(initialGuests);

    const deleteGuest = (id: string) => {
        setGuests(prev => prev.filter(guest => guest.id !== id));
    }
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    }

    if (viewMode === 'grid') {
        return <GridView guests={guests} />
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
            <Table className="min-w-[1000px] md:min-w-full">
                <TableHeader className="bg-gray-50/50 text-[#101828]">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[80px] font-semibold text-gray-600">Sl. No.</TableHead>
                        <TableHead className="font-semibold text-gray-600">
                            <div className="flex items-center gap-1">
                                Name <ChevronsUpDown className="size-3.5 text-gray-400" />
                            </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-600">
                            <div className="flex items-center gap-1">
                                Email <ChevronsUpDown className="size-3.5 text-gray-400" />
                            </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-600">
                            <div className="flex items-center gap-1">
                                Phone <ChevronsUpDown className="size-3.5 text-gray-400" />
                            </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-600">
                            <div className="flex items-center gap-1">
                                Designation <ChevronsUpDown className="size-3.5 text-gray-400" />
                            </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-600">
                            <div className="flex items-center gap-1">
                                Invited Date <ChevronsUpDown className="size-3.5 text-gray-400" />
                            </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-600">
                            <div className="flex items-center gap-1">
                                Status <ChevronsUpDown className="size-3.5 text-gray-400" />
                            </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-600">
                            <div className="flex items-center gap-1">
                                Action <ChevronsUpDown className="size-3.5 text-gray-400" />
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {guests.map((guest, index) => (
                        <TableRow key={guest.id} className="hover:bg-gray-50/50 transition-colors group">
                            <TableCell className="text-gray-500 font-medium">
                                {index + 1}.
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="size-8 bg-blue-600 text-white border-0 shadow-sm">
                                        <AvatarImage src={guest.avatar} />
                                        <AvatarFallback className="bg-blue-600 text-white font-bold text-xs shadow-inner">
                                            {guest.name.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium text-[#101828]">{guest.name}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-600">{guest.email}</span>
                                    <Copy onClick={() => copyToClipboard(guest.email)} className="size-3.5 text-gray-300 hover:text-blue-500 cursor-pointer transition-colors" />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-600">{guest.phone}</span>
                                    <Copy onClick={() => copyToClipboard(guest.phone)} className="size-3.5 text-gray-300 hover:text-blue-500 cursor-pointer transition-colors" />
                                </div>
                            </TableCell>
                            <TableCell className="text-gray-600">{guest.designation}</TableCell>
                            <TableCell className="text-gray-600">{guest.joiningDate}</TableCell>
                            <TableCell>
                                <StatusBadge
                                    label={guest.status}
                                    variant={guest.status === 'ACTIVE' ? 'green' : 'blue'}
                                    icon={guest.status === 'ACTIVE' ? <CheckCircle2 className="size-3.5" /> : <AlertCircle className="size-3.5" />}
                                    className={cn(
                                        "rounded-lg border shadow-sm transition-all duration-300 py-1",
                                        guest.status === 'INACTIVE' && "opacity-60 grayscale bg-gray-100 text-gray-500 border-gray-200"
                                    )}
                                />
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2.5">
                                    <button className="p-2 border border-gray-200 bg-white rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-100 transition-all shadow-sm">
                                        <SendHorizontal className="size-4 rotate-[-45deg] transition-transform duration-300 group-hover:rotate-[-45deg]" />
                                    </button>

                                    <button
                                        // onClick={() =>
                                        //     copyToClipboard(
                                        //         `${guest.name},${guest.email},${guest.phone},${guest.designation}`
                                        //     )
                                        // }
                                        onClick={() => copyToClipboard(guest.email)}
                                        className="p-2 border border-gray-200 bg-white rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-100 transition-all shadow-sm">
                                        <Copy className="size-4" />
                                    </button>
                                    <button
                                        onClick={() => deleteGuest(guest.id)}
                                        className="p-2 border border-gray-200 bg-white rounded-lg text-red-500 hover:text-white hover:bg-red-500 hover:border-red-600 transition-all shadow-sm"
                                    >
                                        <Trash2 className="size-4" />
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default Invited
