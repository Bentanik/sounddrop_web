import {
  registerCheckEmail,
  registerSendOtp,
  register,
} from "@/services/auth/api-services";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useRegisterCheckEmailService = (
  options?: UseMutationOptions<
    TResponse,
    TErrorResponse,
    REQUEST.TRegisterCheckEmail
  >
) => {
  return useMutation<TResponse, TErrorResponse, REQUEST.TRegisterCheckEmail>({
    mutationFn: registerCheckEmail,
    ...options,
  });
};
