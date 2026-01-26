import { Button } from "@/components/ui/Button"
import { ArrowRight } from "lucide-react"

export default function Step1({ next }: { next: () => void }) {
    return (
        <Button onClick={next} className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-medium text-xs shadow-md hover:bg-blue-700 active:scale-95 transition">
            Get Started
            <ArrowRight className="w-5 h-5" />
        </Button>
    )
}
