import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCurrentUser, loginUser } from '../services/authService';
import { deleteToken, getToken, saveToken } from '../storage/tokenStorage';

export default function HomeScreen() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let active = true;
    async function restoreSession() {
      try {
        const token = await getToken();
        if (!active) return;
        if (!token) {
          setLoading(false);
          return;
        }
        try {
          const user = await getCurrentUser(token);
          if (active) setProfile(user);
        } catch (err) {
          if (err?.name === 'AuthenticationError') {
            try { await deleteToken(); } catch {}
            if (active) {
              setProfile(null);
              setError('Your saved session has expired. Please log in again.');
            }
          } else if (active) {
            setError('Unable to restore your session. Please try again.');
          }
        }
      } catch {
        if (active) setError('Unable to restore your session. Please log in again.');
      } finally {
        if (active) setLoading(false);
      }
    }
    restoreSession();
    return () => { active = false; };
  }, []);

  async function handleLogin() {
    if (loading) return;
    setError('');
    setNotice('');
    setLoading(true);
    let receivedToken = false;
    try {
      const data = await loginUser(username.trim(), password);
      if (!data?.accessToken) throw new Error('Login failed. Check your username and password.');
      await saveToken(data.accessToken);
      receivedToken = true;
      const user = await getCurrentUser(data.accessToken);
      setProfile(user);
    } catch (err) {
      if (receivedToken) {
        try { await deleteToken(); } catch {}
      }
      setProfile(null);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoading(true);
    setError('');
    setNotice('');
    try {
      await deleteToken();
      setProfile(null);
      setPassword('emilyspass');
      setNotice('You have been securely logged out.');
    } catch {
      setError('Unable to log out securely. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (loading && !profile) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Checking your secure session…</Text>
      </SafeAreaView>
    );
  }

  if (profile) {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.page}>
          <Text style={styles.eyebrow}>CCE106 · SECURE PROFILE</Text>
          <Text style={styles.title}>Your profile</Text>
          <Text style={styles.subtitle}>You’re signed in to your secure account.</Text>
          <View style={styles.card}>
            {profile.image ? <Image source={{ uri: profile.image }} style={styles.avatar} /> :
              <View style={styles.avatarFallback}><Text style={styles.avatarText}>{profile.firstName?.[0] ?? 'U'}</Text></View>}
            <Text style={styles.name}>{profile.firstName} {profile.lastName}</Text>
            <Text style={styles.handle}>@{profile.username}</Text>
            <View style={styles.divider} />
            <Text style={styles.label}>EMAIL</Text>
            <Text style={styles.value}>{profile.email}</Text>
            <Text style={styles.label}>USER ID</Text>
            <Text style={styles.value}>{profile.id}</Text>
          </View>
          {!!error && <Text style={styles.error}>{error}</Text>}
          <Pressable style={[styles.button, styles.logout]} onPress={handleLogout} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Log out</Text>}
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
          <View style={styles.brandMark}><Text style={styles.brandGlyph}>SP</Text></View>
          <Text style={styles.eyebrow}>CCE106 · AUTHENTICATION LAB</Text>
          <Text style={styles.title}>Secure Profile</Text>
          <Text style={styles.subtitle}>Sign in to securely access your profile.</Text>
          {Platform.OS === 'web' && <Text style={styles.webNote}>Browser preview uses temporary session storage. Use Android or iOS for secure, persistent sign-in.</Text>}
          {!!notice && <Text style={styles.successNotice}>{notice}</Text>}
          <View style={styles.form}>
            <Text style={styles.label}>USERNAME</Text>
            <TextInput style={styles.input} value={username} onChangeText={setUsername}
              autoCapitalize="none" autoCorrect={false} placeholder="Enter username"
              editable={!loading} returnKeyType="next" />
            <Text style={[styles.label, styles.passwordLabel]}>PASSWORD</Text>
            <TextInput style={styles.input} value={password} onChangeText={setPassword}
              secureTextEntry autoCapitalize="none" placeholder="Enter password"
              editable={!loading} returnKeyType="done" onSubmitEditing={handleLogin} />
            {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
            <Pressable style={[styles.button, loading && styles.buttonDisabled]} onPress={handleLogin} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Log in securely</Text>}
            </Pressable>
          </View>
          <Text style={styles.footer}>{Platform.OS === 'web' ? 'Browser session is temporary and clears when the page reloads.' : 'Your session is protected with secure on-device storage.'}</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: '#f4f6f2' },
  centered: { flex: 1, backgroundColor: '#f4f6f2', alignItems: 'center', justifyContent: 'center', gap: 14 },
  loadingText: { color: '#718078', fontSize: 15 },
  page: { flexGrow: 1, width: '100%', maxWidth: 520, alignSelf: 'center', justifyContent: 'center', padding: 28, paddingVertical: 42 },
  brandMark: { width: 58, height: 58, borderRadius: 20, backgroundColor: '#17483d', alignItems: 'center', justifyContent: 'center', marginBottom: 27, shadowColor: '#17483d', shadowOpacity: 0.16, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 4 },
  brandGlyph: { color: '#d8f5e5', fontSize: 17, fontWeight: '800', letterSpacing: 1.5 },
  eyebrow: { color: '#527b6a', fontSize: 10, fontWeight: '800', letterSpacing: 1.8, marginBottom: 11 },
  title: { color: '#172922', fontSize: 34, lineHeight: 41, fontWeight: '800', letterSpacing: -1 },
  subtitle: { color: '#728078', fontSize: 15, lineHeight: 23, marginTop: 9 },
  webNote: { marginTop: 18, padding: 13, color: '#476554', backgroundColor: '#e6f0e8', borderRadius: 12, lineHeight: 19, fontSize: 13 },
  form: { marginTop: 30, backgroundColor: '#fff', padding: 23, borderRadius: 22, borderWidth: 1, borderColor: '#e9eee8', shadowColor: '#203a2d', shadowOpacity: 0.06, shadowRadius: 22, shadowOffset: { width: 0, height: 10 }, elevation: 3 },
  label: { color: '#75827a', fontSize: 10, fontWeight: '800', letterSpacing: 1.35, marginBottom: 10 },
  passwordLabel: { marginTop: 20 },
  input: { height: 54, borderWidth: 1, borderColor: '#e1e8e1', backgroundColor: '#fafbf9', borderRadius: 13, paddingHorizontal: 15, fontSize: 16, color: '#182a24' },
  button: { minHeight: 54, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: '#17483d', marginTop: 25 },
  buttonDisabled: { opacity: 0.62 },
  buttonText: { color: '#f5fff8', fontSize: 15, fontWeight: '700' },
  successNotice: { marginTop: 20, padding: 13, color: '#24563d', backgroundColor: '#e3f3e7', borderRadius: 12, lineHeight: 20, fontSize: 14, fontWeight: '600' },
  error: { marginTop: 15, padding: 12, color: '#9f342d', backgroundColor: '#fff0ed', borderRadius: 11, overflow: 'hidden', lineHeight: 20, fontSize: 13 },
  footer: { textAlign: 'center', color: '#87948c', fontSize: 12, marginTop: 23, lineHeight: 18 },
  card: { alignItems: 'center', backgroundColor: '#fff', marginTop: 27, padding: 26, borderRadius: 24, borderWidth: 1, borderColor: '#e9eee8', shadowColor: '#203a2d', shadowOpacity: 0.06, shadowRadius: 22, shadowOffset: { width: 0, height: 10 }, elevation: 3 },
  avatar: { width: 92, height: 92, borderRadius: 46, backgroundColor: '#e9efe9', marginBottom: 17 },
  avatarFallback: { width: 92, height: 92, borderRadius: 46, backgroundColor: '#dff2e5', alignItems: 'center', justifyContent: 'center', marginBottom: 17 },
  avatarText: { color: '#17483d', fontWeight: '800', fontSize: 32 },
  name: { color: '#172922', fontSize: 24, fontWeight: '800', letterSpacing: -0.4 },
  handle: { color: '#718078', fontSize: 15, marginTop: 6 },
  divider: { height: 1, alignSelf: 'stretch', backgroundColor: '#edf1ed', marginVertical: 23 },
  value: { color: '#23382e', fontSize: 15, marginBottom: 20 },
  logout: { backgroundColor: '#263a31' },
});



