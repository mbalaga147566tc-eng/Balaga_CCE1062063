import React, { createContext, useState, useContext } from 'react';
import { eventsData, Event } from '../data/events';

interface UserProfile {
  name: string;
  email: string;
}

interface AppContextType {
  events: Event[];
  joinedEventIds: string[];
  toggleJoinEvent: (id: string) => void;
  userProfile: UserProfile;
  updateUserProfile: (profile: UserProfile) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [events] = useState<Event[]>(eventsData);
  const [joinedEventIds, setJoinedEventIds] = useState<string[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({ name: 'Alex Student', email: 'alex@example.edu' });

  const toggleJoinEvent = (id: string) => {
    setJoinedEventIds(prev => 
      prev.includes(id) ? prev.filter(eventId => eventId !== id) : [...prev, id]
    );
  };

  const updateUserProfile = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  return (
    <AppContext.Provider value={{ events, joinedEventIds, toggleJoinEvent, userProfile, updateUserProfile }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};