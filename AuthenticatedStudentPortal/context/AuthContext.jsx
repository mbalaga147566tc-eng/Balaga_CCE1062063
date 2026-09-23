import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Platform } from 'react-native';
import { login, getCurrentUser } from '../services/api';
import { getProfileName, getToken, removeProfileName, removeToken, saveProfileName, saveToken } from '../utils/storage';

const AuthContext = createContext(null);
const LOCAL_DEMO_USERNAME = 'mavy balaga';
const LOCAL_DEMO_PASSWORD = 'Mavypass';
const LOCAL_DEMO_TOKEN = 'local-demo-mavy-session';
const LOCAL_DEMO_USER = {
  id: 147566,
  firstName: 'Mavy',
  lastName: 'Balaga',
  username: 'balaga',
  email: 'mavy.balaga@example.com',
  gender: 'male',
  image: '',
};

function isBrowserRefresh() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const navigation = window.performance?.getEntriesByType?.('navigation')?.[0];
  return navigation?.type === 'reload';
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [displayName, setDisplayNameState] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sessionMessage, setSessionMessage] = useState('');

  const endSession = useCallback(async (message = '') => {
    await Promise.all([removeToken(), removeProfileName()]);
    setToken(null);
    setUser(null);
    setDisplayNameState('');
    setSessionMessage(message);
  }, []);

  const handleUnauthorized = useCallback(async () => {
    await endSession('Your session has expired. Please log in again.');
    router.replace('/login');
  }, [endSession]);

  const loadProfile = useCallback(async (accessToken, restoring = false) => {
    if (accessToken === LOCAL_DEMO_TOKEN) {
      setUser(LOCAL_DEMO_USER);
      setSessionMessage('');
      return LOCAL_DEMO_USER;
    }
    try {
      const profile = await getCurrentUser(accessToken);
      setUser(profile);
      setSessionMessage('');
      return profile;
    } catch (error) {
      if (error.status === 401) {
        await handleUnauthorized();
      } else if (restoring) {
        setSessionMessage('Could not reach the profile service. Please try again.');
      } else {
        setSessionMessage('Could not refresh your profile. Check your connection and try again.');
      }
      return null;
    }
  }, [handleUnauthorized]);

  useEffect(() => {
    let active = true;
    async function restoreSession() {
      try {
        if (isBrowserRefresh()) {
          await Promise.all([removeToken(), removeProfileName()]);
          return;
        }
        const [savedToken, savedName] = await Promise.all([getToken(), getProfileName()]);
        if (active && savedName) setDisplayNameState(savedName);
        if (!savedToken) return;
        if (active) setToken(savedToken);
        await loadProfile(savedToken, true);
      } catch {
        if (active) {
          await endSession('Could not restore your session. Please log in again.');
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }
    restoreSession();
    return () => { active = false; };
  }, [endSession, loadProfile]);

  const signIn = useCallback(async (username, password) => {
    if (username.trim().toLowerCase() === LOCAL_DEMO_USERNAME || username.trim().toLowerCase() === 'mavy') {
      if (password !== LOCAL_DEMO_PASSWORD) {
        throw new Error('Incorrect password for the Mavy demo account.');
      }
      await saveToken(LOCAL_DEMO_TOKEN);
      setToken(LOCAL_DEMO_TOKEN);
      setUser(LOCAL_DEMO_USER);
      setSessionMessage('');
      router.replace('/profile');
      return;
    }

    const result = await login(username, password);
    if (!result.accessToken) throw new Error('The server did not return an access token.');
    await saveToken(result.accessToken);
    setToken(result.accessToken);
    setUser(result);
    setSessionMessage('');
    const profile = await loadProfile(result.accessToken);
    if (!profile) {
      await removeToken();
      setToken(null);
      setUser(null);
      throw new Error('Unable to load your profile. Please try logging in again.');
    }
    router.replace('/profile');
  }, [loadProfile]);

  const signOut = useCallback(async () => {
    await endSession('');
    router.replace('/login');
  }, [endSession]);

  const setDisplayName = useCallback(async (name) => {
    await saveProfileName(name);
    setDisplayNameState(name);
  }, []);


  const clearMessage = useCallback(() => setSessionMessage(''), []);
  const value = { token, user, displayName, setDisplayName, isLocalDemo: token === LOCAL_DEMO_TOKEN, isLoading, isAuthenticated: Boolean(token && user), sessionMessage, message: sessionMessage, signIn, signOut, loadProfile, clearMessage };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider.');
  return context;
}
