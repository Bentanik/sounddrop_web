"use client";

import { useState } from "react";
import { InputAuth } from "@/components/ui/input-auth";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useLogin } from "@/hooks/use-login";

export default function LoginForm() {
    const { form, onSubmit, isPending } = useLogin();
    const { watch, setValue, formState, handleSubmit } = form;

    const [showPassword, setShowPassword] = useState(false);

    const email = watch("email");
    const password = watch("password");

    return (
        <form
            className="space-y-4"
            onSubmit={handleSubmit((values) => {
                onSubmit(values);
            })}
        >
            {/* Email */}
            <div className="space-y-2.5">
                <label className="text-base font-medium block">Email</label>
                <InputAuth
                    type="text"
                    placeholder="Email của bạn"
                    value={email}
                    onChange={(e) => setValue("email", e.target.value, { shouldValidate: true })}
                    leftIcon={<User className="w-5 h-5" />}
                />
                {formState.errors.email && (
                    <p className="text-xs text-red-400">{formState.errors.email.message}</p>
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

            <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-md px-3 py-2 text-sm font-medium bg-sidebar-primary text-sidebar-primary-foreground hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {isPending ? "Đang kiểm tra..." : "Đăng nhập"}
            </button>
        </form>
    );
};
