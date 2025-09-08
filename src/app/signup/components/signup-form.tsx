"use client";

import EmailStepForm from "@/app/signup/components/email-step-form";
import InfoStepForm from "@/app/signup/components/info-step-form";
import { useRegisterStore } from "@/stores/zustand/register-store";

export function SignupForm() {
    const step = useRegisterStore((state) => state.step);
    const nextStep = useRegisterStore((state) => state.nextStep);
    const previousStep = useRegisterStore((state) => state.previousStep);

    return (
        <div className="space-y-8">
            <div className="relative h-1.5 w-full bg-sidebar-accent/60 rounded-full overflow-hidden">
                <div
                    className="absolute left-0 top-0 h-full bg-sidebar-primary transition-all duration-300"
                    style={{ width: `${(step / 3) * 100}%` }}
                />
            </div>

            <div className="space-y-6">
                {step === 1 && <EmailStepForm onNext={nextStep} />}
                {step === 2 && <InfoStepForm onNext={nextStep} onBack={previousStep} />}
                {step === 3 && <div>Step 3: OTP (sẽ làm sau)</div>}
            </div>
        </div>
    );
}
