"use client"

import { Button } from "@/components/ui/Button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function Step6() {
    return (
        <div className="w-full h-full flex flex-col items-center text-center overflow-hidden">

            {/* Top Content */}
            <div className="max-w-2xl">

                <Button className="gap-2 px-4 py-2 flex items-center bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition">
                    Choose a Plan <ArrowRight size={18} />
                </Button>
            </div>

            {/* Angled Dashboard Image */}
            {/* <div className="w-full flex justify-end drop-shadow-2xl opacity-95 overflow-hidden h-120">
                <Image
                    src="/assets/dashboard/dashboard.png"
                    alt="Dashboard Preview"
                    className="absolute -right-50 -rotate-45"
                    fill
                // className="object-contain"
                />
            </div> */}
        </div>
    )
}
