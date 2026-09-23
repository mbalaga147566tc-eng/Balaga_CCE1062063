import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const QUOTE_URL = 'https://dummyjson.com/quotes/random';

export default function App() {
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
      if (!response.ok) {
        throw new Error('The quote service returned an error.');
      }

      const data = await response.json();
      if (!data.quote || !data.author) {
        throw new Error('The quote response was incomplete.');
      }

      setQuote(data.quote);
      setAuthor(data.author);
      setQuotesViewed((count) => count + 1);
    } catch {
      setError('Unable to load a quote. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.topRow}>
            <View style={styles.logo}><Text style={styles.logoMark}>Q</Text></View>
            <Text style={styles.appName}>QUOTES APP</Text>
            <View style={styles.topSpacer} />
          </View>

          <View style={styles.intro}>
            <Text style={styles.eyebrow}>A MOMENT OF INSPIRATION</Text>
            <Text style={styles.title}>Words to move you forward.</Text>
            <Text style={styles.subtitle}>A fresh thought, whenever you need one.</Text>
          </View>

          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>Quote of the day</Text>
            <View style={styles.liveBadge}><View style={styles.liveDot} /><Text style={styles.liveText}>DAILY</Text></View>
          </View>

          <View style={styles.quoteCard}>
            <View style={styles.quoteMark}><Text style={styles.quoteMarkText}>“</Text></View>
            {loading ? (
              <View style={styles.loadingArea}>
                <ActivityIndicator size="large" color="#FFFFFF" />
                <Text style={styles.loadingText}>Loading a new quote...</Text>
              </View>
            ) : error ? (
              <View style={styles.loadingArea}>
                <Text style={styles.cardError}>{error}</Text>
                <Pressable accessibilityRole="button" onPress={fetchQuote} style={({ pressed }) => [styles.retryButton, pressed && styles.pressed]}>
                  <Text style={styles.retryText}>TRY AGAIN</Text>
                </Pressable>
              </View>
            ) : quote ? (
              <>
                <Text style={styles.quoteText}>{quote}</Text>
                <View style={styles.authorRow}><View style={styles.authorLine} /><Text style={styles.authorText}>{author}</Text></View>
              </>
            ) : (
              <View style={styles.loadingArea}><Text style={styles.emptyText}>No quote available.</Text></View>
            )}
            <View style={styles.cardAccent} />
          </View>

          <Pressable accessibilityRole="button" disabled={loading} onPress={fetchQuote} style={({ pressed }) => [styles.newQuoteButton, (pressed || loading) && styles.buttonDim]}>
            {loading ? <ActivityIndicator color="#FFFFFF" /> : <><Text style={styles.newQuoteText}>NEW QUOTE</Text><Text style={styles.buttonArrow}>→</Text></>}
          </Pressable>

          <View style={styles.footerRow}>
            <View style={styles.counterCard}>
              <Text style={styles.counterNumber}>{quotesViewed}</Text>
              <Text style={styles.counterLabel}>QUOTES VIEWED</Text>
            </View>
            <View style={styles.footerCopy}>
              <Text style={styles.footerTitle}>Keep going.</Text>
              <Text style={styles.footerSubtitle}>Discover something inspiring every time.</Text>
            </View>
          </View>
          <Text style={styles.source}>Quotes provided by DummyJSON</Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F7FC' },
  content: { flexGrow: 1, paddingHorizontal: 22, paddingTop: 12, paddingBottom: 26, maxWidth: 680, width: '100%', alignSelf: 'center' },
  topRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 38 },
  logo: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#1769E0', alignItems: 'center', justifyContent: 'center', marginRight: 11 },
  logoMark: { color: '#FFFFFF', fontSize: 21, fontWeight: '900' }, appName: { color: '#153052', fontWeight: '800', letterSpacing: 1.5, fontSize: 12 }, topSpacer: { flex: 1 },
  intro: { marginBottom: 30 }, eyebrow: { color: '#1769E0', fontSize: 10, fontWeight: '800', letterSpacing: 1.8 },
  title: { color: '#10213A', fontSize: 32, lineHeight: 39, fontWeight: '800', marginTop: 9, maxWidth: 400 },
  subtitle: { color: '#75849A', fontSize: 14, lineHeight: 21, marginTop: 8 },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13 },
  sectionTitle: { color: '#24364F', fontSize: 17, fontWeight: '800' },
  liveBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E6F5EE', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#20A15F', marginRight: 6 }, liveText: { color: '#238055', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  quoteCard: { minHeight: 300, backgroundColor: '#163B70', borderRadius: 24, paddingHorizontal: 25, paddingVertical: 24, justifyContent: 'center', overflow: 'hidden', shadowColor: '#153052', shadowOpacity: 0.17, shadowRadius: 18, shadowOffset: { width: 0, height: 10 }, elevation: 5 },
  quoteMark: { position: 'absolute', top: 10, left: 22 }, quoteMarkText: { color: '#74A9F5', fontSize: 74, lineHeight: 88, fontWeight: '800' },
  quoteText: { color: '#FFFFFF', fontSize: 25, lineHeight: 36, fontWeight: '600', textAlign: 'center', marginTop: 28 },
  authorRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 25 }, authorLine: { width: 22, height: 1, backgroundColor: '#83B3F5', marginRight: 10 }, authorText: { color: '#C9DDF9', fontSize: 14, fontWeight: '700' },
  loadingArea: { minHeight: 185, alignItems: 'center', justifyContent: 'center', paddingTop: 24 }, loadingText: { color: '#E1ECFB', fontSize: 14, marginTop: 14 },
  cardError: { color: '#FFFFFF', fontSize: 15, lineHeight: 23, textAlign: 'center', marginBottom: 18 },
  retryButton: { borderColor: '#B7D1F4', borderWidth: 1, borderRadius: 11, paddingHorizontal: 18, paddingVertical: 12 }, retryText: { color: '#FFFFFF', fontSize: 12, letterSpacing: 1, fontWeight: '800' },
  emptyText: { color: '#FFFFFF', fontSize: 16 }, cardAccent: { position: 'absolute', width: 170, height: 170, borderRadius: 85, borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1, bottom: -118, right: -75 },
  newQuoteButton: { minHeight: 56, backgroundColor: '#1769E0', borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 18, shadowColor: '#1769E0', shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 5 }, elevation: 3 },
  newQuoteText: { color: '#FFFFFF', fontSize: 13, letterSpacing: 1.2, fontWeight: '800' }, buttonArrow: { color: '#FFFFFF', fontSize: 20, fontWeight: '700', marginLeft: 10, marginTop: -2 }, buttonDim: { opacity: 0.68 }, pressed: { opacity: 0.78 },
  footerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 24, paddingHorizontal: 2 },
  counterCard: { minWidth: 100, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E7EDF5', borderRadius: 14, paddingVertical: 12, paddingHorizontal: 15, alignItems: 'center' }, counterNumber: { color: '#1769E0', fontSize: 21, fontWeight: '800' }, counterLabel: { color: '#8290A3', fontSize: 8, fontWeight: '800', letterSpacing: 0.7, marginTop: 3 },
  footerCopy: { flex: 1, marginLeft: 14 }, footerTitle: { color: '#263A55', fontSize: 14, fontWeight: '800' }, footerSubtitle: { color: '#8290A3', fontSize: 11, lineHeight: 16, marginTop: 3 }, source: { color: '#9AA6B5', fontSize: 10, textAlign: 'center', marginTop: 21 },
});
