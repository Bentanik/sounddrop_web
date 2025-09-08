export const validationMessages = {
  email: {
    required: "Email không được để trống",
    invalid: "Email không hợp lệ",
  },
  displayName: {
    required: "Tên hiển thị không được để trống",
    minLength: "Tên hiển thị phải có ít nhất 4 ký tự",
    maxLength: "Tên hiển thị không được vượt quá 100 ký tự",
  },
  password: {
    required: "Mật khẩu không được để trống",
    min_length: "Mật khẩu phải có ít nhất 6 ký tự",
    max_length: "Mật khẩu phải có tối đa 50 ký tự",
  },
  confirm_password: {
    required: "Xác nhận mật khẩu không được để trống",
    min_length: "Xác nhận mật khẩu phải có ít nhất 6 ký tự",
    max_length: "Xác nhận mật khẩu phải có tối đa 50 ký tự",
    not_match: "Mật khẩu xác nhận không khớp",
  },
  otp: {
    required: "Mã OTP không được để trống",
  },
};
