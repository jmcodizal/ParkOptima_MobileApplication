import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import TopBar from '@/components/ui/top-bar';

const COLORS = {
  navy: '#1A2E4A',
  navyDark: '#0F1E30',
  teal: '#0F8B72',
  tealLight: '#E1F5EE',
  tealMid: '#1D9E75',
  white: '#FFFFFF',
  surface: '#F4F7FA',
  cardBg: '#FFFFFF',
  textPrimary: '#1A2E4A',
  textSecondary: '#6B7A8D',
  textMuted: '#9AA5B4',
  border: '#E2E8F0',
  unpaidBg: '#FFF3CD',
  unpaidText: '#B45309',
  paidBg: '#D1FAE5',
  paidText: '#065F46',
  green: '#10B981',
  amber: '#F59E0B',
  red: '#EF4444',
};

type Payment = {
  id: string;
  name: string;
  brand: string;
  model: string;
  color: string;
  entry: string;
  exit: string;
  fee: string;
  status: 'Unpaid' | 'Paid';
};

const initialPayments: Payment[] = [
  {
    id: '001',
    name: 'Harry Potter',
    brand: 'Toyota',
    model: 'Rebel 300',
    color: 'Black',
    entry: '08:02 AM',
    exit: '--',
    fee: 'P10',
    status: 'Unpaid',
  },
  {
    id: '002',
    name: 'Caddrick Diggory',
    brand: 'Honda',
    model: 'Beat',
    color: 'White',
    entry: '10:33 AM',
    exit: '--',
    fee: 'P10',
    status: 'Unpaid',
  },
  {
    id: '003',
    name: 'Hermione Grainger',
    brand: 'Honda',
    model: 'Click',
    color: 'Red',
    entry: '10:55 AM',
    exit: 'DHS PM',
    fee: 'P10',
    status: 'Paid',
  },
  {
    id: '004',
    name: 'Ginny Weasley',
    brand: 'Honda',
    model: 'Brio',
    color: 'Green',
    entry: '10:55 AM',
    exit: 'DHS PM',
    fee: 'P10',
    status: 'Paid',
  },
];

const StatCard = ({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) => (
  <View style={[styles.statCard, accent && styles.statCardAccent]}>
    <Text style={[styles.statValue, accent && styles.statValueAccent]}>
      {value}
    </Text>
    <Text style={[styles.statLabel, accent && styles.statLabelAccent]}>
      {label}
    </Text>
  </View>
);

const PaymentCard = ({
  payment,
  onMarkPaid,
  onSkip,
}: {
  payment: Payment;
  onMarkPaid: (id: string) => void;
  onSkip: (id: string) => void;
}) => {
  const isPaid = payment.status === 'Paid';

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardId}>ID: {payment.id}</Text>
        <View
          style={[
            styles.statusBadge,
            isPaid ? styles.statusPaid : styles.statusUnpaid,
          ]}>
          <Text
            style={[
              styles.statusText,
              isPaid ? styles.statusTextPaid : styles.statusTextUnpaid,
            ]}>
            {payment.status}
          </Text>
        </View>
      </View>

      <Text style={styles.cardName}>{payment.name}</Text>

      <View style={styles.detailsGrid}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Brand</Text>
          <Text style={styles.detailValue}>{payment.brand}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Model</Text>
          <Text style={styles.detailValue}>{payment.model}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Color</Text>
          <Text style={styles.detailValue}>{payment.color}</Text>
        </View>
      </View>

      <View style={styles.timeRow}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Entry</Text>
          <Text style={styles.detailValue}>{payment.entry}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Exit</Text>
          <Text style={styles.detailValue}>{payment.exit}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Fee</Text>
          <Text style={styles.feeValue}>{payment.fee}</Text>
        </View>
      </View>

      {!isPaid ? (
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.markPaidBtn}
            onPress={() => onMarkPaid(payment.id)}
            activeOpacity={0.8}>
            <Text style={styles.markPaidText}>Mark Paid</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.skipBtn}
            onPress={() => onSkip(payment.id)}
            activeOpacity={0.8}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.confirmedRow}>
          <Text style={styles.confirmedText}>Confirmed ✓</Text>
        </View>
      )}
    </View>
  );
};

export default function PaymentManagement() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);

  const paidCount = payments.filter(p => p.status === 'Paid').length;
  const unpaidCount = payments.filter(p => p.status === 'Unpaid').length;

  const handleMarkPaid = (id: string) => {
    setPayments(prev =>
      prev.map(p => (p.id === id ? { ...p, status: 'Paid' } : p)),
    );
  };

  const handleSkip = (id: string) => {
    setPayments(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />
      <TopBar />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ThemedText type="title" style={styles.pageTitle}>
            Payment Management
          </ThemedText>
          <ThemedText style={styles.pageSubtitle}>
            Confirm and track parking fee payments
          </ThemedText>
          <ThemedText style={styles.lastUpdated}>
            Last updated: {new Date().toLocaleTimeString()}
          </ThemedText>
        </View>

        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.exportBtn} activeOpacity={0.8}>
            <ThemedText style={styles.exportText}>⬇ Export CSV</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <StatCard label="Paid today" value={paidCount} />
          <StatCard label="Unpaid" value={unpaidCount} accent />
          <StatCard label="Fixed fee / session" value="₱10" />
        </View>

        <View style={styles.sectionRow}>
          <ThemedText style={styles.sectionLabel}>Payment Confirmation</ThemedText>
          <ThemedText style={styles.sectionLabelRight}>Pending Payments</ThemedText>
        </View>

        {payments.map(payment => (
          <PaymentCard
            key={payment.id}
            payment={payment}
            onMarkPaid={handleMarkPaid}
            onSkip={handleSkip}
          />
        ))}

        <View style={{ height: 32 }} />
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
    marginBottom: 18,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  pageTitle: {
    marginBottom: 6,
    color: '#ffffff',
  },
  pageSubtitle: {
    color: '#c8d5f7',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 4,
  },
  lastUpdated: {
    fontSize: 13,
    color: '#8fa2d7',
  },

  logoutBtn: {
    padding: 6,
    borderRadius: 8,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  exportBtn: {
    backgroundColor: '#1f3f90',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  exportText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#192c66',
    padding: 16,
    borderWidth: 1,
    borderColor: '#253d88',
    alignItems: 'center',
  },
  statCardAccent: {
    backgroundColor: '#0e1b42',
    borderColor: '#0e1b42',
  },
  statValue: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },
  statValueAccent: {
    color: '#ffffff',
  },
  statLabel: {
    color: '#b8c6ef',
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
  statLabelAccent: {
    color: '#9fb1ff',
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },
  sectionLabelRight: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9fb1ff',
  },
  card: {
    borderRadius: 16,
    backgroundColor: '#192c66',
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#253d88',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardId: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9fb1ff',
    letterSpacing: 0.3,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  statusPaid: {
    backgroundColor: '#daf6e1',
  },
  statusUnpaid: {
    backgroundColor: '#fff3cd',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusTextPaid: {
    color: '#1f6b25',
  },
  statusTextUnpaid: {
    color: '#b45309',
  },
  cardName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 10,
  },
  detailsGrid: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  timeRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: '#9fb1ff',
    marginBottom: 4,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 13,
    color: '#ffffff',
    fontWeight: '600',
  },
  feeValue: {
    fontSize: 13,
    color: '#67d18f',
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  markPaidBtn: {
    flex: 2,
    backgroundColor: '#1f3f90',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  markPaidText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  skipBtn: {
    flex: 1,
    backgroundColor: '#132351',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#253d88',
  },
  skipText: {
    color: '#9fb1ff',
    fontWeight: '600',
    fontSize: 14,
  },
  confirmedRow: {
    backgroundColor: '#daf6e1',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmedText: {
    color: '#1f6b25',
    fontWeight: '700',
    fontSize: 13,
  },
});
