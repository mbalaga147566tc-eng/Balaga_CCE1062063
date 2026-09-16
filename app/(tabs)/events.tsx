import { useState } from 'react';
import { View, StyleSheet, FlatList, Pressable, Text } from 'react-native';
import { router } from 'expo-router';
import EventCard from '../../components/EventCard';
import { useAppContext } from '../../context/AppContext';

const CATEGORIES = ['All', 'Academic', 'Sports', 'Cultural', 'Workshop', 'Social'];

export default function Events() {
  const { events, joinedEventIds } = useAppContext();
  const [filter, setFilter] = useState('All');

  const filteredEvents = events.filter(e => filter === 'All' || e.category === filter);

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {CATEGORIES.map(cat => (
          <Pressable 
            key={cat} 
            style={[styles.filterButton, filter === cat && styles.filterActive]}
            onPress={() => setFilter(cat)}
          >
            <Text style={[styles.filterText, filter === cat && styles.filterTextActive]}>{cat}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <EventCard 
            event={item} 
            isJoined={joinedEventIds.includes(item.id)}
            onPress={() => router.push(`/event/${item.id}`)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
  },
  filterActive: {
    backgroundColor: '#0056b3',
  },
  filterText: {
    color: '#495057',
    fontSize: 14,
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  }
});
