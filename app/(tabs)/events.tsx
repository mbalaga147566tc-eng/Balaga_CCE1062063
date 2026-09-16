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
      <View style={styles.header}>
        <Text style={styles.eyebrow}>CAMPUS CALENDAR</Text>
        <Text style={styles.title}>Find your next event</Text>
        <Text style={styles.subtitle}>{filteredEvents.length} events ready for you to explore</Text>
      </View>
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
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FA',
  },
  header: {
    backgroundColor: '#0F2F3A',
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  eyebrow: {
    color: '#7DD3C7',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '800',
    letterSpacing: -0.7,
  },
  subtitle: {
    color: '#D9E8E8',
    fontSize: 14,
    marginTop: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#E8EEF2',
  },
  filterActive: {
    backgroundColor: '#0F766E',
  },
  filterText: {
    color: '#52606D',
    fontSize: 13,
    fontWeight: '700',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: '800',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    paddingTop: 0,
  }
});
