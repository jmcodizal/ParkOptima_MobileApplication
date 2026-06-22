import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/app/auth';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.light.tint,
        tabBarStyle: {
          backgroundColor: '#0f1e4a',
          borderTopColor: '#223361',
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="monitor"
        options={{
          title: 'Monitor',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={24} name="chart.bar" color={focused ? '#ffffff' : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan In',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={24} name="qrcode" color={focused ? '#ffffff' : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan-out"
        options={{
          title: 'Scan Out',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={24} name="qrcode" color={focused ? '#ffffff' : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: 'Payments',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={24} name="creditcard" color={focused ? '#ffffff' : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={24} name="person" color={focused ? '#ffffff' : color} />
          ),
        }}
      />
    </Tabs>
  );
}
