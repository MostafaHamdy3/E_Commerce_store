import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export const AuthKeys = {
  ACCESS_TOKEN: "access_token",
  USER_TIME: "user_inactivity_time",
} as const;

export const setAccessToken = (token: string): void => {
  storage.set(AuthKeys.ACCESS_TOKEN, token);
};

export const getAccessToken = (): string | undefined => {
  return storage.getString(AuthKeys.ACCESS_TOKEN);
};

export const clearAuth = (): void => {
  storage.delete(AuthKeys.ACCESS_TOKEN);
};

export const recordStartTime = (): void => {
  storage.set(AuthKeys.USER_TIME, Date.now());
};

export const getStartTime = (): number => {
  return storage.getNumber(AuthKeys.USER_TIME) || 0;
};

export const clearStartTime = (): void => {
  storage.delete(AuthKeys.USER_TIME);
};
