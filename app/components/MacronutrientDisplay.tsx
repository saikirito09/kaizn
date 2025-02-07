import React from 'react';
import { View, Text } from 'react-native';
import { MacroProgressRing } from './MacroProgressRing';

interface MacronutrientDisplayProps {
  value: number;
  goal: number;
  progress: number;
  label: string;
  color: string;
  isDark: boolean;
}

export const MacronutrientDisplay: React.FC<MacronutrientDisplayProps> = ({ 
  value, 
  goal, 
  progress, 
  label, 
  color, 
  isDark 
}) => (
  <View className="items-center">
    <MacroProgressRing 
      progress={progress} 
      color={color}
      isDark={isDark}
    >
      <Text className="text-lg font-semibold text-zinc-900 dark:text-white">
        {value}g
      </Text>
    </MacroProgressRing>
    <Text className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
      {label}
    </Text>
    <Text className="text-xs text-zinc-500 dark:text-zinc-500">
      Goal: {goal}g
    </Text>
  </View>
);