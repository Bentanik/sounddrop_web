"use client";

import { InputAuth } from "@/components/ui/input-auth";
import { ShieldCheck } from "lucide-react";
import { useRegisterStore } from "@/stores/zustand/register-store";
import { useRegister } from "@/app/(auth)/signup/hooks/use-register";
import { useEffect } from "react";

interface OtpStepFormProps {
    onBack: () => void;
}

export default function OtpStepForm({ onBack }: OtpStepFormProps) {
    const email = useRegisterStore((state) => state.email);
    const { form, onSubmit, isPending } = useRegister();
    const { register, handleSubmit, watch, formState, setValue } = form;

    useEffect(() => {
        if (email) {
            setValue("email", email, { shouldValidate: true });
        }
    }, [email]);

    const otp = watch("otp");
    const canNext = !formState.errors.otp && otp.length === 6;

    return (
        <form
            className="space-y-4"
            onSubmit={handleSubmit((values) => onSubmit(values))}
        >
            <div className="space-y-2.5">
                <label className="text-base font-medium block">
                    Nhập mã OTP đã gửi tới {email}
                </label>
                <InputAuth
                    type="text"
                    inputMode="numeric"
                    placeholder="Nhập 6 số OTP"
                    value={otp}
                    onChange={(e) => setValue("otp", e.target.value.replace(/[^0-9]/g, "").slice(0, 6), { shouldValidate: true })}
                    leftIcon={<ShieldCheck className="w-5 h-5" />}
                />
                {formState.errors.otp && (
                    <p className="text-xs text-red-400">{formState.errors.otp.message}</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2.5">
                {onBack && (
                    <button
                        type="button"
                        className="rounded-md px-3 py-2 text-sm font-medium bg-sidebar-accent/60 hover:bg-sidebar-accent transition-colors border border-sidebar-border text-sidebar-foreground"
                        onClick={onBack}
                    >
                        Quay lại
                    </button>
                )}
                <button
                    type="submit"
                    disabled={!canNext || isPending}
                    className="rounded-md px-3 py-2 text-sm font-medium bg-sidebar-primary text-sidebar-primary-foreground hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
                >
                    {isPending ? "Đang xác thực..." : "Hoàn tất"}
                </button>
            </div>
        </form>
    );
}
