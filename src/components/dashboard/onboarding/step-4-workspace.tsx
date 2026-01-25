"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/Button"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import { Upload, ArrowRight } from "lucide-react"

export default function Step4({ next, setFormData }: { next: () => void, setFormData: React.Dispatch<React.SetStateAction<{ workspaceName: string; industry: string; teamSize: string; country: string }>> }) {
    const [workspaceName, setWorkspaceName] = useState("")
    const [fileName, setFileName] = useState<string | null>(null)

    const handleFile = (file: File | null) => {
        if (!file) return
        if (file.size > 4 * 1024 * 1024) {
            alert("Max file size is 4MB")
            return
        }
        setFileName(file.name)
    }

    return (
        <div className="w-full max-w-103.5 mx-auto space-y-4">

            {/* Workspace Name */}
            <div className="space-y-2 flex flex-col items-start">
                <label className="text-sm font-medium">
                    Workspace Name <span className="text-red-500">*</span>
                </label>
                <Input
                    placeholder="Enter your workspace name"
                    value={workspaceName}
                    onChange={(e) => {
                        setWorkspaceName(e.target.value);
                        setFormData(prev => ({ ...prev, workspaceName: e.target.value }));
                    }}
                />
            </div>

            {/* Upload Logo */}
            <div className="space-y-2 flex flex-col items-start">
                <label className="text-sm font-medium">Upload Logo (Optional)</label>

                <label className="w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/40 transition">
                    <Upload className="w-4 h-4 text-blue-600 mb-4" />

                    <p className="font-medium text-xs">
                        {fileName ? fileName : "Drag And Drop File Here"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Or Click To Browse (4MB Max)
                    </p>

                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => handleFile(e.target.files?.[0] || null)}
                    />
                </label>

                <p className="text-xs text-muted-foreground">
                    Some data formats such as dates, colors, numbers may not be recognized.
                </p>
            </div>

            {/* Country + Timezone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Country</label>
                    <Select defaultValue="us">
                        <SelectTrigger>
                            <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="us">🇺🇸 United States</SelectItem>
                            <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                            <SelectItem value="bd">🇧🇩 Bangladesh</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Time Zone</label>
                    <Select defaultValue="est">
                        <SelectTrigger>
                            <SelectValue placeholder="Select Timezone" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="est">Standard Time</SelectItem>
                            <SelectItem value="gmt">GMT</SelectItem>
                            <SelectItem value="pst">Pacific Time</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Next */}
            <div className="flex justify-center py-4">
                <Button onClick={next} className="flex items-center mx-auto gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-medium text-xs shadow-md hover:bg-blue-700 active:scale-95 transition">
                    Next <ArrowRight size={18} />
                </Button>
            </div>
        </div>
    )
}
