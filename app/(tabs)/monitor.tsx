import { ScrollView, StyleSheet, TextInput, View, Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import TopBar from '@/components/ui/top-bar';

export default function MonitorScreen() {
  return (
    <ThemedView style={styles.container}>
      <TopBar />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Live Monitor
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Monitor real-time occupancy
          </ThemedText>
          <ThemedText style={styles.timestamp}>Last updated: 3/31/2026 3:00 PM</ThemedText>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <ThemedText style={styles.statSmallLabel}>Currently Parked</ThemedText>
            <ThemedText style={styles.statValue}>16</ThemedText>
            <ThemedText style={styles.statMeta}>out of 63 PM</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statSmallLabel}>Parking Occupancy</ThemedText>
            <ThemedText style={styles.statValue}>16%</ThemedText>
            <ThemedText style={styles.statMeta}>Total Capacity: 100</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statSmallLabel}>Traffic Load</ThemedText>
            <ThemedText style={[styles.statValue, styles.trafficValue]}>Low</ThemedText>
            <ThemedText style={styles.statMeta}>26% occupied</ThemedText>
          </View>
        </View>

        <View style={styles.searchBarRow}>
          <TextInput
            style={styles.searchInput}
            placeholder="Plate, owner, or ID..."
            placeholderTextColor="#9aa1c1"
          />
          <Pressable style={styles.filterButton}>
            <ThemedText style={styles.filterText}>Filter</ThemedText>
          </Pressable>
          <Pressable style={styles.csvButton}>
            <ThemedText style={styles.csvText}>CSV</ThemedText>
          </Pressable>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Currently Parked Vehicles
            </ThemedText>
          </View>

          <View style={styles.vehicleCard}>
            <View style={styles.vehicleHeader}>
              <View>
                <ThemedText style={styles.vehicleId}>003</ThemedText>
                <ThemedText style={styles.vehicleType}>Honda Civic</ThemedText>
              </View>
              <View style={styles.statusPillActive}>
                <ThemedText style={styles.statusPillText}>ACTIVE</ThemedText>
              </View>
            </View>
            <View style={styles.vehicleBody}>
              <View>
                <ThemedText style={styles.vehicleLabel}>Owner</ThemedText>
                <ThemedText style={styles.vehicleOwner}>Cedrick Diggory</ThemedText>
              </View>
              <View>
                <ThemedText style={styles.vehicleLabel}>Entry Time</ThemedText>
                <ThemedText style={styles.vehicleDetail}>08:30 AM</ThemedText>
              </View>
              <View>
                <ThemedText style={styles.vehicleLabel}>Duration</ThemedText>
                <ThemedText style={styles.vehicleDetail}>03:28:49</ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.vehicleCard}>
            <View style={styles.vehicleHeader}>
              <View>
                <ThemedText style={styles.vehicleId}>005</ThemedText>
                <ThemedText style={styles.vehicleType}>Lexus IS</ThemedText>
              </View>
              <View style={styles.statusPillActive}>
                <ThemedText style={styles.statusPillText}>ACTIVE</ThemedText>
              </View>
            </View>
            <View style={styles.vehicleBody}>
              <View>
                <ThemedText style={styles.vehicleLabel}>Owner</ThemedText>
                <ThemedText style={styles.vehicleOwner}>Luna Lovegood</ThemedText>
              </View>
              <View>
                <ThemedText style={styles.vehicleLabel}>Entry Time</ThemedText>
                <ThemedText style={styles.vehicleDetail}>09:15 AM</ThemedText>
              </View>
              <View>
                <ThemedText style={styles.vehicleLabel}>Duration</ThemedText>
                <ThemedText style={styles.vehicleDetail}>01:56:49</ThemedText>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Transactions
            </ThemedText>
          </View>

          <View style={styles.tableHeader}>
            <ThemedText style={styles.tableHeaderText}>ID</ThemedText>
            <ThemedText style={styles.tableHeaderText}>VEHICLE</ThemedText>
            <ThemedText style={styles.tableHeaderText}>OWNER</ThemedText>
            <ThemedText style={styles.tableHeaderText}>STATUS</ThemedText>
          </View>

          <View style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>TXN-001</ThemedText>
            <ThemedText style={styles.tableCell}>001 Honda</ThemedText>
            <ThemedText style={styles.tableCell}>H. Potter</ThemedText>
            <ThemedText style={[styles.tableCell, styles.paidStatus]}>Paid</ThemedText>
          </View>
          <View style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>TXN-002</ThemedText>
            <ThemedText style={styles.tableCell}>002 Toyota</ThemedText>
            <ThemedText style={styles.tableCell}>R. Weasley</ThemedText>
            <ThemedText style={[styles.tableCell, styles.paidStatus]}>Paid</ThemedText>
          </View>
          <View style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>TXN-003</ThemedText>
            <ThemedText style={styles.tableCell}>003 Honda</ThemedText>
            <ThemedText style={styles.tableCell}>C. Diggory</ThemedText>
            <ThemedText style={[styles.tableCell, styles.unpaidStatus]}>Unpaid</ThemedText>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e1b42',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  title: {
    color: '#ffffff',
    marginBottom: 6,
  },
  subtitle: {
    color: '#c8d5f7',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 4,
  },
  timestamp: {
    color: '#8fa2d7',
    fontSize: 13,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#192c66',
    padding: 18,
    borderWidth: 1,
    borderColor: '#253d88',
  },
  statSmallLabel: {
    color: '#b8c6ef',
    fontSize: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
  },
  trafficValue: {
    color: '#f5d96f',
  },
  statMeta: {
    color: '#9fb1ff',
    marginTop: 10,
    fontSize: 12,
  },
  searchBarRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
    marginBottom: 22,
  },
  searchInput: {
    flex: 1,
    minWidth: 160,
    backgroundColor: '#132351',
    borderColor: '#253d88',
    borderWidth: 1,
    borderRadius: 16,
    color: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  filterButton: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#1f3f90',
  },
  filterText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 13,
  },
  csvButton: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#2d66ee',
  },
  csvText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 13,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
  },
  vehicleCard: {
    borderRadius: 20,
    backgroundColor: '#192c66',
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#253d88',
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  vehicleId: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
  },
  vehicleType: {
    color: '#9fb1ff',
    marginTop: 4,
    fontSize: 13,
  },
  statusPillActive: {
    borderRadius: 999,
    backgroundColor: '#daf6e1',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  statusPillText: {
    color: '#1f6b25',
    fontSize: 12,
    fontWeight: '700',
  },
  vehicleBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  vehicleLabel: {
    color: '#9fb1ff',
    fontSize: 12,
    marginBottom: 6,
  },
  vehicleOwner: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  vehicleDetail: {
    color: '#c8d5f7',
    fontSize: 14,
    fontWeight: '600',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#11206c',
    marginBottom: 8,
  },
  tableHeaderText: {
    flex: 1,
    color: '#9ab2ff',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#192c66',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#253d88',
  },
  tableCell: {
    flex: 1,
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },

  logoutBtn: {
    padding: 6,
    borderRadius: 8,
  },
  paidStatus: {
    color: '#67d18f',
  },
  unpaidStatus: {
    color: '#f6b26b',
  },
});
