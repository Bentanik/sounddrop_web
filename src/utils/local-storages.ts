import { TToken } from "@/types/auth";
import { AUTH_STORAGE_KEY } from "@/lib/constants/auth";

export const getStorageItem = (
  key: string,
  defaultValue?: string
): string | undefined => {
  const value = localStorage.getItem(key);
  return value !== null ? value : defaultValue;
};

export const setStorageItem = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const removeStorageItem = (key: string): void => {
  localStorage.removeItem(key);
};

export const setAuthStorage = (authData: TToken): void => {
  setStorageItem(AUTH_STORAGE_KEY.ACCESS_TOKEN, authData.accessToken || "");
  setStorageItem(AUTH_STORAGE_KEY.REFRESH_TOKEN, authData.refreshToken || "");
  setStorageItem(AUTH_STORAGE_KEY.EXPIRES_AT, authData.expiresAt);
  setStorageItem(AUTH_STORAGE_KEY.TOKEN_TYPE, authData.tokenType);
};

export const getAuthStorage = (): TToken | null => {
  const accessToken = getStorageItem(AUTH_STORAGE_KEY.ACCESS_TOKEN);
  const refreshToken = getStorageItem(AUTH_STORAGE_KEY.REFRESH_TOKEN);
  const expiresAtStr = getStorageItem(AUTH_STORAGE_KEY.EXPIRES_AT);
  const tokenType = getStorageItem(AUTH_STORAGE_KEY.TOKEN_TYPE);

  if (!accessToken) return null;

  return {
    accessToken,
    refreshToken: refreshToken || "",
    expiresAt: expiresAtStr || "",
    tokenType: tokenType || "",
  };
};

export const removeAuthStorage = (): void => {
  removeStorageItem(AUTH_STORAGE_KEY.ACCESS_TOKEN);
  removeStorageItem(AUTH_STORAGE_KEY.REFRESH_TOKEN);
  removeStorageItem(AUTH_STORAGE_KEY.EXPIRES_AT);
  removeStorageItem(AUTH_STORAGE_KEY.TOKEN_TYPE);
};
