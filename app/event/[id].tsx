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
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: '#0056b3',
    fontWeight: '600',
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoLabel: {
    fontWeight: 'bold',
    width: 100,
    color: '#555',
  },
  infoValue: {
    flex: 1,
    color: '#333',
  },
  descriptionLabel: { fontSize: 15, fontWeight: 'bold', color: '#334155', marginTop: 10, marginBottom: 7 },
  description: { color: '#475569', fontSize: 15, lineHeight: 22 },
  statusContainer: {
    marginTop: 24,
    marginBottom: 24,
    padding: 12,
    backgroundColor: '#f1f5f9',
    borderRadius: 6,
  },
  statusText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#475569',
    textAlign: 'center',
  },
  actionButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  pressed: { opacity: 0.75 },
  joinButton: {
    backgroundColor: '#198754',
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
