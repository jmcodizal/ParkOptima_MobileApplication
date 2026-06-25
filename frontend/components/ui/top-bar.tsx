import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { useAuth } from '@/app/auth';

export default function TopBar({ role = 'Attendant' }: { role?: string }) {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Ionicons name="car" size={16} color="#ffffff" />
        <ThemedText style={styles.title}>ParkOptima</ThemedText>
      </View>

      <View style={styles.right}>
        <View style={styles.badge}>
          <ThemedText style={styles.badgeText}>{role}</ThemedText>
        </View>

        <TouchableOpacity onPress={() => signOut()} style={styles.logout} activeOpacity={0.75}>
          <Ionicons name="log-out-outline" size={18} color="#c8d5f7" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0e1b42',
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { color: '#ffffff', fontWeight: '700', fontSize: 16, marginLeft: 6 },
  right: { flexDirection: 'row', alignItems: 'center' },
  badge: { backgroundColor: '#1f3f90', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, marginRight: 10 },
  badgeText: { color: '#ffffff', fontSize: 12, fontWeight: '700' },
  logout: { padding: 6, borderRadius: 8 },
});
