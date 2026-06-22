import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Profile
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Manage your attendant profile
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e1b42',
    padding: 24,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    color: '#c8d5f7',
    fontSize: 15,
    lineHeight: 22,
  },
});
