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

export const useRegisterSendOtpService = (
  options?: UseMutationOptions<
    TResponse,
    TErrorResponse,
    REQUEST.TRegisterSendOtp
  >
) => {
  return useMutation<TResponse, TErrorResponse, REQUEST.TRegisterSendOtp>({
    mutationFn: registerSendOtp,
    ...options,
  });
};

export const useRegisterService = (
  options?: UseMutationOptions<TResponse, TErrorResponse, REQUEST.TRegister>
) => {
  return useMutation<TResponse, TErrorResponse, REQUEST.TRegister>({
    mutationFn: register,
    ...options,
  });
};
