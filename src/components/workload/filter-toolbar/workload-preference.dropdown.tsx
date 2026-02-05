import { Button } from '@/components/ui/Button'
import ArrowDownLight from '../icons/arrow-down-light'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import ClipboardTextIcon from '../icons/clipboard-text'
import { useState } from 'react'

export default function WorkloadPreferenceDropdown() {
    const [preference, setPreference] = useState('daily-scheduled')

    const getLabel = (value: string) => {
        switch (value) {
            case 'daily-scheduled':
                return 'Daily Scheduled'
            case 'daily-availability':
                return 'Daily Availability'
            case 'weekly-capacity':
                return 'Weekly Capacity'
            case 'weekly-availability':
                return 'Weekly Availability'
            default:
                return 'Select Preference'
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    {getLabel(preference)}
                    <ArrowDownLight className='ml-1 h-4 w-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 p-0" align="start">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Workload Preference</DropdownMenuLabel>
                    <DropdownMenuRadioGroup value={preference} onValueChange={setPreference}>
                        <DropdownMenuRadioItem value="daily-scheduled">Daily Scheduled</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="daily-availability">Daily Availability</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="weekly-capacity">Weekly Capacity</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="weekly-availability">Weekly Availability</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
