const TOKEN_KEY = 'accessToken';
const PROFILE_NAME_KEY = 'profileName';

export async function saveToken(token) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export async function getToken() {
  return window.localStorage.getItem(TOKEN_KEY);
}

export async function removeToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

export async function saveProfileName(name) {
  window.localStorage.setItem(PROFILE_NAME_KEY, name);
}

export async function getProfileName() {
  return window.localStorage.getItem(PROFILE_NAME_KEY);
}

export async function removeProfileName() {
  window.localStorage.removeItem(PROFILE_NAME_KEY);
}
