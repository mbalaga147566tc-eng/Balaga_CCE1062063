import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatCardProps {
  title: string;
  value: string | number;
  width?: number;
  icon?: string;
}

export default function StatCard({ title, value, width, icon }: StatCardProps) {
  return (
    <View style={[styles.card, width ? { width } : styles.responsiveWidth]}>
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  responsiveWidth: {
    width: '48%',
  },
  icon: {
    fontSize: 20,
    marginBottom: 6,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0056b3',
  },
  title: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
});
