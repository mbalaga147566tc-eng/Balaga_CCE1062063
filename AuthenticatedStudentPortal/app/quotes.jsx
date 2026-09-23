import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const QUOTE_URL = 'https://dummyjson.com/quotes/random';

export default function QuotesScreen() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quotesViewed, setQuotesViewed] = useState(0);

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(QUOTE_URL);
      if (!response.ok) throw new Error('Quote request failed.');
      const data = await response.json();
      if (!data.quote || !data.author) throw new Error('Quote response was incomplete.');
      setQuote(data.quote);
      setAuthor(data.author);
      setQuotesViewed((count) => count + 1);
    } catch {
      setError('Unable to load a quote. Check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>‹  BACK</Text>
        </Pressable>

        <View style={styles.header}>
          <Text style={styles.appName}>STUDENT PORTAL · QUOTES</Text>
          <Text style={styles.title}>A little inspiration, one quote at a time.</Text>
          <Text style={styles.subtitle}>Fresh words to help you keep moving forward.</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quote of the day</Text>
          <View style={styles.badge}><View style={styles.badgeDot} /><Text style={styles.badgeText}>DAILY</Text></View>
        </View>

        <View style={styles.card}>
          <Text style={styles.quoteMark}>“</Text>
          {loading ? (
            <View style={styles.stateArea}><ActivityIndicator size="large" color="#FFFFFF" /><Text style={styles.stateText}>Loading a new quote...</Text></View>
          ) : error ? (
            <View style={styles.stateArea}><Text style={styles.errorText}>{error}</Text><Pressable onPress={fetchQuote} style={styles.retryButton}><Text style={styles.retryText}>TRY AGAIN</Text></Pressable></View>
          ) : quote ? (
            <><Text style={styles.quote}>{quote}</Text><Text style={styles.author}>{'—'} {author}</Text></>
          ) : (
            <View style={styles.stateArea}><Text style={styles.stateText}>No quote available.</Text></View>
          )}
          <View style={styles.cardAccent} />
        </View>

        <Pressable accessibilityRole="button" disabled={loading} onPress={fetchQuote} style={({ pressed }) => [styles.newButton, (pressed || loading) && styles.dimmed]}>
          {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.newButtonText}>NEW QUOTE  →</Text>}
        </Pressable>

        <View style={styles.footerRow}>
          <View style={styles.counter}><Text style={styles.counterNumber}>{quotesViewed}</Text><Text style={styles.counterLabel}>QUOTES VIEWED</Text></View>
          <Text style={styles.footerText}>Quotes provided by DummyJSON</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F7FC' },
  content: { flexGrow: 1, paddingHorizontal: 22, paddingTop: 12, paddingBottom: 30, maxWidth: 680, width: '100%', alignSelf: 'center' },
  backButton: { alignSelf: 'flex-start', paddingVertical: 8, paddingRight: 14, marginBottom: 22 }, backText: { color: '#1769E0', fontSize: 12, fontWeight: '800', letterSpacing: 0.8 },
  header: { marginBottom: 28 }, appName: { color: '#1769E0', fontSize: 10, fontWeight: '800', letterSpacing: 1.6 },
  title: { color: '#10213A', fontSize: 30, lineHeight: 37, fontWeight: '800', marginTop: 9 }, subtitle: { color: '#75849A', fontSize: 14, lineHeight: 21, marginTop: 8 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13 }, sectionTitle: { color: '#24364F', fontSize: 17, fontWeight: '800' },
  badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E6F5EE', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6 }, badgeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#20A15F', marginRight: 6 }, badgeText: { color: '#238055', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  card: { minHeight: 290, backgroundColor: '#163B70', borderRadius: 24, paddingHorizontal: 25, paddingVertical: 24, justifyContent: 'center', overflow: 'hidden', shadowColor: '#153052', shadowOpacity: 0.17, shadowRadius: 18, shadowOffset: { width: 0, height: 10 }, elevation: 5 },
  quoteMark: { position: 'absolute', top: 10, left: 22, color: '#74A9F5', fontSize: 74, lineHeight: 88, fontWeight: '800' }, quote: { color: '#FFFFFF', fontSize: 25, lineHeight: 36, fontWeight: '600', textAlign: 'center', marginTop: 28 },
  author: { color: '#C9DDF9', fontSize: 14, fontWeight: '700', textAlign: 'center', marginTop: 25 }, stateArea: { minHeight: 185, alignItems: 'center', justifyContent: 'center', paddingTop: 24 }, stateText: { color: '#E1ECFB', fontSize: 14, marginTop: 14, textAlign: 'center' },
  errorText: { color: '#FFFFFF', fontSize: 15, lineHeight: 23, textAlign: 'center', marginBottom: 18 }, retryButton: { borderColor: '#B7D1F4', borderWidth: 1, borderRadius: 11, paddingHorizontal: 18, paddingVertical: 12 }, retryText: { color: '#FFFFFF', fontSize: 12, letterSpacing: 1, fontWeight: '800' },
  cardAccent: { position: 'absolute', width: 170, height: 170, borderRadius: 85, borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1, bottom: -118, right: -75 },
  newButton: { minHeight: 56, backgroundColor: '#1769E0', borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 18, shadowColor: '#1769E0', shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 5 }, elevation: 3 }, newButtonText: { color: '#FFFFFF', fontSize: 13, letterSpacing: 1.2, fontWeight: '800' }, dimmed: { opacity: 0.68 },
  footerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 22 }, counter: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E7EDF5', borderRadius: 14, paddingVertical: 11, paddingHorizontal: 14, alignItems: 'center' }, counterNumber: { color: '#1769E0', fontSize: 20, fontWeight: '800' }, counterLabel: { color: '#8290A3', fontSize: 8, fontWeight: '800', letterSpacing: 0.7, marginTop: 3 }, footerText: { color: '#8290A3', fontSize: 11, marginLeft: 13, flex: 1, textAlign: 'right' },
});
