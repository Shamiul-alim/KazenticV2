"use client"

import { Button } from "@/components/ui/Button"
import { Building2, Users, Globe } from "lucide-react"
import { ArrowRight } from "lucide-react"

type Props = {
    next: () => void
    setFormData: React.Dispatch<React.SetStateAction<{ workspaceName: string; industry: string; teamSize: string; country: string }>>
    formData: {
        workspaceName: string,
        industry: string,
        teamSize: string,
        country: string
    },
    back: () => void,
    create: () => void
}

export default function Step5({ next, formData, back }: Props) {
    return (
        <div className="w-full max-w-lg mx-auto space-y-10 text-xs">

            {/* Summary Card */}
            <div className="rounded-xl border bg-white p-8 shadow-sm space-y-6 flex flex-col items-center">

                {/* Workspace */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-medium">
                        {formData.workspaceName?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium">{formData.workspaceName}</span>
                </div>

                {/* Industry */}
                <div className="flex items-center gap-3 text-gray-700">
                    <Building2 className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">Industry :</span>
                    <span className="text-muted-foreground">{formData.industry}</span>
                </div>

                {/* Team Size */}
                <div className="flex items-center gap-3 text-gray-700">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">Organization Size :</span>
                    <span className="text-muted-foreground">{formData.teamSize} Team members</span>
                </div>

                {/* Country */}
                <div className="flex items-center gap-3 text-gray-700">
                    <Globe className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">Country :</span>
                    <span className="text-muted-foreground">{formData.country}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={back} className="gap-2 px-8">
                    Go Back
                </Button>

                <Button onClick={next} className="gap-2 px-4 py-2.5 flex items-center bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition">
                    Create Workspace <ArrowRight size={18} />
                </Button>
            </div>
        </div>
    )
}
