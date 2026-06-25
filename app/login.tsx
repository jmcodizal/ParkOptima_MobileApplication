import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import CheckBalance from './CheckBalance';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/app/auth';

const roles = ['Owner', 'Attendant', 'Vehicle'] as const;

type Role = (typeof roles)[number];

export default function LoginScreen() {
  const router = useRouter();
  const { isAuthenticated, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('Attendant');
  // Vehicle / Vehicle Owner form state
  const [licensePlate, setLicensePlate] = useState('');
  const [pin, setPin] = useState('');
  const [pinVisible, setPinVisible] = useState(false);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/monitor' as any);
    }
  }, [isAuthenticated, router]);

  const handleLogin = () => {
    signIn();
    router.replace('/monitor' as any);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.card}>
            <View style={styles.header}>
              <View style={styles.logoRing}>
                <ThemedText style={styles.logoText}>P</ThemedText>
              </View>
              <ThemedText type="title" style={styles.title}>
                ParkOptima
              </ThemedText>
              <ThemedText style={styles.subtitle}>
                Smart Parking Management
              </ThemedText>
            </View>
            <View style={styles.role}>
            <View style={styles.roleInner}>
              {roles.map((role) => {
                const isActive = role === selectedRole;
                return (
                  <Pressable
                    key={role}
                    onPress={() => setSelectedRole(role)}
                    style={[styles.roleBadge, isActive && styles.roleBadgeActive]}
                  >
                    <ThemedText style={isActive ? styles.roleBadgeTextActive : styles.roleBadgeText}>
                      {role}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.form}>
            {selectedRole === 'Vehicle' ? (
              showVehicleForm ? (showBalance ? (
                <CheckBalance data={{ plate: licensePlate, owner: 'Owner Name', type: 'Motor', registered: '5/23/2025' }} onBack={() => setShowBalance(false)} />
              ) : (
                <>
                  <View style={styles.inputGroup}>
                    <ThemedText style={styles.inputLabel}>LICENSE PLATE NUMBER</ThemedText>
                    <TextInput
                      value={licensePlate}
                      onChangeText={setLicensePlate}
                      placeholder="e.g. ABC 1234"
                      placeholderTextColor="#9aa1c1"
                      style={styles.input}
                      autoCapitalize="characters"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <ThemedText style={styles.inputLabel}>4-DIGIT PIN</ThemedText>
                    <View style={styles.pinRow}>
                      <TextInput
                        value={pin}
                        onChangeText={(t) => setPin(t.slice(0, 4))}
                        placeholder="● ● ● ●"
                        placeholderTextColor="#9aa1c1"
                        secureTextEntry={!pinVisible}
                        keyboardType="number-pad"
                        maxLength={4}
                        style={[styles.input, styles.pinInput]}
                      />
                      <Pressable onPress={() => setPinVisible((v) => !v)} style={styles.eyeBtn}>
                        <ThemedText style={styles.eyeIcon}>{pinVisible ? '🙈' : '👁'}</ThemedText>
                      </Pressable>
                    </View>
                  </View>

                  <Pressable style={styles.button} onPress={() => setShowBalance(true)}>
                    <ThemedText style={styles.buttonText}>Check Balance</ThemedText>
                  </Pressable>

                  <Pressable onPress={() => {}} style={styles.resetWrapper}>
                    <ThemedText style={styles.resetText}>No PIN yet? Sign up / Register Vehicle</ThemedText>
                  </Pressable>

                  <Pressable onPress={() => {}} style={styles.signupWrapper}>
                    <ThemedText style={styles.signupText}>Forgot PIN? Contact Attendant</ThemedText>
                  </Pressable>
                </>
              )) : (
                <>
                  <View style={styles.vehicleBanner}>
                    <ThemedText style={styles.bannerTitle}>Welcome, Vehicle Owner!</ThemedText>
                    <ThemedText style={styles.bannerSub}>Access your parking account or{"\n"}create a new one.</ThemedText>
                  </View>

                  <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.85} onPress={() => setShowVehicleForm(true)}>
                    <ThemedText style={styles.primaryBtnText}>Check Balance</ThemedText>
                  </TouchableOpacity>
                </>
              )
            ) : (
              <>
                <View style={styles.inputGroup}>
                  <ThemedText style={styles.inputLabel}>Email address</ThemedText>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email address"
                    placeholderTextColor="#9aa1c1"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <ThemedText style={styles.inputLabel}>Password</ThemedText>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    placeholderTextColor="#9aa1c1"
                    secureTextEntry
                    style={styles.input}
                  />
                </View>

                <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={handleLogin}>
                  <ThemedText style={styles.buttonText}>Sign in</ThemedText>
                </Pressable>

                <Pressable onPress={() => {}} style={styles.resetWrapper}>
                  <ThemedText style={styles.resetText}>Forgot password? Reset here</ThemedText>
                </Pressable>
                <Pressable onPress={() => {}} style={styles.signupWrapper}>
                  <ThemedText style={styles.signupText}>Don't have an account? Signup here</ThemedText>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e1b42',
  },
  safeArea: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#0e1b42',
  },
  contentContainer: {
    minHeight: '100%',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#14264d',
    borderWidth: 1,
    borderColor: '#223564',
  },
  header: {
    paddingVertical: 32,
    paddingHorizontal: 28,
    backgroundColor: '#172f72',
    alignItems: 'center',
  },
  logoRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1f3f90',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
  },
  title: {
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    color: '#d2d9f0',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  role: {
    width: '100%',
    maxWidth: 420,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#14264d',
    borderWidth: 1,
    borderColor: '#223564',
  },
  roleInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 12,
  },
  roleBadge: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: '#1f285b',
    marginHorizontal: 4,
  },
  roleBadgeActive: {
    backgroundColor: '#2d66ee',
  },
  roleBadgeText: {
    color: '#9aa1c1',
    fontWeight: '600',
    fontSize: 14,
  },
  roleBadgeTextActive: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  form: {
    padding: 24,
    backgroundColor: '#101c3f',
  },
  inputGroup: {
    marginBottom: 18,
  },
  inputLabel: {
    color: '#c0c7e7',
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#131f3e',
    borderColor: '#26376f',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    color: '#eef0ff',
    fontSize: 16,
  },
  pinRow: {
    position: 'relative',
  },
  pinInput: {
    paddingRight: 48,
    letterSpacing: 6,
  },
  eyeBtn: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  eyeIcon: {
    fontSize: 18,
    color: '#eef0ff',
  },
  vehicleBanner: {
    backgroundColor: '#e8f7f2',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#1D9E75',
  },
  bannerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1D9E75',
    marginBottom: 3,
  },
  bannerSub: {
    fontSize: 12,
    color: '#6B7A8D',
    lineHeight: 17,
  },
  primaryBtn: {
    backgroundColor: '#1A2E4A',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#2d66ee',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    backgroundColor: '#254ecc',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  resetWrapper: {
    marginTop: 16,
    alignItems: 'center',
  },
  resetText: {
    color: '#9fa7d5',
    fontSize: 14,
  },
  signupWrapper: {
    marginTop: 16,
    alignItems: 'center',
  },
  signupText: {
    color: '#9fa7d5',
    fontSize: 14,
  },
});
