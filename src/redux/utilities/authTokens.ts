import * as SecureStore from "expo-secure-store";

export const saveTokensToSecureStore = async (
  accessToken: string,
  refreshToken: string
) => {
  await SecureStore.setItemAsync("access_token", accessToken);
  await SecureStore.setItemAsync("refresh_token", refreshToken);
};

export const deleteTokensFromSecureStore = async () => {
  await SecureStore.deleteItemAsync("access_token");
  await SecureStore.deleteItemAsync("refresh_token");
};

export const getTokensFromSecureStore = async () => {
  const accessToken = await SecureStore.getItemAsync("access_token");
  const refreshToken = await SecureStore.getItemAsync("refresh_token");

  return { accessToken, refreshToken };
};
