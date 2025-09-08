// SignupForm.tsx
"use client";

import { useState } from "react";
import { EmailStepForm } from "./email-step-form";

export function SignupForm() {
    const [step, setStep] = useState<1 | 2 | 3>(1);

    const nextStep = () => {
        setStep((s) => (s === 3 ? 3 : (s + 1) as 1 | 2 | 3));
    };

    return (
        <div className="space-y-8">
            {/* Progress bar */}
            <div className="relative h-1.5 w-full bg-sidebar-accent/60 rounded-full overflow-hidden">
                <div
                    className="absolute left-0 top-0 h-full bg-sidebar-primary transition-all duration-300"
                    style={{ width: `${(step / 3) * 100}%` }}
                />
            </div>

            <div className="space-y-6">
                {step === 1 && <EmailStepForm onNext={nextStep} />}
                {step === 2 && <div>Step 2: Thông tin (sẽ làm sau)</div>}
                {step === 3 && <div>Step 3: OTP (sẽ làm sau)</div>}
            </div>
        </div>
    );
}
