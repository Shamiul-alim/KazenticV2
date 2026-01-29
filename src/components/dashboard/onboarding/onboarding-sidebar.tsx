"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils";
import Step1 from "@/components/dashboard/onboarding/step-1-welcome";
import Step2 from "@/components/dashboard/onboarding/step-2-industry";
import Step3 from "@/components/dashboard/onboarding/step-3-team-size";
import Step4 from "@/components/dashboard/onboarding/step-4-workspace";
import Step5 from "@/components/dashboard/onboarding/step-5-step-review";
import Step6 from "@/components/dashboard/onboarding/step-6-success";

const steps = [
    {
        id: 1,
        title: "Welcome",
        headline: "Welcome to Your Organizational Workspace Journey",
        description: "Collaborate, organize and grow your team easily with our tools. Whether you're a small startup or a growing enterprise, our tools are designed to help you succeed. Get started today and enjoy your first month free!"
    },
    {
        id: 2,
        title: "Industry",
        headline: "What Industry Does Your Organization Belong To?",
        description: "Understanding your industry helps us tailor tools to your specific needs."
    },
    {
        id: 3,
        title: "Workspace",
        headline: "How many people are on your team?",
        description: "This helps us tailor features, permissions, and defaults for your setup. You can change this anytime."
    },
    {
        id: 3,
        title: "Workspace Details",
        headline: "Tell Us About Your Workspace",
        description: "Customize your workspace with a name, logo, and country preferences to make it truly yours."
    },
    {
        id: 4,
        title: "Last Step",
        headline: "You're Almost Done!",
        description: "Please review the details below before creating your workspace. If anything needs to be updated, click 'Go Back' to make changes."
    },
    {
        id: 5,
        title: "Success",
        headline: "Congratulations! Your Workspace is Ready!",
        description: "🎉 You've successfully created your workspace! Now you're ready to start collaborating, organizing tasks, and managing your team efficiently."
    }
];

export function OnboardingSidebar() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        workspaceName: "",
        industry: "",
        teamSize: "",
        country: ""
    });

    const next = () => setStep(Math.min(6, step + 1));

    const getStepComponent = () => {
        switch (step) {
            case 1:
                return <Step1 next={next} />;
            case 2:
                return <Step2 next={next} setFormData={setFormData} />;
            case 3:
                return <Step3 next={next} setFormData={setFormData} />;
            case 4:
                return <Step4 next={next} setFormData={setFormData} />;
            case 5:
                return <Step5 next={next} formData={formData} setFormData={setFormData} back={() => setStep(step - 1)} create={() => alert("Workspace Created!")} />;
            case 6:
                return <Step6 />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-white px-6 py-8">

            <div>
                {/* Top Bar */}
                <div className="flex items-center">
                    <button onClick={() => setStep(step - 1)} disabled={step === 1} className="p-2 rounded-full hover:bg-gray-100 transition">
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </button>
                </div>

                {/* Center Content */}
                <div className="flex flex-col items-center justify-start text-center max-w-xl mx-auto">

                    {/* Logo */}
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center mb-6 shadow-md">
                        <span className="text-white font-bold text-2xl">K</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-sm font-semibold text-gray-900 mb-4">
                        {steps[step - 1].headline}
                    </h1>

                    {/* Description */}
                    <p className="text-gray-500 text-xs leading-relaxed mb-10">
                        {steps[step - 1].description}
                    </p>

                    {getStepComponent()}
                </div>
            </div>

            {/* Bottom Progress */}
            <div className={cn("flex justify-center gap-4", step === 6 && "hidden")}>
                <div className={cn("h-2 w-20 rounded-full", step > 0 ? "bg-blue-600" : "bg-gray-200")} />
                <div className={cn("h-2 w-20 rounded-full", step > 1 ? "bg-blue-600" : "bg-gray-200")} />
                <div className={cn("h-2 w-20 rounded-full", step > 2 ? "bg-blue-600" : "bg-gray-200")} />
                <div className={cn("h-2 w-20 rounded-full", step > 3 ? "bg-blue-600" : "bg-gray-200")} />
                <div className={cn("h-2 w-20 rounded-full", step > 4 ? "bg-blue-600" : "bg-gray-200")} />
            </div>

        </div >
    )
}