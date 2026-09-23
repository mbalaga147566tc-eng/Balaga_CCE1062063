import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingScreen from '../components/LoadingScreen';
import { useAuth } from '../context/AuthContext';

function Detail({ label, value }) {
  return <View style={styles.detail}><Text style={styles.detailLabel}>{label}</Text><Text style={styles.detailValue}>{value || 'Not provided'}</Text></View>;
}

export default function ProfileScreen() {
  const { token, user, displayName, setDisplayName, isLocalDemo, isLoading, isAuthenticated, sessionMessage, loadProfile, signOut } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState('');
  const [nameError, setNameError] = useState('');
  useEffect(() => {
    if (token && !user) loadProfile(token);
  }, [token, user, loadProfile]);

  async function refreshProfile() {
    if (!token || refreshing) return;
    setRefreshing(true);
    await loadProfile(token);
    setRefreshing(false);
  }

  if (isLoading) return <LoadingScreen message="Restoring your profile..." />;
  if (!isAuthenticated) return <Redirect href="/login" />;
  if (!user) return <LoadingScreen message={sessionMessage || 'Loading your profile...'} />;

  const fullName = isLocalDemo ? 'Mavy Balaga' : [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username;
  const shownName = displayName || fullName;
  const shownEmail = isLocalDemo ? 'mavy.balaga@example.com' : user.email;
  const shownUsername = isLocalDemo ? '@balaga' : `@${user.username}`;
  const shownGender = isLocalDemo ? 'Male' : user.gender ? user.gender[0].toUpperCase() + user.gender.slice(1) : '';
  const shownId = isLocalDemo ? '147566' : String(user.id || '');

  async function saveName() {
    const trimmedName = nameDraft.trim();
    if (!trimmedName) {
      setNameError('Please enter a name.');
      return;
    }
    await setDisplayName(trimmedName);
    setNameError('');
    setIsEditingName(false);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topline}><View><Text style={styles.brand}>STUDENT PORTAL</Text><Text style={styles.heading}>My Profile</Text></View><View style={styles.status}><View style={styles.statusDot} /><Text style={styles.statusText}>SECURE</Text></View></View>
        <View style={styles.profileCard}>
          {user.image ? <Image source={{ uri: user.image }} style={styles.avatar} /> : <View style={styles.avatarFallback}><Text style={styles.avatarInitial}>{fullName.charAt(0).toUpperCase()}</Text></View>}
          {isEditingName ? (
            <View style={styles.nameEditor}>
              <TextInput autoFocus value={nameDraft} onChangeText={(value) => { setNameDraft(value); setNameError(''); }} placeholder="Enter your profile name" style={styles.nameInput} returnKeyType="done" onSubmitEditing={saveName} />
              {!!nameError && <Text style={styles.nameError}>{nameError}</Text>}
              <View style={styles.nameActions}>
                <Pressable onPress={() => { setIsEditingName(false); setNameError(''); }} style={styles.cancelNameButton}><Text style={styles.cancelNameText}>Cancel</Text></Pressable>
                <Pressable onPress={saveName} style={styles.saveNameButton}><Text style={styles.saveNameText}>Save name</Text></Pressable>
              </View>
            </View>
          ) : (
            <>
              <Text style={styles.name}>{shownName}</Text>
              <Pressable onPress={() => { setNameDraft(shownName); setIsEditingName(true); }} style={styles.editNameButton}><Text style={styles.editNameText}>Edit profile name</Text></Pressable>
            </>
          )}
          <Text style={styles.username}>{shownUsername}</Text>
          <View style={styles.divider} />
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>EMAIL ADDRESS</Text>
            <Text style={styles.detailValue}>{shownEmail}</Text>
          </View>
          <Detail label="GENDER" value={shownGender} />
          <Detail label="USER ID" value={shownId} />
        </View>
        {!!sessionMessage && <Text style={styles.notice}>{sessionMessage}</Text>}
        {!isLocalDemo && <Pressable onPress={refreshProfile} disabled={refreshing} style={({ pressed }) => [styles.refreshButton, pressed && styles.pressed]}><Text style={styles.refreshText}>{refreshing ? 'Refreshing profile...' : 'Refresh profile'}</Text></Pressable>}
        <Pressable accessibilityRole="button" onPress={signOut} style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}><Text style={styles.logoutText}>LOG OUT</Text></Pressable>
        <Text style={styles.footer}>{isLocalDemo ? 'This is the local Mavy demo profile.' : 'Your profile is loaded from a protected account endpoint.'}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F3F7FC' }, content: { padding: 22, paddingBottom: 34 },
  topline: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, marginBottom: 22 }, brand: { color: '#1769E0', fontSize: 10, fontWeight: '800', letterSpacing: 1.8 }, heading: { color: '#10213A', fontWeight: '800', fontSize: 29, marginTop: 6 },
  status: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 20, backgroundColor: '#E7F7EE', paddingHorizontal: 11, paddingVertical: 8 }, statusDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#22945A' }, statusText: { color: '#177245', fontSize: 9, letterSpacing: 0.8, fontWeight: '800' },
  profileCard: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 22, alignItems: 'center', borderWidth: 1, borderColor: '#E5ECF5', shadowColor: '#16345C', shadowOpacity: 0.05, shadowRadius: 16, shadowOffset: { width: 0, height: 7 }, elevation: 2 },
  avatar: { width: 94, height: 94, borderRadius: 47, backgroundColor: '#E8F0FC' }, avatarFallback: { width: 94, height: 94, borderRadius: 47, backgroundColor: '#1769E0', alignItems: 'center', justifyContent: 'center' }, avatarInitial: { color: '#FFFFFF', fontSize: 38, fontWeight: '800' },
  name: { color: '#10213A', fontSize: 22, fontWeight: '800', marginTop: 15, textAlign: 'center' }, username: { color: '#6F8098', fontSize: 14, marginTop: 4 }, divider: { height: 1, alignSelf: 'stretch', backgroundColor: '#E9EEF5', marginVertical: 21 },
  editNameButton: { paddingHorizontal: 12, paddingVertical: 8, marginTop: 4 }, editNameText: { color: '#1769E0', fontSize: 13, fontWeight: '700' },
  nameEditor: { alignSelf: 'stretch', marginTop: 15 }, nameInput: { height: 48, borderWidth: 1, borderColor: '#C8D9F2', borderRadius: 11, paddingHorizontal: 12, color: '#10213A', fontSize: 16, textAlign: 'center' }, nameActions: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 10 },
  cancelNameButton: { minHeight: 40, paddingHorizontal: 17, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#EFF4FA' }, cancelNameText: { color: '#52647B', fontWeight: '700', fontSize: 13 }, saveNameButton: { minHeight: 40, paddingHorizontal: 17, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#1769E0' }, saveNameText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 }, nameError: { color: '#B42318', fontSize: 12, textAlign: 'center', marginTop: 6 },
  detail: { alignSelf: 'stretch', marginBottom: 18 }, detailLabel: { color: '#8795A8', fontSize: 10, letterSpacing: 1, fontWeight: '800' }, detailValue: { color: '#263A55', fontSize: 15, fontWeight: '600', marginTop: 6 },
  notice: { color: '#1769A7', backgroundColor: '#EAF4FF', padding: 13, borderRadius: 12, fontSize: 13, marginTop: 16, lineHeight: 19 },
  refreshButton: { minHeight: 48, alignItems: 'center', justifyContent: 'center', marginTop: 16, borderColor: '#C8D9F2', borderWidth: 1, borderRadius: 13, backgroundColor: '#FFFFFF' }, refreshText: { color: '#1769E0', fontWeight: '700', fontSize: 14 },
  logoutButton: { minHeight: 52, alignItems: 'center', justifyContent: 'center', marginTop: 12, backgroundColor: '#1769E0', borderRadius: 13 }, logoutText: { color: '#FFFFFF', fontSize: 13, letterSpacing: 1.1, fontWeight: '800' }, pressed: { opacity: 0.72 },
  footer: { color: '#8A97A8', fontSize: 11, textAlign: 'center', marginTop: 17, lineHeight: 17 },
});
