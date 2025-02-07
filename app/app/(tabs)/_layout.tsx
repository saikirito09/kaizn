import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { LayoutDashboard, LineChart } from 'lucide-react-native';

import { HapticTab } from '@/components/HapticTab';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#7c3aed',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <LayoutDashboard size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          title: 'Analysis',
          tabBarIcon: ({ color }) => <LineChart size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}