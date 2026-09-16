import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { Event, events as eventData } from '../data/events';
type Profile = { name: string; email: string };
type AppContextValue = { events: Event[]; joinedEventIds: string[]; toggleJoinEvent: (id: string) => void; userProfile: Profile; updateUserProfile: (profile: Profile) => void };
const AppContext = createContext<AppContextValue | undefined>(undefined);
export function AppProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState(eventData);
  const [userProfile, setUserProfile] = useState<Profile>({ name: 'Mavy Santos', email: 'mavy.santos@campus.edu' });
  const joinedEventIds = events.filter(event => event.joined).map(event => event.id);
  const value = useMemo(() => ({ events, joinedEventIds, userProfile, toggleJoinEvent: (id: string) => setEvents(current => current.map(event => event.id === id ? { ...event, joined: !event.joined } : event)), updateUserProfile: setUserProfile }), [events, joinedEventIds, userProfile]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useAppContext() { const context = useContext(AppContext); if (!context) throw new Error('useAppContext must be used inside AppProvider'); return context; }
