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
}

declare namespace API {}
