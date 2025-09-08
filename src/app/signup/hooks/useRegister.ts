import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterValues, registerSchema } from "@/lib/validations/auth.schema";
import { useRegisterService } from "@/services/auth/services";
import { useNotification } from "@/hooks/use-notification";

export function useRegister() {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
    mode: "onChange",
  });

  const { mutate, isPending } = useRegisterService();
  const { addNotification } = useNotification();

  const onSubmit = async (
    data: RegisterValues,
    onNext: (email: string) => void
  ) => {
    const request: REQUEST.TRegister = {
      email: data.email,
      otp: data.otp,
    };

    mutate(request, {
      onSuccess: async (responseData: TResponse) => {
        if (responseData.code === "AUTH_008") {
          onNext(request.email);
          addNotification({
            type: "success",
            title: "Thành công",
            message: responseData.message,
            duration: 5000,
          });
        }
      },
      onError: async (error: TErrorResponse) => {
        error.errors.forEach((err) => {
          if (err.code === "AUTH_007") {
            form.setError("otp", { message: err.message });
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
