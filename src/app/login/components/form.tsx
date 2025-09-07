"use client";

import { useState } from "react";
import { InputAuth } from "@/components/ui/input-auth";
import { Mail, Eye, EyeOff, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useLoginForm } from "@/hooks/use-login-form";

export function LoginForm() {
    const { email, setEmail, password, setPassword, isLoading, error, emailValid, passwordValid, canSubmit, handleSubmit } = useLoginForm();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2.5">
                <label className="text-base font-medium block">Địa chỉ email</label>
                <InputAuth
                    type="email"
                    placeholder="ten@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    leftIcon={<Mail className="w-5 h-5" />}
                />
                {!emailValid && email.length > 0 && (
                    <p className="text-xs text-red-400">Email không hợp lệ</p>
                )}
            </div>

            <div className="space-y-2.5">
                <label className="text-base font-medium block">Mật khẩu</label>
                <InputAuth
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật khẩu của bạn"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    leftIcon={<Lock className="w-5 h-5" />}
                    rightIcon={showPassword ? (
                        <EyeOff className="w-5 h-5 text-white/70" />
                    ) : (
                        <Eye className="w-5 h-5 text-white/70" />
                    )}
                    onRightIconClick={() => setShowPassword(!showPassword)}
                />
                {!passwordValid && password.length > 0 && (
                    <p className="text-xs text-red-400">Mật khẩu phải từ 6 ký tự</p>
                )}
            </div>

            {error && (
                <div className="text-center text-red-400 text-sm">
                    {error}
                </div>
            )}

            <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!canSubmit}
                className="w-full rounded-md px-3 py-2 text-sm font-medium bg-sidebar-primary text-sidebar-primary-foreground hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
            >
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </motion.button>
        </form>
    );
}
