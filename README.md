# Secure Profile App

Name: [Your Name]  
Section: [Your Section]

A CCE106 lab app that signs in to DummyJSON and retrieves the authenticated user's profile.

## Installation

```bash
npm install
npx expo install expo-secure-store
```

## Run

```bash
npx expo start
```

Use a native Android or iOS device or simulator for testing. This app is intended for native Android/iOS testing rather than web.

## Security summary

The access token is stored with Expo SecureStore and sent only in the Bearer Authorization header. The token is removed on logout and when a saved session is rejected. The interface does not display the token or log credentials.
