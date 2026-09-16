import { Stack } from 'expo-router';
import { AppProvider } from '../context/AppContext';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShadowVisible: false, headerTintColor: '#1d4ed8' }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="event/[id]" options={{ title: 'Event details' }} />
      </Stack>
    </AppProvider>
  );
}
