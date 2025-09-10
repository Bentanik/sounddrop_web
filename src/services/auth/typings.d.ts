declare namespace REQUEST {
  type TRegisterCheckEmail = {
    email: string;
  };

  type TRegisterSendOtp = {
    displayName: string;
    email: string;
    password: string;
  };

  type TRegister = {
    email: string;
    otp: string;
  };

  type TLogin = {
    email: string;
    password: string;
  };

  type TRefreshToken = {
    refreshToken: string;
  };
}

declare namespace API {
  type TToken = {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
    tokenType: string;
  };

  type TUser = {
    id: string;
    fullName: string;
  };

  type TLoginResponse = {
    token: TToken;
    user: TUser;
  };
}
