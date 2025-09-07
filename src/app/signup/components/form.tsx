"use client";

import { useMemo, useState } from "react";
import { InputAuth } from "@/components/ui/input-auth";
import { Mail, User, Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRegisterForm } from "@/hooks/use-register-form";

export function SignupForm() {
    const { step, form, next, back, canNext, email, setEmail, isCheckingEmail, isStarting, verifyOtp, isVerifying } = useRegisterForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [otp, setOtp] = useState("");

    const emailForm = form.watch("email");
    const displayName = form.watch("displayName");
    const password = form.watch("password");
    const confirmPassword = form.watch("confirm_password");
    const emailValid = useMemo(() => !form.formState.errors.email && (!!email || !!emailForm), [form.formState.errors.email, email, emailForm]);
    const passwordValid = useMemo(() => !form.formState.errors.password && !!password, [form.formState.errors.password, password]);
    const confirmValid = useMemo(() => !form.formState.errors.confirm_password && !!confirmPassword, [form.formState.errors.confirm_password, confirmPassword]);
    const nameValid = useMemo(() => !form.formState.errors.displayName && !!displayName, [form.formState.errors.displayName, displayName]);
    const otpValid = useMemo(() => /^\d{6}$/.test(otp), [otp]);

    const canNextLocal = useMemo(() => (step === 3 ? otpValid : canNext), [step, canNext, otpValid]);

    const prefersReduced = useReducedMotion();

    const stepVariants = {
        initial: prefersReduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.995 },
        animate: prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 },
        exit: prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.995 },
    } as const;

    const spring = {
        type: "spring",
        stiffness: 320,
        damping: 30,
        mass: 0.6,
    } as const;

    return (
        <div className="space-y-8">
            {/* Progress */}
            <div className="space-y-3">
                <div className="relative h-1.5 w-full bg-sidebar-accent/60 rounded-full overflow-hidden">
                    <motion.div
                        className="absolute left-0 top-0 h-full bg-sidebar-primary"
                        animate={{ width: `${(step / 3) * 100}%` }}
                        transition={spring}
                    />
                </div>
                <div className="flex items-center justify-between text-xs text-sidebar-foreground/70">
                    <span className={step >= 1 ? "text-sidebar-foreground" : undefined}>Email</span>
                    <span className={step >= 2 ? "text-sidebar-foreground" : undefined}>Thông tin</span>
                    <span className={step >= 3 ? "text-sidebar-foreground" : undefined}>OTP</span>
                </div>
            </div>
            {/* Steps (fade/slide) */}
            <div className="rounded-2xl p-0">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            variants={stepVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={spring}
                            className="space-y-2.5"
                        >
                            <label className="text-base font-medium block">Địa chỉ email</label>
                            <InputAuth
                                type="email"
                                placeholder="ten@domain.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                leftIcon={<Mail className="w-5 h-5" />}
                            />
                            {!emailValid && email?.length > 0 && (
                                <p className="text-xs text-red-400">Email không hợp lệ</p>
                            )}
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            variants={stepVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={spring}
                            className="space-y-4"
                        >
                            <div className="space-y-2.5">
                                <label className="text-base font-medium block">Tên hiển thị</label>
                                <InputAuth
                                    type="text"
                                    placeholder="Tên của bạn"
                                    value={displayName}
                                    onChange={(e) => form.setValue("displayName", e.target.value, { shouldValidate: true, shouldDirty: true })}
                                    leftIcon={<User className="w-5 h-5" />}
                                />
                                {!nameValid && displayName.length > 0 && (
                                    <p className="text-xs text-red-400">Tên phải có ít nhất 2 ký tự</p>
                                )}
                            </div>

                            <div className="space-y-2.5">
                                <label className="text-base font-medium block">Mật khẩu</label>
                                <InputAuth
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Mật khẩu tối thiểu 8 ký tự"
                                    value={password}
                                    onChange={(e) => form.setValue("password", e.target.value, { shouldValidate: true, shouldDirty: true })}
                                    leftIcon={<Lock className="w-5 h-5" />}
                                    rightIcon={showPassword ? (
                                        <EyeOff className="w-5 h-5 text-white/70" />
                                    ) : (
                                        <Eye className="w-5 h-5 text-white/70" />
                                    )}
                                    onRightIconClick={() => setShowPassword(!showPassword)}
                                />
                                {!passwordValid && password.length > 0 && (
                                    <p className="text-xs text-red-400">Mật khẩu phải từ 8 ký tự</p>
                                )}
                            </div>

                            <div className="space-y-2.5">
                                <label className="text-base font-medium block">Xác nhận mật khẩu</label>
                                <InputAuth
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="Nhập lại mật khẩu"
                                    value={confirmPassword}
                                    onChange={(e) => form.setValue("confirm_password", e.target.value, { shouldValidate: true, shouldDirty: true })}
                                    leftIcon={<Lock className="w-5 h-5" />}
                                    rightIcon={showConfirm ? (
                                        <EyeOff className="w-5 h-5 text-white/70" />
                                    ) : (
                                        <Eye className="w-5 h-5 text-white/70" />
                                    )}
                                    onRightIconClick={() => setShowConfirm(!showConfirm)}
                                />
                                {!confirmValid && confirmPassword.length > 0 && (
                                    <p className="text-xs text-red-400">Mật khẩu xác nhận không khớp</p>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            variants={stepVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={spring}
                            className="space-y-2.5"
                        >
                            <label className="text-base font-medium block">Mã OTP</label>
                            <InputAuth
                                type="text"
                                inputMode="numeric"
                                placeholder="Nhập 6 số OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                                leftIcon={<ShieldCheck className="w-5 h-5" />}
                            />
                            {!otpValid && otp.length > 0 && (
                                <p className="text-xs text-red-400">OTP gồm 6 chữ số</p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <button
                    className="rounded-md px-3 py-2 text-sm font-medium bg-sidebar-accent/60 hover:bg-sidebar-accent transition-colors border border-sidebar-border text-sidebar-foreground"
                    type="button"
                    onClick={back}
                >
                    Quay lại
                </button>
                <motion.button
                    whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                    className="rounded-md px-3 py-2 text-sm font-medium bg-sidebar-primary text-sidebar-primary-foreground hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
                    type="button"
                    disabled={!canNextLocal || isCheckingEmail || isStarting || isVerifying}
                    onClick={next}
                >
                    {step === 3 ? (isVerifying ? "Đang xác thực..." : "Hoàn tất") : isCheckingEmail || isStarting ? "Đang xử lý..." : "Tiếp tục"}
                </motion.button>
            </div>
        </div>
    );
}


