import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Sparkles } from 'lucide-react-native';

interface HeaderProps {
  isDark: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isDark }) => (
  <View className="px-4 pt-2 pb-4">
    <View className="flex-row items-center justify-between">
      <View>
        <Text className="text-2xl font-semibold text-zinc-900 dark:text-white">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
        </Text>
        <Text className="text-sm text-zinc-600 dark:text-zinc-400">
          {new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })}
        </Text>
      </View>
      <Pressable 
        className="flex-row items-center bg-violet-100 dark:bg-violet-900/30 px-3 py-1.5 rounded-full active:opacity-80"
        android_ripple={{ color: isDark ? '#ffffff20' : '#00000010' }}
      >
        <Sparkles size={16} className="text-violet-600 dark:text-violet-400" />
        <Text className="ml-1.5 font-medium text-violet-600 dark:text-violet-400">
          8 Day Streak
        </Text>
      </Pressable>
    </View>
  </View>
);