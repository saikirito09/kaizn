import React from 'react';
import { View, Text } from 'react-native';

interface CalorieBarProps {
  consumed: number;
  burned: number;
  goal: number;
  isDark: boolean;
}

export const CalorieBar: React.FC<CalorieBarProps> = ({ consumed, burned, goal, isDark }) => {
  const consumedWidth = Math.min((consumed / goal) * 100, 100);
  const burnedWidth = Math.min((burned / goal) * 100, 100);
  
  return (
    <View className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
      <View 
        className="absolute h-full bg-emerald-500/20"
        style={{ width: `${consumedWidth}%` }}
      />
      <View 
        className="absolute h-full bg-blue-500/20"
        style={{ width: `${burnedWidth}%`, right: 0 }}
      />
      <View className="absolute inset-0 flex-row justify-between items-center px-2">
        <Text className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
          {consumed}
        </Text>
        <Text className="text-xs font-medium text-blue-700 dark:text-blue-300">
          {burned}
        </Text>
      </View>
    </View>
  );
};
