import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function LoadingScreen({ message }) {
  return <View style={styles.container}><ActivityIndicator size="large" color="#1769E0" /><Text style={styles.message}>{message}</Text></View>;
}

const styles = StyleSheet.create({ container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F7FC' }, message: { marginTop: 15, color: '#60718A', fontSize: 14 } });
