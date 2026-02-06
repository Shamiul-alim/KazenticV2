import { Button } from '@/components/ui/Button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { Check } from 'lucide-react'
import React from 'react'
import { useWorkload } from '../workload-context'
import { ZoomLevel } from '../workload-engine'
import ArrowDownLight from '../icons/arrow-down-light'

type ZoomOption = {
    value: ZoomLevel
    label: string
}

const zoomOptions: ZoomOption[] = [
    { value: '7_days', label: '7 Days' },
    { value: '14_days', label: '14 Days' },
    { value: 'days', label: 'Days' },
    { value: 'weeks', label: 'Weeks' },
    { value: 'months', label: 'Months' },
]

const getLabel = (value: string) => {
    switch (value) {
        case '7_days':
            return '7 Days'
        case '14_days':
            return '14 Days'
        case 'days':
            return 'Days'
        case 'weeks':
            return 'Weeks'
        case 'months':
            return 'Months'
        default:
            return value
    }
}

export default function ZoomLevelDropdown() {
    const { zoom, setZoom } = useWorkload()

    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    {getLabel(zoom)}
                    <ArrowDownLight className='h-4 w-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    {
                        zoomOptions.map((option) => (
                            <DropdownMenuItem
                                key={option.value}
                                onClick={() => {
                                    setZoom(option.value)
                                    setIsOpen(false)
                                }}
                                className={cn(
                                    "w-full flex items-center justify-between px-2 py-1.5 rounded-sm hover:bg-muted transition-colors",
                                    zoom === option.value && "bg-muted"
                                )}
                            >
                                <span>{getLabel(option.label)}</span>
                                {zoom === option.value && <Check className="h-4 w-4" />}
                            </DropdownMenuItem>
                        ))
                    }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
