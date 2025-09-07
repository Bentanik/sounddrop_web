import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerEmailSchema } from "@/lib/validations/auth.schema";
import z from "zod";

export type RegisterFormValues = z.infer<typeof registerEmailSchema> & {
  otp?: string;
};

export function useRegisterForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerEmailSchema),
    defaultValues: {
      email: "",
      displayName: "",
      password: "",
      confirm_password: "",
    },
    mode: "onChange",
  });

  // Simple local async fns instead of useMutation
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  async function checkEmailApi(_payload: { email: string }) {
    setIsCheckingEmail(true);
    try {
      await new Promise((r) => setTimeout(r, 400));
      return { available: true } as { available: boolean };
    } finally {
      setIsCheckingEmail(false);
    }
  }

  async function startRegisterApi(_payload: {
    email: string;
    displayName: string;
    password: string;
  }) {
    setIsStarting(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      return { ok: true } as { ok: boolean };
    } finally {
      setIsStarting(false);
    }
  }

  async function verifyOtpApi(_payload: { email: string; otp: string }) {
    setIsVerifying(true);
    try {
      await new Promise((r) => setTimeout(r, 400));
      return { ok: true } as { ok: boolean };
    } finally {
      setIsVerifying(false);
    }
  }

  const emailValid = useMemo(() => !!email && /.+@.+\..+/.test(email), [email]);
  const infoValid = useMemo(
    () =>
      !form.formState.errors.displayName &&
      !form.formState.errors.password &&
      !form.formState.errors.confirm_password &&
      !!form.getValues("displayName") &&
      !!form.getValues("password") &&
      !!form.getValues("confirm_password"),
    [
      form.watch("displayName"),
      form.watch("password"),
      form.watch("confirm_password"),
      form.formState.errors.displayName,
      form.formState.errors.password,
      form.formState.errors.confirm_password,
    ]
  );

  const canNext = step === 1 ? emailValid : step === 2 ? infoValid : true;

  const next = () => {
    if (step === 1) {
      if (!emailValid || isCheckingEmail) return;
      void checkEmailApi({ email }).then((data) => {
        if (data.available) {
          form.setValue("email", email, { shouldDirty: true });
          setStep(2);
        } else {
          form.setError("email" as any, {
            type: "manual",
            message: "Email đã tồn tại",
          });
        }
      });
      return;
    }

    if (step === 2) {
      // validate form fields before calling API
      void form
        .trigger(["displayName", "password", "confirm_password"])
        .then((valid) => {
          if (!valid || isStarting) return;
          const values = form.getValues();
          void startRegisterApi({
            email: values.email,
            displayName: values.displayName,
            password: values.password,
          }).then(() => setStep(3));
        });
      return;
    }

    if (step === 3) {
      // handled in component with OTP value
      return;
    }
  };

  const back = () => setStep((s) => (s === 1 ? 1 : ((s - 1) as 1 | 2 | 3)));

  return {
    step,
    setStep,
    form,
    email,
    setEmail,
    canNext,
    next,
    back,
    isCheckingEmail,
    isStarting,
    verifyOtp: (otp: string) =>
      verifyOtpApi({ email: form.getValues().email || email, otp }),
    isVerifying,
  };
}
