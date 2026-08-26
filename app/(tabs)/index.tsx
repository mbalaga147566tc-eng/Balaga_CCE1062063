import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.card}>
        <ThemedText type="title" style={styles.appTitle}>
          Student Profile
        </ThemedText>

        <ThemedText type="subtitle" style={styles.name}>
          Mavy Lorenz Balaga
        </ThemedText>

        <ThemedText style={styles.course}>
          BSIT - Bachelor of Science in Information Technology
        </ThemedText>

        <ThemedText style={styles.ideaTitle}>
          App Idea
        </ThemedText>

        <ThemedText style={styles.idea}>
          A simple student profile app that displays basic
          information about the student, course, and academic
          background in a clean and organized design.
        </ThemedText>

        <View style={styles.infoBox}>
          <ThemedText style={styles.label}>Student</ThemedText>
          <ThemedText style={styles.value}>
            Mavy Lorenz Balaga
          </ThemedText>
        </View>

        <View style={styles.infoBox}>
          <ThemedText style={styles.label}>Course</ThemedText>
          <ThemedText style={styles.value}>
            BSIT
          </ThemedText>
        </View>

        <View style={styles.infoBox}>
          <ThemedText style={styles.label}>Program</ThemedText>
          <ThemedText style={styles.value}>
            Information Technology
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFF3FF',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  appTitle: {
    color: '#1769AA',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  name: {
    color: '#222222',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  course: {
    color: '#555555',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 25,
  },
  ideaTitle: {
    color: '#1769AA',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  idea: {
    color: '#444444',
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#EAF7FF',
    borderLeftWidth: 5,
    borderLeftColor: '#1769AA',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  label: {
    color: '#1769AA',
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  value: {
    color: '#222222',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 3,
  },
});