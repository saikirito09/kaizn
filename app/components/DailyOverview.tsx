import React from 'react';
import { View, Text } from 'react-native';
import { MacroProgressRing } from './MacroProgressRing';
import { CalorieBar } from './CalorieBar';
import { MacronutrientDisplay } from './MacronutrientDisplay';

interface DailyOverviewProps {
  dailyStats: DailyStats;
  isDark: boolean;
}

export const DailyOverview: React.FC<DailyOverviewProps> = ({ dailyStats, isDark }) => (
  <View className="bg-white dark:bg-zinc-900 rounded-3xl p-6 mb-4 shadow-sm">
    <Text className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
      Daily Overview
    </Text>
    
    <View className="mb-6">
      <View className="flex-row justify-between mb-2">
        <Text className="text-sm text-zinc-600 dark:text-zinc-400">
          {dailyStats.summary.calories.consumed} cal in • {dailyStats.summary.calories.burned} cal out
        </Text>
        <Text className="text-sm font-medium text-zinc-900 dark:text-white">
          Goal: {dailyStats.summary.calories.goal} cal
        </Text>
      </View>
      <CalorieBar 
        consumed={dailyStats.summary.calories.consumed}
        burned={dailyStats.summary.calories.burned}
        goal={dailyStats.summary.calories.goal}
        isDark={isDark}
      />
    </View>

    <Text className="text-base font-medium text-zinc-900 dark:text-white mb-4">
      Macronutrients
    </Text>
    
    <View className="flex-row justify-between">
      <MacronutrientDisplay
        value={dailyStats.summary.protein.current}
        goal={dailyStats.summary.protein.goal}
        progress={dailyStats.summary.protein.percentage}
        label="Protein"
        color="#3b82f6"
        isDark={isDark}
      />
      <MacronutrientDisplay
        value={dailyStats.summary.carbs.current}
        goal={dailyStats.summary.carbs.goal}
        progress={dailyStats.summary.carbs.percentage}
        label="Carbs"
        color="#10b981"
        isDark={isDark}
      />
      <MacronutrientDisplay
        value={dailyStats.summary.fat.current}
        goal={dailyStats.summary.fat.goal}
        progress={dailyStats.summary.fat.percentage}
        label="Fat"
        color="#f59e0b"
        isDark={isDark}
      />
    </View>
  </View>
);
