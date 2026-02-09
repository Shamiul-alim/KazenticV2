import { Button } from '@/components/ui/Button'
import React from 'react'
import ArrowDownLight from '../icons/arrow-down-light'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import ClipboardTextIcon from '../icons/clipboard-text'
import { useWorkload, WorkloadUnit } from '../workload-context'

export default function WorkloadUnitDropdown() {
    const { unit, setUnit } = useWorkload()

    const getLabel = (value: WorkloadUnit) => {
        switch (value) {
            case 'sprint-points':
                return 'Sprint Points'
            case 'tasks':
                return 'Tasks'
            case 'time-estimates':
                return 'Time Estimates'
            default:
                return 'Select Unit'
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    {getLabel(unit)}
                    <ArrowDownLight className='ml-1 h-4 w-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 p-0" align="start">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Workload Unit</DropdownMenuLabel>
                    <DropdownMenuRadioGroup value={unit} onValueChange={(value) => setUnit(value as WorkloadUnit)}>
                        <DropdownMenuRadioItem value="sprint-points">Sprint Points</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="tasks">Tasks</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="time-estimates">Time Estimates</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
