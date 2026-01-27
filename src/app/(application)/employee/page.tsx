import AllEmployeeSection from "@/components/employee/layout/all-employee-section";
import HeaderSection from "@/components/employee/layout/header-section";

export default function Employee() {
    return (
        <div className='w-full h-full flex flex-col gap-4 bg-white p-4 text-xs'>
            <HeaderSection />

            <AllEmployeeSection />
        </div>
    )
}
