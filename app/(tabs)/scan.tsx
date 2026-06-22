import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ScanScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBadge}>
          <ThemedText style={styles.headerBadgeText}>Entry</ThemedText>
        </View>
        <ThemedText type="title" style={styles.title}>
          QR Scanner
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Scan entry or exit passes for registered vehicles.
        </ThemedText>
      </View>

      <View style={styles.statusCard}>
        <View style={styles.statusRow}>
          <View style={styles.activeBadge}>
            <ThemedText style={styles.activeBadgeText}>Active</ThemedText>
          </View>
        </View>
        <ThemedText type="subtitle" style={styles.statusTitle}>
          ABC 1234 (Sedan)
        </ThemedText>
        <ThemedText style={styles.statusText}>checked in 10:45 AM · Fee: ₱10</ThemedText>
      </View>

      <View style={styles.scanWrapper}>
        <ThemedText style={styles.scanLabel}>Align plate/QR within the frame</ThemedText>
        <View style={styles.scanFrame}>
          <View style={styles.scanInner}>
            <ThemedText style={styles.scanIcon}>⬜</ThemedText>
          </View>
        </View>
      </View>

      <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}> 
        <ThemedText style={styles.buttonText}>Activate camera</ThemedText>
      </Pressable>

      <View style={styles.lastScanCard}>
        <View style={styles.lastScanRow}>
          <ThemedText type="defaultSemiBold">AbC 1234</ThemedText>
          <View style={styles.entryPill}>
            <ThemedText style={styles.entryPillText}>Entry</ThemedText>
          </View>
        </View>
        <ThemedText style={styles.lastScanName}>Harry Potter · P10 assigned</ThemedText>
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
  headerBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: '#d7f6d8',
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 12,
  },
  headerBadgeText: {
    color: '#166a2f',
    fontWeight: '700',
    fontSize: 12,
  },
  title: {
    color: '#ffffff',
    marginBottom: 6,
  },
  subtitle: {
    color: '#c8d5f7',
    fontSize: 15,
    lineHeight: 22,
  },
  statusCard: {
    borderRadius: 24,
    backgroundColor: '#192c66',
    padding: 22,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#253d88',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  activeBadge: {
    borderRadius: 14,
    backgroundColor: '#daf6e1',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  activeBadgeText: {
    color: '#1f6b25',
    fontWeight: '700',
    fontSize: 12,
  },
  statusTitle: {
    color: '#ffffff',
    marginBottom: 8,
  },
  statusText: {
    color: '#b8c6ef',
    fontSize: 15,
  },
  scanWrapper: {
    marginBottom: 24,
  },
  scanLabel: {
    color: '#b0bdf4',
    marginBottom: 14,
    fontSize: 14,
  },
  scanFrame: {
    borderWidth: 2,
    borderColor: '#3f6ee8',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 260,
  },
  scanInner: {
    width: 180,
    height: 180,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#5b82f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanIcon: {
    color: '#6a8bef',
    fontSize: 48,
  },
  button: {
    borderRadius: 18,
    backgroundColor: '#3d72ff',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  buttonPressed: {
    backgroundColor: '#355fdb',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  lastScanCard: {
    borderRadius: 24,
    backgroundColor: '#14264d',
    borderWidth: 1,
    borderColor: '#223564',
    padding: 20,
  },
  lastScanRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  entryPill: {
    backgroundColor: '#daf6e1',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  entryPillText: {
    color: '#1f6b25',
    fontWeight: '700',
    fontSize: 12,
  },
  lastScanName: {
    color: '#c0c9f4',
    fontSize: 15,
    lineHeight: 22,
  },
});
