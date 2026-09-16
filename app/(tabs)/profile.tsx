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
      </View>

      <View style={styles.form}>
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
    padding: 16,
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 38, fontWeight: '800' },
  currentName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
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
    backgroundColor: '#0056b3',
    padding: 14,
    borderRadius: 6,
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
