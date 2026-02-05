import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import WarningIcon from '../access-control/icon/warning'
import BriefcaseIcon from './icons/briefcase'
import { Separator } from '../ui/separator'
import { Button } from '../ui/Button'
import { Plus } from 'lucide-react'

export default function ViewToolbar() {
    return (
        <div className='flex items-center w-full'>
            <Tabs defaultValue="overview" className='w-full'>
                <TabsList variant="line">
                    <TabsTrigger value="overview">
                        <WarningIcon className='mr-2 h-4 w-4' />
                        Overview
                    </TabsTrigger>
                    <TabsTrigger value="analytics">
                        <BriefcaseIcon className='mr-2 h-4 w-4' />
                        Workload
                    </TabsTrigger>

                    <Separator orientation="vertical" className='h-4' />

                    <Button variant="ghost" size="sm" className='flex p-1'>
                        <Plus className="h-4 w-4" />
                        View
                    </Button>
                </TabsList>
            </Tabs>
        </div>
    )
}
