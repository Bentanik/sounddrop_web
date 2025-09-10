import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValues, loginSchema } from "@/lib/validations/auth.schema";
import { useLoginService } from "@/services/auth/services";
import { useNotification } from "@/hooks/use-notification";
import { useAppDispatch } from "@/stores/redux/store";
import { setUser } from "@/stores/redux/user-slice";
import { TUser, TToken } from "@/types/auth";
import { setAuthStorage } from "@/utils/local-storages";

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
  const dispatch = useAppDispatch();

  const onSubmit = async (data: LoginValues) => {
    const request: REQUEST.TLogin = {
      email: data.email,
      password: data.password,
    };

    mutate(request, {
      onSuccess: async (responseData: TResponse<API.TLoginResponse>) => {
        if (responseData.code === "AUTH_009") {
          const data = responseData.data;
          if (data == null) {
            addNotification({
              type: "error",
              title: "Thất bại",
              message: "Hệ thống đang xảy ra lỗi, vui lòng thử lại sau",
              duration: 5000,
            });
            return;
          }

          const user: TUser = {
            id: data.user.id,
            fullName: data.user.fullName,
          };
          const token: TToken = {
            accessToken: data.token.accessToken,
            refreshToken: data.token.refreshToken,
            expiresAt: data.token.expiresAt,
            tokenType: data.token.tokenType,
          };
          dispatch(setUser(user));
          setAuthStorage(token);

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
