import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useAppContext } from '../../context/AppContext';

export default function Profile() {
  const { userProfile, updateUserProfile } = useAppContext();
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    setNameError('');
    setEmailError('');
    setSuccess(false);

    if (!name.trim()) setNameError('Full Name is required.');
    if (!email.trim()) setEmailError('Email is required.');
    if (!name.trim() || !email.trim()) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    updateUserProfile({ name, email });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{userProfile.name.charAt(0).toUpperCase()}</Text></View>
        <Text style={styles.currentName}>{userProfile.name}</Text>
        <Text style={styles.profileHint}>Manage your Event Mate profile</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.formTitle}>Personal details</Text>
        <Text style={styles.formCopy}>Keep your information up to date for a smoother event experience.</Text>
        <Text style={styles.label}>Full Name</Text>
        <TextInput 
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

        <Text style={styles.label}>Email Address</Text>
        <TextInput 
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {success ? <Text style={styles.successText}>Profile saved successfully!</Text> : null}

        <Pressable 
          style={({ pressed }) => [styles.saveButton, pressed && styles.saveButtonPressed]} 
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 30,
    flexGrow: 1,
    backgroundColor: '#F6F8FA',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatar: {
    width: 94,
    height: 94,
    borderRadius: 47,
    marginBottom: 12,
    backgroundColor: '#0F766E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 38, fontWeight: '800' },
  currentName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  profileHint: { color: '#64748B', fontSize: 14, marginTop: 6 },
  form: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E8EEF2',
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  formTitle: { color: '#0F172A', fontSize: 19, fontWeight: '800', marginBottom: 5 },
  formCopy: { color: '#64748B', fontSize: 13, lineHeight: 19, marginBottom: 22 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D8E1E8',
    borderRadius: 13,
    padding: 14,
    fontSize: 16,
    color: '#0F172A',
    backgroundColor: '#FAFCFD',
    marginBottom: 16,
  },
  errorText: {
    color: '#dc3545',
    marginBottom: 16,
    fontSize: 14,
  },
  successText: {
    color: '#198754',
    marginBottom: 16,
    fontSize: 14,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#0F766E',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  saveButtonPressed: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
