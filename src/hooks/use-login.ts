import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValues, loginSchema } from "@/lib/validations/auth.schema";
import { useLoginService } from "@/services/auth/services";
import { useNotification } from "@/hooks/use-notification";

export function useLogin() {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const { mutate, isPending } = useLoginService();
  const { addNotification } = useNotification();

  const onSubmit = async (data: LoginValues) => {
    const request: REQUEST.TLogin = {
      email: data.email,
      password: data.password,
    };

    mutate(request, {
      onSuccess: async (responseData: TResponse) => {
        if (responseData.code === "AUTH_009") {
          addNotification({
            type: "success",
            title: "Thành công",
            message: responseData.message,
            duration: 5000,
          });
        }
        window.location.href = "/";
      },
      onError: async (error: TErrorResponse) => {
        error.errors.forEach((err) => {
          if (err.code === "AUTH_001") {
            form.setError("email", { message: err.message });
          }
          if (err.code === "AUTH_004") {
            form.setError("password", { message: err.message });
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
