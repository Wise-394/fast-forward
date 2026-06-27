import { storage } from "@/configs/MMKV";

export const setUsername = (user: string) => {
  storage.set("username", user);
};

export const getUsername = (): string => {
  return storage.getString("username") ?? "";
};
