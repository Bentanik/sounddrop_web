import {
  registerCheckEmailAsync,
  registerSendOtpAsync,
  registerAsync,
  loginAsync,
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
    mutationFn: registerCheckEmailAsync,
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
    mutationFn: registerSendOtpAsync,
    ...options,
  });
};

export const useRegisterService = (
  options?: UseMutationOptions<TResponse, TErrorResponse, REQUEST.TRegister>
) => {
  return useMutation<TResponse, TErrorResponse, REQUEST.TRegister>({
    mutationFn: registerAsync,
    ...options,
  });
};

export const useLoginService = (
  options?: UseMutationOptions<
    TResponse<API.TLoginResponse>,
    TErrorResponse,
    REQUEST.TLogin
  >
) => {
  return useMutation<
    TResponse<API.TLoginResponse>,
    TErrorResponse,
    REQUEST.TLogin
  >({
    mutationFn: loginAsync,
    ...options,
  });
};
