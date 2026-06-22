import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';

const COLORS = {
  darkBg: '#0e1b42',
  cardBg: '#14264d',
  formBg: '#101c3f',
  teal: '#1D9E75',
  blue: '#2d66ee',
  white: '#FFFFFF',
  textLight: '#d2d9f0',
  textMuted: '#c0c7e7',
  textDim: '#9aa1c1',
  border: '#223564',
  amberLight: '#FFFBEB',
  amberBorder: '#FDE68A',
};

export default function CheckBalance({ data, onBack }: { data?: any; onBack?: () => void }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkBg} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Check Balance</Text>
        <Text style={styles.pageSubtitle}>View your parking account balance and details.</Text>

        <View style={styles.balanceCard}>
          <View style={styles.walletIconWrap}>
            <View style={styles.walletBody}>
              <View style={styles.walletFlap} />
              <View style={styles.walletCoin} />
            </View>
          </View>

          <Text style={styles.availableLabel}>AVAILABLE BALANCE</Text>
          <Text style={styles.balanceAmount}>₱50.00</Text>

          <View style={styles.prepaidBadge}>
            <View style={styles.cardIconWrap}>
              <View style={styles.cardIconBody}>
                <View style={styles.cardIconStripe} />
              </View>
            </View>
            <Text style={styles.prepaidText}>Prepaid Account</Text>
          </View>
        </View>

        <View style={styles.detailsCard}>
          {[
            { label: 'Plate Number', value: data?.plate ?? 'ABC 1234' },
            { label: 'Owner Name', value: data?.owner ?? 'Harry Potter' },
            { label: 'Vehicle Type', value: data?.type ?? 'Motor' },
            { label: 'Registered', value: data?.registered ?? '5/23/2025' },
          ].map((row, i, arr) => (
            <View key={row.label} style={[styles.detailRow, i < arr.length - 1 && styles.detailRowBorder]}>
              <Text style={styles.detailLabel}>{row.label}</Text>
              <Text style={styles.detailValue}>{row.value}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.outlineBtn} activeOpacity={0.85} onPress={() => onBack && onBack()}>
          <Text style={styles.outlineBtnText}>Check Another Account</Text>
        </TouchableOpacity>

        <View style={styles.topUpBanner}>
          <Text style={styles.topUpText}><Text style={styles.topUpBold}>Need to top up?</Text> Visit any attendant with cash to add credits to your account.</Text>
        </View>

        <TouchableOpacity style={styles.backLink} activeOpacity={0.7} onPress={() => onBack && onBack()}>
          <Text style={styles.backLinkText}>← Back to Login</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1,
    backgroundColor: 
    COLORS.darkBg 
  },
  scroll: { 
    flex: 1, 
    backgroundColor: 
      COLORS.darkBg 
  },
  scrollContent: { 
    paddingHorizontal: 20, 
    paddingTop: 24, 
    paddingBottom: 20 
  },
  pageTitle: { 
    fontSize: 22, 
    fontWeight: '800', 
    color: COLORS.textLight, 
    marginBottom: 4 
  },
  pageSubtitle: { 
    fontSize: 12, 
    color: COLORS.textMuted, 
    lineHeight: 18, 
    marginBottom: 20 
  },
  balanceCard: { 
    backgroundColor: COLORS.teal, 
    borderRadius: 16, 
    paddingVertical: 28, 
    paddingHorizontal: 20, 
    alignItems: 'center', 
    marginBottom: 18 
  },
  walletIconWrap: { 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 16 
  },
  walletBody: { 
    width: 28, 
    height: 22, 
    backgroundColor: COLORS.white, 
    borderRadius: 4, 
    justifyContent: 'center', 
    alignItems: 'flex-end', 
    paddingRight: 4, 
    position: 'relative' 
  },
  walletFlap: { 
    position: 'absolute', 
    top: -6, 
    left: 2, 
    width: 16, 
    height: 8, 
    backgroundColor: COLORS.white, 
    borderTopLeftRadius: 4, 
    borderTopRightRadius: 4 
  },
  walletCoin: { 
    width: 9, 
    height: 9, 
    borderRadius: 5, 
    backgroundColor: COLORS.teal, 
    borderWidth: 2,
    borderColor: '#0F8B72' 
  },
  availableLabel: { 
    fontSize: 11, 
    fontWeight: '700', 
    color: 'rgba(255,255,255,0.8)', 
    letterSpacing: 1.2, 
    marginBottom: 8 
  },
  balanceAmount: { 
    fontSize: 42,
    fontWeight: '800', 
    color: COLORS.white,
    marginBottom: 16 
  },
  prepaidBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    paddingHorizontal: 14, 
    paddingVertical: 8, 
    borderRadius: 24, 
    gap: 8 
  },
  cardIconWrap: {
    width: 18, 
    height: 13, 
    justifyContent: 'center' 
  },
  cardIconBody: { 
    width: 18, 
    height: 13, 
    backgroundColor: COLORS.white, 
    borderRadius: 2, 
    overflow: 'hidden', 
    justifyContent: 'flex-start' 
  },
  cardIconStripe: { 
    width: '100%', 
    height: 3, 
    backgroundColor: 'rgba(29,158,117,0.5)',
    marginTop: 3 
  },
  prepaidText: { 
    fontSize: 13, 
    fontWeight: '600', 
    color: COLORS.white 
  },
  detailsCard: { 
    backgroundColor: COLORS.cardBg, 
    borderRadius: 16, 
    paddingHorizontal: 18, 
    marginBottom: 16, 
    borderWidth: 1, 
    borderColor: COLORS.border 
  },
  detailRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 14 
  },
  detailRowBorder: { 
    borderBottomWidth: 1, 
    borderBottomColor: COLORS.border 
  },
  detailLabel: { 
    fontSize: 13, 
    color: COLORS.textMuted, 
    fontWeight: '600' 
  },
  detailValue: { 
    fontSize: 14, 
    color: COLORS.textLight, 
    fontWeight: '700' 
  },
  outlineBtn: { 
    borderWidth: 1.5, 
    borderColor: COLORS.blue, 
    borderRadius: 12, 
    paddingVertical: 14, 
    alignItems: 'center', 
    marginBottom: 16, 
    backgroundColor: 'transparent' 
  },
  outlineBtnText: { 
    color: COLORS.blue, 
    fontWeight: '700', 
    fontSize: 15 
  },
  topUpBanner: { 
    backgroundColor: COLORS.amberLight, 
    borderWidth: 1, 
    borderColor: COLORS.amberBorder, 
    borderRadius: 12, 
    padding: 14, 
    marginBottom: 18 
  },
  topUpText: { 
    fontSize: 13,
    color: '#6B7A8D', 
    lineHeight: 20 
  },
  topUpBold: { 
    fontWeight: '700', 
    color: '#1A2E4A' 
  },
  backLink: { 
    alignItems: 'center', 
    paddingVertical: 8 
  },
  backLinkText: { 
    fontSize: 14, 
    color: COLORS.teal, 
    fontWeight: '600' },
});
