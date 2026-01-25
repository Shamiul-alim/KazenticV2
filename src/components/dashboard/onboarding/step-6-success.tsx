"use client"

import { Button } from "@/components/ui/Button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function Step6() {
    return (
        <div className="relative w-full flex flex-col items-center text-center pt-10">

            {/* Top Content */}
            <div className="z-10 space-y-6 max-w-2xl">
                <h1 className="text-2xl sm:text-3xl font-semibold">
                    Congratulations! Your Workspace is Ready!
                </h1>

                <p className="text-muted-foreground text-base sm:text-lg">
                    🎉 You’ve successfully created your workspace! Now you’re ready to start
                    collaborating, organizing tasks, and managing your team efficiently.
                </p>

                <Button size="lg" className="gap-2 px-8">
                    Choose a Plan <ArrowRight size={18} />
                </Button>
            </div>

            {/* Angled Dashboard Image */}
            <div className="relative w-full mt-16 flex justify-center">
                <div className="relative w-225 h-125 -rotate-12 drop-shadow-2xl opacity-95">
                    <Image
                        src="/dashboard-preview.png" // put image in /public
                        alt="Dashboard Preview"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
    )
}
