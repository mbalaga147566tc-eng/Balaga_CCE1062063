import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { signIn, message, clearMessage } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    if (loading) return;
    clearMessage();
    setError('');
    if (!username.trim() || !password) {
      setError('Please enter your username and password.');
      return;
    }
    setLoading(true);
    try {
      await signIn(username.trim(), password);
    } catch (err) {
      setError(err.message || 'Unable to log in. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.fill} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View pointerEvents="none" style={styles.backgroundOrb} />
          <View style={styles.brandRow}>
            <View style={styles.brandMark}><Text style={styles.brandLetter}>SP</Text></View>
            <View><Text style={styles.brandName}>STUDENT PORTAL</Text><Text style={styles.brandCaption}>LEARNING · PROFILE · INSPIRATION</Text></View>
          </View>
          <Text style={styles.eyebrow}>WELCOME BACK</Text>
          <Text style={styles.title}>Make today count.</Text>
          <Text style={styles.subtitle}>Sign in to your student space and pick up where you left off.</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sign in</Text>
            <Text style={styles.cardSubtitle}>Enter your account details to continue.</Text>
            <Text style={styles.label}>Username</Text>
            <TextInput autoCapitalize="none" autoCorrect={false} value={username} onChangeText={setUsername} placeholder="Enter your username" placeholderTextColor="#94A3B8" style={styles.input} editable={!loading} returnKeyType="next" />
            <Text style={[styles.label, styles.passwordLabel]}>Password</Text>
            <View style={styles.passwordRow}>
              <TextInput value={password} onChangeText={setPassword} placeholder="Enter your password" placeholderTextColor="#94A3B8" style={styles.passwordInput} secureTextEntry={!showPassword} editable={!loading} onSubmitEditing={handleLogin} returnKeyType="done" />
              <Pressable accessibilityRole="button" accessibilityLabel={showPassword ? 'Hide password' : 'Show password'} onPress={() => setShowPassword((visible) => !visible)} disabled={loading} style={styles.passwordToggle}><Text style={styles.passwordToggleText}>{showPassword ? 'HIDE' : 'SHOW'}</Text></Pressable>
            </View>
            {!!message && <Text style={styles.notice}>{message}</Text>}
            {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
            <Pressable accessibilityRole="button" disabled={loading} onPress={handleLogin} style={({ pressed }) => [styles.button, (pressed || loading) && styles.buttonDim]}>
              {loading ? <ActivityIndicator color="#FFFFFF" /> : <><Text style={styles.buttonText}>CONTINUE TO PORTAL</Text><Text style={styles.buttonArrow}>→</Text></>}
            </Pressable>
          </View>
          <View style={styles.demoBox}>
            <Text style={styles.demoHeading}>DEMO ACCOUNTS</Text>
            <Text style={styles.demoLine}><Text style={styles.demoType}>Local</Text>  Mavy Balaga  ·  Mavypass</Text>
            <Text style={styles.demoLine}><Text style={styles.demoType}>API</Text>  emilys  ·  emilyspass</Text>
          </View>
          <Text style={styles.footer}>A simple space for your student life.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#EDF3FB' }, fill: { flex: 1 },
  container: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 28, maxWidth: 540, width: '100%', alignSelf: 'center', overflow: 'hidden' },
  backgroundOrb: { position: 'absolute', width: 280, height: 280, borderRadius: 140, right: -160, top: 70, backgroundColor: '#E0EBFA' },
  brandRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 34 },
  brandMark: { width: 49, height: 49, borderRadius: 16, backgroundColor: '#1769E0', alignItems: 'center', justifyContent: 'center', marginRight: 12, shadowColor: '#1769E0', shadowOpacity: 0.2, shadowRadius: 10, shadowOffset: { width: 0, height: 5 }, elevation: 3 },
  brandLetter: { color: '#FFFFFF', fontWeight: '900', fontSize: 16, letterSpacing: -0.5 }, brandName: { color: '#19365C', fontWeight: '900', fontSize: 11, letterSpacing: 1.3 }, brandCaption: { color: '#8A9BB0', fontWeight: '700', fontSize: 8, letterSpacing: 0.6, marginTop: 4 },
  eyebrow: { color: '#1769E0', fontWeight: '800', letterSpacing: 2, fontSize: 10 },
  title: { fontSize: 35, lineHeight: 42, fontWeight: '900', color: '#10213A', marginTop: 8 },
  subtitle: { color: '#60718A', fontSize: 14, lineHeight: 21, marginTop: 8, marginBottom: 23, maxWidth: 390 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 22, borderWidth: 1, borderColor: '#E4EBF4', shadowColor: '#16345C', shadowOpacity: 0.08, shadowRadius: 20, shadowOffset: { width: 0, height: 9 }, elevation: 4 },
  cardTitle: { color: '#152B47', fontSize: 19, fontWeight: '800' }, cardSubtitle: { color: '#8290A3', fontSize: 12, marginTop: 4, marginBottom: 22 },
  label: { color: '#24364F', fontSize: 13, fontWeight: '700', marginBottom: 9 }, passwordLabel: { marginTop: 18 },
  input: { height: 51, borderWidth: 1, borderColor: '#DCE5F0', backgroundColor: '#FAFCFF', borderRadius: 12, paddingHorizontal: 14, color: '#10213A', fontSize: 14 },
  passwordRow: { height: 51, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#DCE5F0', backgroundColor: '#FAFCFF', borderRadius: 12 }, passwordInput: { flex: 1, height: 50, paddingHorizontal: 14, color: '#10213A', fontSize: 14 }, passwordToggle: { paddingHorizontal: 13, paddingVertical: 12 }, passwordToggleText: { color: '#1769E0', fontWeight: '800', fontSize: 9, letterSpacing: 0.5 },
  button: { minHeight: 53, borderRadius: 13, backgroundColor: '#1769E0', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 22, shadowColor: '#1769E0', shadowOpacity: 0.16, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2 }, buttonDim: { opacity: 0.72 }, buttonText: { color: '#FFFFFF', fontSize: 12, letterSpacing: 0.9, fontWeight: '800' }, buttonArrow: { color: '#FFFFFF', fontSize: 18, marginLeft: 9, marginTop: -2 },
  error: { marginTop: 14, color: '#B42318', fontSize: 13, lineHeight: 19 }, notice: { marginTop: 14, color: '#1769A7', fontSize: 13, lineHeight: 19 },
  demoBox: { backgroundColor: '#E4EDF9', borderRadius: 14, paddingHorizontal: 15, paddingVertical: 12, marginTop: 17 }, demoHeading: { color: '#68809F', fontWeight: '900', fontSize: 9, letterSpacing: 1.1, marginBottom: 7 }, demoLine: { color: '#425B7B', fontSize: 11, lineHeight: 19 }, demoType: { color: '#1769E0', fontWeight: '900' },
  footer: { color: '#9AA6B5', textAlign: 'center', marginTop: 20, fontSize: 10 },
});
