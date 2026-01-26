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
import { Switch } from "@/components/sprint-report/ui/switch"
import { joinedGuests as initialGuests } from "@/data/guest-data"
import { Copy, ChevronsUpDown, CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from "@/lib/utils"

import GridView from './GridView'

const Joined = ({ viewMode = 'list' }: { viewMode?: 'list' | 'grid' }) => {
    const [guests, setGuests] = useState(initialGuests);
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    }

    const toggleStatus = (id: string) => {
        setGuests(prev => prev.map(guest => {
            if (guest.id === id) {
                return {
                    ...guest,
                    status: guest.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
                }
            }
            return guest;
        }));
    }

    if (viewMode === 'grid') {
        return <GridView guests={guests} />
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <Table>
                <TableHeader className="bg-gray-50/50">
                    <TableRow>
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
                                Joining Date <ChevronsUpDown className="size-3.5 text-gray-400" />
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
                        <TableRow key={guest.id} className="hover:bg-gray-50/50 transition-colors">
                            <TableCell className="text-gray-500 font-medium">
                                {index + 1}.
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="size-8 bg-blue-600 text-white border-0">
                                        <AvatarImage src={guest.avatar} />
                                        <AvatarFallback className="bg-blue-600 text-white font-bold text-xs shadow-inner">
                                            {guest.name.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium text-gray-900">{guest.name}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 group">
                                    <span className="text-gray-600">{guest.email}</span>
                                    <Copy onClick={() => copyToClipboard(guest.email)} className="size-3.5 text-gray-300 group-hover:text-gray-500 cursor-pointer transition-colors" />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 group">
                                    <span className="text-gray-600">{guest.phone}</span>
                                    <Copy onClick={() => copyToClipboard(guest.phone)} className="size-3.5 text-gray-300 group-hover:text-gray-500 cursor-pointer transition-colors" />
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
                                        "rounded-full border shadow-sm transition-all duration-300",
                                        guest.status === 'INACTIVE' && "opacity-60 grayscale bg-gray-100 text-gray-500 border-gray-200"
                                    )}
                                />
                            </TableCell>
                            <TableCell>
                                <Switch
                                    checked={guest.status === 'ACTIVE'}
                                    onCheckedChange={() => toggleStatus(guest.id)}
                                    className="data-[state=checked]:bg-blue-600"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default Joined
