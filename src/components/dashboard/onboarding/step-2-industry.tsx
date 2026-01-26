import { Button } from "@/components/ui/Button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight } from "lucide-react"

export default function Step2({ next, setFormData }: { next: () => void, setFormData: React.Dispatch<React.SetStateAction<{ workspaceName: string; industry: string; teamSize: string; country: string }>> }) {
    return (
        <div className="flex gap-4 items-center">
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                <SelectTrigger className="w-100">
                    <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="tech">Tech</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
            </Select>

            <Button onClick={next} className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-medium text-xs shadow-md hover:bg-blue-700 active:scale-95 transition">
                Next <ArrowRight size={18} />
            </Button>
        </div>
    )
}
