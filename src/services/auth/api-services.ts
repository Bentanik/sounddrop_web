import API_ENDPOINTS from "@/services/auth/api-path";
import request from "@/services/interceptor";

export const registerCheckEmailAsync = async (
  params: REQUEST.TRegisterCheckEmail
) => {
  const response = await request<TResponse>(
    API_ENDPOINTS.REGISTER_CHECK_EMAIL,
    {
      method: "POST",
      params: params,
    }
  );
  return response.data;
};
export const registerSendOtpAsync = async (
  payload: REQUEST.TRegisterSendOtp
) => {
  const response = await request<TResponse>(API_ENDPOINTS.REGISTER_SEND_OTP, {
    method: "POST",
    data: payload,
  });
  return response.data;
};

export const registerAsync = async (payload: REQUEST.TRegister) => {
  const response = await request<TResponse>(API_ENDPOINTS.REGISTER, {
    method: "POST",
    data: payload,
  });
  return response.data;
};

export const loginAsync = async (payload: REQUEST.TLogin) => {
  const response = await request<TResponse<API.TLoginResponse>>(
    API_ENDPOINTS.LOGIN,
    {
      method: "POST",
      data: payload,
    }
  );
  return response.data;
};
