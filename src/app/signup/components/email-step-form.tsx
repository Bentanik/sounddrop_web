"use client";

import { FC } from "react";
import { InputAuth } from "@/components/ui/input-auth";
import { Mail } from "lucide-react";
import { useRegisterCheckEmail } from "@/app/signup/hooks/useRegisterCheckEmail";

export const EmailStepForm: FC<{ onNext: () => void }> = ({ onNext }) => {
    const { form, onSubmit, isPending } = useRegisterCheckEmail();
    const { register, handleSubmit, formState } = form;

    return (
        <form
            onSubmit={handleSubmit((values) => {
                onSubmit(values, onNext);
            })}
            className="space-y-2.5"
        >
            <label className="text-base font-medium block">Địa chỉ email</label>
            <InputAuth
                type="email"
                placeholder="ten@domain.com"
                {...register("email")}
                autoComplete="off"
                leftIcon={<Mail className="w-5 h-5" />}
            />
            {formState.errors.email && (
                <p className="text-xs text-red-400">
                    {formState.errors.email.message}
                </p>
            )}
            <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-md px-3 py-2 text-sm font-medium bg-sidebar-primary text-sidebar-primary-foreground hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {isPending ? "Đang kiểm tra..." : "Tiếp tục"}
            </button>
        </form>
    );
};
