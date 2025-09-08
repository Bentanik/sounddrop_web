import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterCheckEmailValues,
  registerCheckEmailSchema,
} from "@/lib/validations/auth.schema";
import { useRegisterCheckEmailService } from "@/services/auth/services";

export function useRegisterCheckEmail() {
  const form = useForm<RegisterCheckEmailValues>({
    resolver: zodResolver(registerCheckEmailSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const { mutate, isPending } = useRegisterCheckEmailService();

  const onSubmit = async (
    data: RegisterCheckEmailValues,
    onNext: () => void
  ) => {
    const request: REQUEST.TRegisterCheckEmail = {
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
          if (err.code === "AUTH_002") {
            form.setError("email", { message: err.message });
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
