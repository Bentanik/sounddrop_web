"use client";

import Link from "next/link";
import { SignupForm } from "@/app/signup/components/signup-form";

export function SignupMain() {
    return (
        <div className="min-h-screen text-white flex items-center justify-center px-4 bg-[#121212]">
            <div className="w-full max-w-md py-16">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-5xl font-extrabold tracking-tight mb-2">Đăng ký để</h1>
                    <h2 className="text-5xl font-extrabold tracking-tight mb-8">bắt đầu lắng nghe</h2>
                </div>

                <SignupForm />

                <div className="mt-10 text-center text-white/70">
                    Đã có tài khoản?{" "}
                    <Link href="/login" className="text-white underline">
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
}
