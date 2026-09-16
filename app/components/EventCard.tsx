import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Event } from '../data/events';

interface EventCardProps {
  event: Event;
  isJoined: boolean;
  onPress: () => void;
}

export default function EventCard({ event, isJoined, onPress }: EventCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={[styles.badge, isJoined ? styles.joinedBadge : styles.availableBadge]}>
          {isJoined ? 'Joined' : 'Available'}
        </Text>
      </View>
      <Text style={styles.detail}>{event.category}</Text>
      <Text style={styles.detail}>{event.date} · {event.time}</Text>
      <Text style={styles.detail}>{event.venue}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  availableBadge: {
    backgroundColor: '#e2e8f0',
    color: '#475569',
  },
  joinedBadge: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
