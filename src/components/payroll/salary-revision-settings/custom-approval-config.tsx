import React from "react"
import { Plus, Check, XCircle } from "lucide-react"

export function CustomApprovalConfig() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6 lg:p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="mb-6 md:mb-8">
                <h2 className="text-sm sm:text-[16px] font-bold text-gray-900">Custom Approval Configuration</h2>
                <p className="text-xs sm:text-[13px] text-gray-500 mt-1">Build your own approval workflow with conditional rules</p>
            </div>

            {/* Workflow Steps Section */}
            <div className="mb-10">
                <div className="flex justify-between items-end mb-4">
                    <h3 className="text-[13px] font-bold text-gray-900">Workflow Steps</h3>
                    <button className="flex items-center gap-1 text-blue-600 text-[13px] font-semibold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                        <Plus className="h-4 w-4" />
                        Add Step
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    {/* Step 1 */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 text-[14px] font-bold shrink-0">
                            1
                        </div>
                        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <select className="w-full appearance-none bg-transparent border-none text-[14px] text-gray-700 font-medium outline-none cursor-pointer py-2">
                                    <option>HR Manager</option>
                                </select>
                                <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                            <div className="relative md:border-l border-gray-200 md:pl-4">
                                <select className="w-full appearance-none bg-transparent border-none text-[14px] text-gray-500 outline-none cursor-pointer py-2">
                                    <option>Human Resources</option>
                                </select>
                                <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 md:gap-6 md:pl-4 md:border-l border-gray-100 w-full md:w-auto justify-between md:justify-start">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <div className="h-4 w-4 rounded-full bg-blue-600 flex items-center justify-center">
                                    <Check className="h-2.5 w-2.5 text-white stroke-[3px]" />
                                </div>
                                <span className="text-[13px] font-semibold text-gray-700">Required</span>
                            </div>
                            <button className="text-red-500 hover:text-red-600 p-1 hover:bg-red-50 rounded-full transition-colors">
                                <XCircle className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 text-[14px] font-bold shrink-0">
                            2
                        </div>
                        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <select className="w-full appearance-none bg-transparent border-none text-[14px] text-gray-700 font-medium outline-none cursor-pointer py-2">
                                    <option>HR Manager</option>
                                </select>
                                <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                            <div className="relative md:border-l border-gray-200 md:pl-4">
                                <select className="w-full appearance-none bg-transparent border-none text-[14px] text-gray-500 outline-none cursor-pointer py-2">
                                    <option>Human Resources</option>
                                </select>
                                <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 md:gap-6 md:pl-4 md:border-l border-gray-100 w-full md:w-auto justify-between md:justify-start">
                            <div className="flex items-center gap-2 cursor-pointer opacity-60">
                                <div className="h-4 w-4 rounded-full border border-gray-400 bg-white"></div>
                                <span className="text-[13px] font-semibold text-gray-700">Required</span>
                            </div>
                            <button className="text-red-500 hover:text-red-600 p-1 hover:bg-red-50 rounded-full transition-colors">
                                <XCircle className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Conditional Rules Section */}
            <div className="mb-6">
                <h3 className="text-[13px] font-bold text-gray-900 mb-4">Conditional Rules</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-gray-700">Salary Threshold</label>
                        <input
                            type="text"
                            placeholder="e.g. 100000"
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-400"
                        />
                        <p className="text-[11px] text-gray-400">Revisions above this amount require additional approval</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold text-gray-700">Max % Increase</label>
                        <input
                            type="text"
                            placeholder="8"
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-400"
                        />
                        <p className="text-[11px] text-gray-400">Increases above this % require director approval</p>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium px-8 py-2.5 rounded-lg transition-colors shadow-sm">
                    Save Configuration
                </button>
            </div>
        </div>
    )
}
