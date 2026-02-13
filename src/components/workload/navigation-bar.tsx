import React from 'react'
import { Button } from '../ui/Button'
import { ChevronDown, Clipboard } from 'lucide-react'
import { Separator } from '../ui/separator'
import KazenticLogo from './icons/kazentic'
import ClipboardTextIcon from './icons/clipboard-text'
import { cn } from '@/lib/utils'

interface NavigationBarProps {
    children?: React.ReactNode
    className?: string
}

export default function NavigationBar({ children, className }: NavigationBarProps) {
    return (
        <div className={cn("w-full px-4 py-1 flex items-center gap-2", className)}>
            <Button variant="ghost" size="md" className='flex gap-2 items-center p-1'>
                <KazenticLogo className="h-3.5 w-3.5" />
                <h1 className="text-xs font-semibold">Kazentic</h1>
                <ChevronDown className="h-3.5 w-3.5" />
            </Button>

            <Separator orientation="vertical" className='w-px h-4' />


            {children ? children : (
                <Button variant="ghost" size="sm" className='flex p-1 gap-1.5 items-center'>
                    <ClipboardTextIcon className="mr-2 h-4 w-4" />
                    Tasks
                </Button>
            )}
        </div>
    )
}
