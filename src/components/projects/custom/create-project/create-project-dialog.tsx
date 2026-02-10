"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/Button"
import { CalendarIcon, UserPlusIcon, X } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/sprint-report/ui/select"
import { Input } from "@/components/employee/ui/input"
import { AvatarGroup, Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import UserAddIcon from "@/components/icons/user-add"
import { Separator } from "@/components/ui/separator"
import React from "react"
import { useProjectContext } from "../../context/project-context"
import { Controller, useForm } from "react-hook-form"
import { cn } from "@/lib/utils"

type Inputs = {
    name: string
    startDate: string
    endDate: string
    identifier: string
    githubLink: string
    projectType: string
    description: string
    isPrivate: boolean
}

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CreateProjectDialog({ open, onOpenChange }: Props) {
    const { formValues, setFormValues } = useProjectContext()
    const [isPrivate, setIsPrivate] = React.useState(false)
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>()

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl p-6 h-[90vh] overflow-y-auto">
                <DialogHeader className="relative">
                    <DialogTitle className="text-sm font-semibold">
                        Create Project
                    </DialogTitle>

                    <p className="text-[11px] text-muted-foreground mt-1">
                        Start your next build.
                    </p>
                </DialogHeader>

                <form className="space-y-4" onSubmit={handleSubmit((data) => {
                    console.log(data)
                })}>
                    {/* Project Icon & Name */}
                    <Field
                        label="Project Icon & name"
                        error={errors.name ? "Project name is required" : undefined}
                    >
                        <div className="flex items-center border-2 border-muted rounded-lg overflow-hidden w-full">
                            <div className="size-8 bg-primary border-r-2 text-white flex items-center justify-center font-semibold">
                                P
                            </div>
                            <Input
                                placeholder="Enter Project Name"
                                className={
                                    cn(
                                        "border-none focus:ring-0 text-[11px] font-light",
                                        errors.name ? "text-[#900B09]" : "text-[#191F38]"
                                    )
                                }
                                value={formValues.name}
                                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                            />
                        </div>
                    </Field>

                    {/* Dates + Identifier */}
                    <div className="grid grid-cols-2 gap-4">
                        <Field
                            label="Project Start Date"
                            error={errors.startDate ? "Project start date is required" : undefined}
                        >
                            <div className="relative">
                                <Input placeholder="dd/mm/yyyy" className={cn("text-[11px]", errors.startDate ? "text-[#900B09]" : "text-[#191F38]")} {...register("startDate", { required: true })} />
                                <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                        </Field>

                        <Field
                            label="Project Identifier"
                            error={errors.identifier ? "Project identifier is required" : undefined}
                        >
                            <Input placeholder="Enter Project Identifier" className={
                                cn("text-[11px] font-light", errors.identifier ? "text-[#900B09]" : "text-[#191F38]")
                            } {...register("identifier", { required: true })} />
                        </Field>
                    </div>

                    {/* Delivery + GitHub */}
                    <div className="grid grid-cols-2 gap-4">
                        <Field
                            label="Expected Delivery Date"
                            error={errors.endDate ? "Project end date is required" : undefined}
                        >
                            <div className="relative">
                                <Input placeholder="dd/mm/yyyy" className={cn("text-[11px] font-light", errors.endDate ? "text-[#900B09]" : "text-[#191F38]")} {...register("endDate", { required: true })} />
                                <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                        </Field>

                        <Field
                            label="Github Repository URL"
                            error={errors.githubLink ? "GitHub repository URL is required" : undefined}
                        >
                            <Input placeholder="https://github.com/username/repo" className={cn("text-[11px] font-light", errors.githubLink ? "text-[#900B09]" : "text-[#191F38]")} {...register("githubLink", { required: true })} />
                        </Field>

                        {/* Project Type */}
                        <Field
                            label="Project Type"
                            error={errors.projectType ? "Project type is required" : undefined}
                        >
                            <Controller
                                name="projectType"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className={cn("w-full", errors.projectType ? "border-[#900B09]" : "border-[#191F38]")}>
                                            <SelectValue placeholder="Select Project Type" className="text-[11px] font-light" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="client">Client</SelectItem>
                                            <SelectItem value="internal">Internal</SelectItem>
                                            <SelectItem value="research">Research</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </Field>
                    </div>


                    {/* Description */}
                    <Field
                        label="Project Description"
                        error={errors.description ? "Project description is required" : undefined}
                    >
                        <Textarea
                            rows={3}
                            placeholder="Provide description of project"
                            className={cn("text-[11px] font-light", errors.description ? "text-[#900B09]" : "text-[#191F38]")}
                            {...register("description")}
                        />
                    </Field>

                    {/* Private Toggle */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="font-medium text-xs">Make this project Private</p>
                            <p className="text-muted-foreground text-[11px] font-light">
                                Only you and invited members will have access
                            </p>
                        </div>
                        <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
                    </div>

                    {/* Share With */}
                    {
                        isPrivate && (
                            <Field label="Share with" align="horizontal">
                                <div className="flex">
                                    <AvatarGroup>
                                        <Avatar size="sm">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <Avatar size="sm">
                                            <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
                                            <AvatarFallback>LR</AvatarFallback>
                                        </Avatar>
                                        <Avatar size="sm">
                                            <AvatarImage
                                                src="https://github.com/evilrabbit.png"
                                                alt="@evilrabbit"
                                            />
                                            <AvatarFallback>ER</AvatarFallback>
                                        </Avatar>
                                        <Avatar size="sm" className="border-2">
                                            <Button variant="ghost" className="size-8 rounded-full bg-muted flex items-center justify-center">
                                                <UserAddIcon className="h-4 w-4 text-muted-foreground" />
                                            </Button>
                                        </Avatar>
                                    </AvatarGroup>

                                </div>
                            </Field>
                        )
                    }

                    <Separator />

                    {/* Footer */}
                    <div className="flex justify-end" >
                        <Button className="px-4 py-2" type="submit">Create Project</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

function Field({
    label,
    children,
    error,
    align = "vertical",
}: {
    label: string
    children: React.ReactNode
    error?: string
    align?: "vertical" | "horizontal"
}) {
    return (
        <div className="w-full">
            <span className={`flex ${align === "horizontal" ? "items-center justify-between gap-4" : "flex-col"} w-full`}>
                <label className="text-xs font-medium text-[#191F38] inline-block mb-2">{label}</label>
                {children}
            </span>
            {error && <p className="text-[#900B09] text-xs">{error}</p>}
        </div>
    )
}
