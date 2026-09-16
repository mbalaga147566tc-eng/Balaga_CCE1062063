import { View, Text, StyleSheet, ScrollView, useWindowDimensions, Pressable } from 'react-native';
import { Link } from 'expo-router';
import StatCard from '../../components/StatCard';
import { useAppContext } from '../../context/AppContext';

export default function Home() {
  const { width } = useWindowDimensions();
  const { events, joinedEventIds, userProfile } = useAppContext();
  
  // Responsive card width calculation
  const isWide = width > 600;
  const cardWidth = isWide ? (width - 64) / 3 : (width - 48) / 2;

  const upcomingEventsCount = events.length; 
  const joinedCount = joinedEventIds.length;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.appTitle}>EventMate</Text>
      <Text style={styles.welcome}>Welcome back, {userProfile.name}!</Text>
      
      <View style={styles.statsContainer}>
        <StatCard title="Total Events" value={upcomingEventsCount} width={cardWidth} />
        <StatCard title="Joined Events" value={joinedCount} width={cardWidth} />
        <StatCard title="Upcoming" value={upcomingEventsCount - joinedCount} width={cardWidth} />
      </View>

      <Link href="/(tabs)/events" asChild>
        <Pressable style={styles.actionButton}>
          <Text style={styles.actionText}>Browse All Events</Text>
        </Pressable>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: 8,
  },
  welcome: {
    fontSize: 18,
    color: '#333',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: '#0056b3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});