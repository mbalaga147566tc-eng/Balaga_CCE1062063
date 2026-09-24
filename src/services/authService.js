const BASE_URL = 'https://dummyjson.com';

export async function loginUser(username, password) {
  let response;
  try {
    response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, expiresInMins: 30 }),
    });
  } catch {
    throw new Error('Unable to connect. Check your internet connection and try again.');
  }

  if (!response.ok) {
    throw new Error('Login failed. Check your username and password.');
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('Something went wrong. Please try again.');
  }
  return data;
}

export async function getCurrentUser(token) {
  let response;
  try {
    response = await fetch(`${BASE_URL}/auth/me`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    throw new Error('Unable to load your profile. Please try again.');
  }

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      const error = new Error('Your session has expired. Please log in again.');
      error.name = 'AuthenticationError';
      throw error;
    }
    throw new Error('Unable to load your profile. Please try again.');
  }

  try {
    return await response.json();
  } catch {
    throw new Error('Unable to load your profile. Please try again.');
  }
}
