import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterSendOtpValues,
  registerSendOtpSchema,
} from "@/lib/validations/auth.schema";
import { useRegisterSendOtpService } from "@/services/auth/services";

export function useRegisterSendInfomation() {
  const form = useForm<RegisterSendOtpValues>({
    resolver: zodResolver(registerSendOtpSchema),
    defaultValues: {
      email: "",
      displayName: "",
      password: "",
      confirm_password: "",
    },
    mode: "onChange",
  });

  const { mutate, isPending } = useRegisterSendOtpService();

  const onSubmit = async (data: RegisterSendOtpValues, onNext: () => void) => {
    const request: REQUEST.TRegisterSendOtp = {
      displayName: data.displayName,
      password: data.password,
      email: data.email,
    };

    mutate(request, {
      onSuccess: async (responseData: TResponse) => {
        if (responseData.code === "AUTH_006") {
          onNext();
        }
      },
      onError: async (error: TErrorResponse) => {
        error.errors.forEach((err) => {
          if (err.code === "AUTH_003") {
            form.setError("displayName", { message: err.message });
          }
        });
      },
    });
  };

  return {
    form,
    onSubmit,
    isPending,
  };
}
