export type TToken = {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  tokenType: string;
};

export type TUser = {
  id: string;
  fullName: string;
};
