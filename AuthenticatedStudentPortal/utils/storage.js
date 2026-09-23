import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'accessToken';
const PROFILE_NAME_KEY = 'profileName';

export function saveToken(token) {
  return SecureStore.setItemAsync(TOKEN_KEY, token);
}

export function getToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export function removeToken() {
  return SecureStore.deleteItemAsync(TOKEN_KEY);
}

export function saveProfileName(name) {
  return SecureStore.setItemAsync(PROFILE_NAME_KEY, name);
}

export function getProfileName() {
  return SecureStore.getItemAsync(PROFILE_NAME_KEY);
}

export function removeProfileName() {
  return SecureStore.deleteItemAsync(PROFILE_NAME_KEY);
}
