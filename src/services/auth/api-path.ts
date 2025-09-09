const AUTH = "/auth-service/api/v1/auth";
const REGISTER = AUTH + "/register";
const REGISTER_CHECK_EMAIL = REGISTER + "/check-email";
const REGISTER_SEND_OTP = REGISTER + "/send-otp";
const LOGIN = AUTH + "/login";

export default {
  REGISTER,
  REGISTER_CHECK_EMAIL,
  REGISTER_SEND_OTP,
  LOGIN,
};
