import React from "react"
import { Edit2 } from "lucide-react"

interface ApprovalChainLevel {
    id: number
    role: string
    department: string
}

interface MultiLevelConfigProps {
    approvalChain: ApprovalChainLevel[]
}

export function MultiLevelConfig({ approvalChain }: MultiLevelConfigProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6 lg:p-8 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-sm sm:text-[15px] font-bold text-gray-900 mb-2">Multi-Level Approval Configuration</h2>
            <h3 className="text-xs sm:text-[13px] font-semibold text-gray-900 mb-4 mt-6 md:mt-8">Approval Chain</h3>
            <div className="flex justify-between items-center -mt-8 mb-4">
                <span className="text-xs text-transparent">.</span>
                <span className="text-xs sm:text-[13px] text-gray-400 font-medium">{approvalChain.length} levels configured</span>
            </div>

            <div className="flex flex-col gap-3">
                {approvalChain.map((level) => (
                    <div key={level.id} className="group flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50 transition-colors shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-600 text-sm font-bold shrink-0">
                                {level.id}
                            </div>
                            <div>
                                <h4 className="text-[14px] font-bold text-gray-900">{level.role}</h4>
                                <p className="text-[13px] text-gray-500">{level.department}</p>
                            </div>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer hover:bg-white hover:text-blue-600 hover:border-blue-200">
                            <Edit2 className="h-4 w-4" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
