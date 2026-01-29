import { AddNoticeSidebar } from "@/components/leaves/manage-leaves/add-notice-sidebar"

export default function AddNoticePage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <AddNoticeSidebar isOpen={true} onClose={() => { }} />
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Add New Notice</h1>
                <p className="text-gray-500">The sidebar should be visible on the right.</p>
            </div>
        </div>
    )
}
