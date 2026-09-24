import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'access_token';

export async function saveToken(token) {
  if (typeof token !== 'string' || token.length === 0) {
    throw new Error('Unable to save the session securely.');
  }
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getToken() {
  return (await SecureStore.getItemAsync(TOKEN_KEY)) ?? null;
}

export async function deleteToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
