"use client";

import { useState, useMemo } from "react";

export function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailValid = useMemo(
    () => email.includes("@") && email.includes("."),
    [email]
  );
  const passwordValid = useMemo(() => password.length >= 6, [password]);
  const canSubmit = emailValid && passwordValid && !isLoading;

  // Mock login API call
  async function loginApi(payload: { email: string; password: string }) {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      return { success: true, user: { email, name: "User" } } as {
        success: boolean;
        user: any;
      };
    } catch (err) {
      setError("Đăng nhập thất bại");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      const result = await loginApi({ email, password });
      if (result.success) {
        console.log("Login successful:", result.user);
        // Handle success - redirect or update state
        return result;
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    emailValid,
    passwordValid,
    canSubmit,
    handleSubmit,
  };
}
