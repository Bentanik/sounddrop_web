"use client";

import Link from "next/link";
import LoginForm from "@/app/login/components/form";

export function LoginMain() {
    return (
        <div className="min-h-screen text-white flex items-center justify-center px-4 bg-[#2b2a2a]">
            <div className="w-full max-w-md py-16">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-5xl font-extrabold tracking-tight mb-2">Đăng nhập</h1>
                    <h2 className="text-5xl font-extrabold tracking-tight mb-8">vào tài khoản</h2>
                </div>

                <LoginForm />

                <div className="mt-10 text-center text-white/70">
                    Chưa có tài khoản?
                    {" "}
                    <Link href="/signup" className="text-white underline">
                        Đăng ký
                    </Link>
                </div>
            </div>
        </div>
    );
}
