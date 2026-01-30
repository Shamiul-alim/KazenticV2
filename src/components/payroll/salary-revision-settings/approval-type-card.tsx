import React from "react"
import { CheckCircle } from "lucide-react"

type ApprovalType = "simple" | "multi-level" | "custom"

interface ApprovalTypeCardProps {
    type: ApprovalType
    title: string
    description: string
    features: string[]
    isSelected: boolean
    isRecommended?: boolean
    onSelect: () => void
    className?: string
}

export function ApprovalTypeCard({
    type,
    title,
    description,
    features,
    isSelected,
    isRecommended = false,
    onSelect,
    className = ""
}: ApprovalTypeCardProps) {
    return (
        <div
            onClick={onSelect}
            className={`relative cursor-pointer flex flex-col p-5 md:p-6 rounded-2xl border transition-all ${isSelected
                ? "border-blue-500 bg-blue-50/40 shadow-sm"
                : "border-gray-100 bg-white shadow-sm hover:border-gray-300"
                } ${className}`}
        >
            {isRecommended && (
                <div className="absolute top-3 right-3 md:top-4 md:right-4">
                    <span className="inline-block px-2 py-0.5 md:px-2.5 md:py-1 text-[10px] md:text-[11px] font-bold rounded bg-blue-100 text-blue-600">
                        Recommended
                    </span>
                </div>
            )}

            <div className={`flex items-start gap-3 md:gap-4 mb-4 md:mb-5 ${isRecommended ? 'pr-16 md:pr-20' : ''}`}>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0 ${isSelected ? "border-blue-600 bg-white" : "border-gray-300 bg-white"
                    }`}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 text-sm md:text-[15px] mb-1">{title}</h3>
                    <p className="text-xs md:text-[13px] leading-relaxed text-gray-500">
                        {description}
                    </p>
                </div>
            </div>

            <div className="pl-8 md:pl-9 grid grid-cols-1 gap-y-2.5 md:gap-y-3">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 md:gap-2.5 opacity-90">
                        <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-emerald-500 shrink-0" />
                        <span className="text-xs md:text-[13px] font-medium text-gray-600">{feature}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
