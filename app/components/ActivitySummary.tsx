import React from 'react';
import { View, Text } from 'react-native';
import { ActivityMetric } from './ActivityMetric';
import { Utensils, Dumbbell, Flame } from 'lucide-react-native';

interface ActivitySummaryProps {
  dailyStats: DailyStats;
}

export const ActivitySummary: React.FC<ActivitySummaryProps> = ({ dailyStats }) => (
  <View className="bg-white dark:bg-zinc-900 rounded-3xl p-6 mt-4 mb-6 shadow-sm">
    <Text className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
      Today's Activity
    </Text>
    
    <View className="space-y-4">
      <ActivityMetric
        icon={({ size, className }) => <Utensils size={size} className={className} />}
        color="emerald"
        darkColor="emerald-900/30"
        label="Meals Logged"
        sublabel={`Next meal in ${dailyStats.meals.nextIn}`}
        value={
          <View className="flex-row items-center">
            <Text className="text-lg font-semibold text-zinc-900 dark:text-white mr-1">
              {dailyStats.meals.logged}
            </Text>
            <Text className="text-sm text-zinc-600 dark:text-zinc-400">
              / {dailyStats.meals.logged + dailyStats.meals.remaining}
            </Text>
          </View>
        }
      />

      <ActivityMetric
        icon={({ size, className }) => <Dumbbell size={size} className={className} />}
        color="blue"
        darkColor="blue-900/30"
        label="Workouts Completed"
        sublabel={`${dailyStats.workouts.duration} min active today`}
        value={
          <View className="flex-row items-center">
            <Text className="text-lg font-semibold text-zinc-900 dark:text-white mr-1">
              {dailyStats.workouts.completed}
            </Text>
            <Text className="text-sm text-zinc-600 dark:text-zinc-400">
              / {dailyStats.workouts.completed + dailyStats.workouts.remaining}
            </Text>
          </View>
        }
      />

      <ActivityMetric
        icon={({ size, className }) => <Flame size={size} className={className} />}
        color="orange"
        darkColor="orange-900/30"
        label="Active Calories"
        sublabel="Daily goal achieved"
        value={
          <Text className="text-lg font-semibold text-zinc-900 dark:text-white">
            {dailyStats.summary.calories.burned}
          </Text>
        }
      />
    </View>
  </View>
);