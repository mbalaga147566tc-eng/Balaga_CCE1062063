# Reflection

1. **Why is SecureStore more appropriate than plain-text storage for an access token?**  
   SecureStore uses platform-provided secure storage, which better protects sensitive values than ordinary app storage.

2. **What is the purpose of the Authorization header?**  
   It sends the access token with a protected request so the API can verify the user's authenticated session.

3. **What should the app do when a stored token is expired or rejected?**  
   Delete the rejected token, clear the profile, and return to the login screen with a safe message.
