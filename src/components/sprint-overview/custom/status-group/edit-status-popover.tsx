import React from 'react'
import { Popover, PopoverTrigger } from '../../ui/popover'
import TaskStatusContent from './task-status-content'

type EditStatusPopoverProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    value: string;
    onChange: (value: string) => void;
    children?: React.ReactNode;
}

export default function EditStatusPopover({ open, setOpen, value, onChange, children }: EditStatusPopoverProps) {
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>

            <TaskStatusContent value={value} onChange={onChange} setOpen={setOpen} />
        </Popover>
    )
}
