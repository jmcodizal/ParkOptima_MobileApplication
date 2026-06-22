import { Pressable, ScrollView, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import TopBar from '@/components/ui/top-bar';

export default function ScanOutScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  const requestPermission = async () => {
    try {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      return status === 'granted';
    } catch {
      setHasPermission(false);
      return false;
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setScannedData(data);
    setCameraActive(false);
    Alert.alert('Scanned', data);
  };

  const openCamera = async () => {
    const granted = hasPermission === null ? await requestPermission() : hasPermission;
    if (!granted) {
      Alert.alert('Camera permission', 'Camera permission is required to scan QR codes.');
      return;
    }

    setScanned(false);
    setScannedData(null);
    setCameraActive(true);
  };

  return (
    <ThemedView style={styles.container}>
      <TopBar />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerBadge}>
            <ThemedText style={styles.headerBadgeText}>Entrance</ThemedText>
          </View>
          <ThemedText type="title" style={styles.title}>
            QR Scanner
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Scan entrance passes for registered vehicles.
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
          {cameraActive ? (
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.scannerCamera}
            />
          ) : (
            <View style={styles.scanInner}>
              <ThemedText style={styles.scanIcon}>⬜</ThemedText>
            </View>
          )}
          <View style={styles.scanBorderOverlay}>
            <View style={styles.frameCornerTopLeft} />
            <View style={styles.frameCornerTopRight} />
            <View style={styles.frameCornerBottomLeft} />
            <View style={styles.frameCornerBottomRight} />
          </View>
        </View>
        {cameraActive && (
          <TouchableOpacity style={styles.scannerCloseButton} onPress={() => setCameraActive(false)} activeOpacity={0.8}>
            <ThemedText style={styles.scannerCloseText}>Stop scanning</ThemedText>
          </TouchableOpacity>
        )}
      </View>

      <Pressable
        onPress={openCamera}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <ThemedText style={styles.buttonText}>Activate camera</ThemedText>
      </Pressable>

      <View style={styles.lastScanCard}>
        <View style={styles.lastScanRow}>
          <ThemedText type="defaultSemiBold">AbC 1234</ThemedText>
          <View style={styles.exitPill}>
            <ThemedText style={styles.exitPillText}>Exit</ThemedText>
          </View>
        </View>
        <ThemedText style={styles.lastScanName}>Harry Potter · P10 assigned</ThemedText>
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
  contentContainer: {
    padding: 18,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: '#f7d7d8',
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 12,
  },
  headerBadgeText: {
    color: '#a32f33',
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
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 260,
    minWidth: '100%',
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
  scannerCamera: {
    ...StyleSheet.absoluteFillObject,
  },
  scanBorderOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  frameCornerTopLeft: {
    position: 'absolute',
    top: 14,
    left: 14,
    width: 24,
    height: 24,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderColor: '#ffffff',
  },
  frameCornerTopRight: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 24,
    height: 24,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderColor: '#ffffff',
  },
  frameCornerBottomLeft: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    width: 24,
    height: 24,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#ffffff',
  },
  frameCornerBottomRight: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    width: 24,
    height: 24,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#ffffff',
  },
  scannerCloseButton: {
    marginTop: 14,
    alignSelf: 'center',
    backgroundColor: '#1f3f90',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  scannerCloseText: {
    color: '#ffffff',
    fontWeight: '700',
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
    color: '#ffffff',
  },
  exitPill: {
    backgroundColor: '#f7d7d8',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  exitPillText: {
    color: '#a32f33',
    fontWeight: '700',
    fontSize: 12,
  },
  lastScanName: {
    color: '#c0c9f4',
    fontSize: 15,
    lineHeight: 22,
  },
  logoutBtn: {
    padding: 6,
    borderRadius: 8,
  },
  scannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 40,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerClose: {
    position: 'absolute',
    top: 48,
    right: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
});
