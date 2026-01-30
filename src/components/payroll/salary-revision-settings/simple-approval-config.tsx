import React from "react"

export function SimpleApprovalConfig() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6 lg:p-8 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-sm sm:text-[16px] font-bold text-gray-900 mb-6 md:mb-8">Simple Approval Configuration</h2>

            <div className="flex flex-col gap-6 md:gap-8">
                {/* Dropdowns Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-gray-700">Approval Criteria</label>
                        <div className="relative">
                            <select className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all">
                                <option>Select Approval role</option>
                                <option>HR Manager</option>
                                <option>Department Head</option>
                            </select>
                            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-gray-700">Approval Criteria</label>
                        <div className="relative">
                            <select className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all">
                                <option>Select Department</option>
                                <option>Human Resources</option>
                                <option>Finance</option>
                            </select>
                            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Text Area */}
                <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-700">Approval Criteria</label>
                    <textarea
                        className="w-full min-h-[120px] rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none placeholder:text-gray-400"
                        placeholder="Define specific criteria for approval (Optional)"
                    />
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium px-8 py-2.5 rounded-lg transition-colors shadow-sm">
                        Save Configuration
                    </button>
                </div>
            </div>
        </div>
    )
}
