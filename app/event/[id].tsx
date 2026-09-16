import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useAppContext } from '../../context/AppContext';

export default function EventDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { events, joinedEventIds, toggleJoinEvent } = useAppContext();

  const event = events.find(e => e.id === id);
  
  if (!event) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Event Not Found</Text>
        <Text style={styles.notFoundCopy}>Sorry, the event you are looking for does not exist.</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const isJoined = joinedEventIds.includes(event.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>EVENT DETAILS</Text>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.category}>{event.category}</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Date & Time:</Text>
          <Text style={styles.infoValue}>{event.date} · {event.time}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Venue:</Text>
          <Text style={styles.infoValue}>{event.venue}</Text>
        </View>
        <Text style={styles.descriptionLabel}>About this event</Text>
        <Text style={styles.description}>{event.description}</Text>

        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            Status: {isJoined ? 'You are attending this event.' : 'You have not joined.'}
          </Text>
        </View>

        <Pressable 
          style={({ pressed }) => [styles.actionButton, isJoined ? styles.leaveButton : styles.joinButton, pressed && styles.pressed]} 
          onPress={() => toggleJoinEvent(event.id)}
        >
          <Text style={styles.actionButtonText}>
            {isJoined ? 'Leave Event' : 'Join Event'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 28,
    backgroundColor: '#F6F8FA',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 22,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E8EEF2',
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  eyebrow: { color: '#0F766E', fontSize: 11, fontWeight: '800', letterSpacing: 1.2, marginBottom: 10 },
  title: {
    fontSize: 27,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  category: {
    fontSize: 16,
    color: '#0F766E',
    fontWeight: '800',
    marginBottom: 26,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoLabel: {
    fontWeight: '800',
    width: 100,
    color: '#334155',
  },
  infoValue: {
    flex: 1,
    color: '#333',
  },
  descriptionLabel: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginTop: 14, marginBottom: 8 },
  description: { color: '#475569', fontSize: 15, lineHeight: 23 },
  statusContainer: {
    marginTop: 24,
    marginBottom: 24,
    padding: 14,
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
  },
  statusText: {
    fontSize: 14,
    color: '#047857',
    textAlign: 'center',
  },
  actionButton: {
    padding: 17,
    borderRadius: 14,
    alignItems: 'center',
  },
  pressed: { opacity: 0.75 },
  joinButton: {
    backgroundColor: '#0F766E',
  },
  leaveButton: {
    backgroundColor: '#dc3545',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: '#dc3545',
    marginBottom: 16,
  },
  notFoundCopy: { color: '#64748b', textAlign: 'center', marginBottom: 18 },
  backButton: {
    padding: 12,
    backgroundColor: '#6c757d',
    borderRadius: 6,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
