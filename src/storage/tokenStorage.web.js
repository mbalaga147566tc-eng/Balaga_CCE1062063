let webToken = null;

export async function saveToken(token) {
  if (typeof token !== 'string' || token.length === 0) {
    throw new Error('Unable to save the session.');
  }
  webToken = token;
}

export async function getToken() {
  return webToken;
}

export async function deleteToken() {
  webToken = null;
}
