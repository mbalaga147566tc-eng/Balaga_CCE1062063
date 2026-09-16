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
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>YOUR CAMPUS, CONNECTED</Text>
        <Text style={styles.appTitle}>Event Mate</Text>
        <Text style={styles.welcome}>Hello, {userProfile.name.split(' ')[0]}. Discover what is happening around campus today.</Text>
      </View>
      <Text style={styles.sectionTitle}>Your overview</Text>
      
      <View style={styles.statsContainer}>
        <StatCard title="Total events" value={upcomingEventsCount} icon="*" width={cardWidth} />
        <StatCard title="Going" value={joinedCount} icon="+" width={cardWidth} />
        <StatCard title="To explore" value={upcomingEventsCount - joinedCount} icon="->" width={cardWidth} />
      </View>

      <Link href="/(tabs)/events" asChild>
        <Pressable style={styles.actionButton}>
          <Text style={styles.actionText}>Explore events</Text>
        </Pressable>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 28,
    flexGrow: 1,
    backgroundColor: '#F6F8FA',
  },
  hero: {
    backgroundColor: '#0F2F3A',
    padding: 24,
    borderRadius: 26,
    marginBottom: 26,
  },
  eyebrow: {
    color: '#7DD3C7',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.3,
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
    marginBottom: 10,
  },
  welcome: {
    fontSize: 15,
    lineHeight: 22,
    color: '#D9E8E8',
  },
  sectionTitle: {
    color: '#0F172A',
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  actionButton: {
    backgroundColor: '#0F766E',
    paddingVertical: 17,
    borderRadius: 16,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  }
});
