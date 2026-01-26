"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { ArrowRight } from "lucide-react"
import clsx from "clsx"

const options = ["5-10", "10-20", "20-50", "50+"]

export default function Step3({ next, setFormData }: { next: () => void, setFormData: React.Dispatch<React.SetStateAction<{ workspaceName: string; industry: string; teamSize: string; country: string }>> }) {
    const [selected, setSelected] = useState<string | null>(null)

    return (
        <div className="w-full max-w-3xl mx-auto text-center space-y-10">

            {/* Options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {options.map((size) => (
                    <button
                        key={size}
                        onClick={() => {
                            setSelected(size);
                            setFormData(prev => ({ ...prev, teamSize: size }));
                        }}
                        className={clsx(
                            "rounded-xl border p-6 transition-all text-center shadow-sm",
                            "hover:border-blue-500 hover:shadow-md",
                            selected === size
                                ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                                : "border-gray-200 bg-white"
                        )}
                    >
                        <div className="text-sm font-semibold text-gray-900">{size}</div>
                        <div className="text-xs text-gray-500">Team members</div>
                    </button>
                ))}
            </div>

            {/* Next Button */}
            <Button onClick={next} className="flex items-center mx-auto gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-medium text-xs shadow-md hover:bg-blue-700 active:scale-95 transition">
                Next <ArrowRight size={18} />
            </Button>
        </div>
    )
}
