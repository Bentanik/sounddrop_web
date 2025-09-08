"use client";

import { useState } from "react";
import { InputAuth } from "@/components/ui/input-auth";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useRegisterSendInfomation } from "@/app/signup/hooks/useRegisterSendInfomation";

interface InfoStepFormProps {
    onNext: () => void;
    onBack?: () => void;
}

export default function InfoStepForm({ onNext, onBack }: InfoStepFormProps) {
    const { form, onSubmit, isPending } = useRegisterSendInfomation();
    const { watch, setValue, formState } = form;

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const displayName = watch("displayName");
    const password = watch("password");
    const confirmPassword = watch("confirm_password");

    const nameValid = !formState.errors.displayName && !!displayName;
    const passwordValid = !formState.errors.password && !!password;
    const confirmValid = !formState.errors.confirm_password && !!confirmPassword;

    const canNext = nameValid && passwordValid && confirmValid;

    return (
        <form
            className="space-y-4"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ displayName, password, confirm_password: confirmPassword, email: "" }, onNext);
            }}
        >
            {/* Display Name */}
            <div className="space-y-2.5">
                <label className="text-base font-medium block">Tên hiển thị</label>
                <InputAuth
                    type="text"
                    placeholder="Tên của bạn"
                    value={displayName}
                    onChange={(e) => setValue("displayName", e.target.value, { shouldValidate: true })}
                    leftIcon={<User className="w-5 h-5" />}
                />
                {formState.errors.displayName && (
                    <p className="text-xs text-red-400">{formState.errors.displayName.message}</p>
                )}
            </div>

            {/* Password */}
            <div className="space-y-2.5">
                <label className="text-base font-medium block">Mật khẩu</label>
                <InputAuth
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật khẩu tối thiểu 8 ký tự"
                    value={password}
                    onChange={(e) => setValue("password", e.target.value, { shouldValidate: true })}
                    leftIcon={<Lock className="w-5 h-5" />}
                    rightIcon={showPassword ? <EyeOff className="w-5 h-5 text-white/70" /> : <Eye className="w-5 h-5 text-white/70" />}
                    onRightIconClick={() => setShowPassword(!showPassword)}
                />
                {formState.errors.password && (
                    <p className="text-xs text-red-400">{formState.errors.password.message}</p>
                )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2.5">
                <label className="text-base font-medium block">Xác nhận mật khẩu</label>
                <InputAuth
                    type={showConfirm ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setValue("confirm_password", e.target.value, { shouldValidate: true })}
                    leftIcon={<Lock className="w-5 h-5" />}
                    rightIcon={showConfirm ? <EyeOff className="w-5 h-5 text-white/70" /> : <Eye className="w-5 h-5 text-white/70" />}
                    onRightIconClick={() => setShowConfirm(!showConfirm)}
                />
                {formState.errors.confirm_password && (
                    <p className="text-xs text-red-400">{formState.errors.confirm_password.message}</p>
                )}
            </div>

            {/* Buttons */}
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
                    {isPending ? "Đang xử lý..." : "Tiếp tục"}
                </button>
            </div>
        </form>
    );
};
