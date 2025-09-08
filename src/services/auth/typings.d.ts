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
}

declare namespace API {}
