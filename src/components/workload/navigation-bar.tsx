import React from 'react'
import { Button } from '../ui/Button'
import { ChevronDown, Clipboard } from 'lucide-react'
import { Separator } from '../ui/separator'
import KazenticLogo from './icons/kazentic'
import ClipboardTextIcon from './icons/clipboard-text'

export default function NavigationBar({ children }: { children?: React.ReactNode }) {
    return (
        <div className='px-4 py-1 flex items-center gap-2'>
            <Button variant="ghost" size="md" className='flex gap-1 p-1'>
                <KazenticLogo className="h-3.5 w-3.5" />
                Kazentic
                <ChevronDown className="h-4 w-4" />
            </Button>

            <Separator orientation="vertical" className='w-px h-4' />


            {children ? children : (
                <Button variant="ghost" size="sm" className='flex p-1'>
                    <ClipboardTextIcon className="mr-2 h-4 w-4" />
                    Tasks
                </Button>
            )}
        </div>
    )
}
