import React, { useCallback, useMemo, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  RefreshControl,
  Pressable,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  Camera, 
  Plus, 
  ChevronRight, 
  Flame,
  Dumbbell,
  Timer,
  ArrowDown,
  ArrowUp,
  Utensils,
  Sparkles,
  Scale,
  // Remove Water import
} from 'lucide-react-native';

const DateStrip = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const dateInfo = useMemo(() => {
    const dates = [];
    const today = new Date();
    
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        date: date.getDate(),
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        isToday: i === 0,
        activities: i < 0 ? {
          workout: Math.random() > 0.5,
          nutrition: Math.random() > 0.3,
        } : { workout: false, nutrition: false }
      });
    }
    return dates;
  }, []);

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      className="px-4 py-2"
    >
      {dateInfo.map((date, index) => (
        <Pressable
          key={index}
          className="mr-3 items-center active:opacity-80"
          android_ripple={{ color: isDark ? '#ffffff20' : '#00000010' }}
        >
          <Text className="text-xs text-zinc-600 dark:text-zinc-400 mb-2">
            {date.day}
          </Text>
          <View
            className={`w-12 h-12 rounded-2xl items-center justify-center mb-1
              ${date.isToday ? 
                'bg-violet-500 dark:bg-violet-500' : 
                'bg-zinc-100 dark:bg-zinc-800'}`}
          >
            <Text
              className={`text-base font-medium
                ${date.isToday ? 
                  'text-white' : 
                  'text-zinc-900 dark:text-white'}`}
            >
              {date.date}
            </Text>
          </View>
          <View className="flex-row space-x-1">
            {date.activities.workout && (
              <View className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            )}
            {date.activities.nutrition && (
              <View className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            )}
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const MacroProgressRing = ({ progress, color, size = 90, isDark, children }) => (
  <View style={{ width: size, height: size }} className="items-center justify-center">
    <View 
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        borderWidth: 4,
        borderColor: isDark ? '#27272a' : '#f4f4f5',
      }}
    />
    <View 
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        borderWidth: 4,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: color,
        borderTopColor: color,
        transform: [{ rotate: `${progress * 360}deg` }],
      }}
    />
    <View className="absolute inset-0 items-center justify-center">
      {children}
    </View>
  </View>
);

const CalorieBar = ({ consumed, burned, goal, isDark }) => {
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

const ActivityMetric = ({ 
  icon: Icon, 
  color, 
  darkColor, 
  label, 
  value, 
  sublabel 
}: {
  icon: React.ElementType;
  color: string;
  darkColor: string;
  label: string;
  value: React.ReactNode;
  sublabel: string;
}) => (
  <View className="flex-row items-center justify-between">
    <View className="flex-row items-center">
      <View className={`w-10 h-10 rounded-full bg-${color}-100 dark:bg-${color}-900/30 items-center justify-center mr-3`}>
        <Icon size={20} className={`text-${color}-600 dark:text-${color}-400`} />
      </View>
      <View>
        <Text className="text-sm font-medium text-zinc-900 dark:text-white">
          {label}
        </Text>
        <Text className="text-xs text-zinc-600 dark:text-zinc-400">
          {sublabel}
        </Text>
      </View>
    </View>
    {value}
  </View>
);

// Remove QuickLogButton component entirely

// Remove WaterTracker component entirely

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [isRefreshing, setIsRefreshing] = useState(false);
  // Remove loading states
  // const [isLoadingWorkout, setIsLoadingWorkout] = useState(false);
  // const [isLoadingMeal, setIsLoadingMeal] = useState(false);

  const dailyStats = useMemo(() => ({
    summary: {
      calories: {
        goal: 2000,
        consumed: 1431,
        burned: 840,
        net: 591
      },
      protein: {
        current: 85,
        goal: 150,
        percentage: 0.57
      },
      carbs: {
        current: 162,
        goal: 250,
        percentage: 0.65
      },
      fat: {
        current: 57,
        goal: 70,
        percentage: 0.81
      }
    },
    workouts: {
      completed: 2,
      duration: 85,
      remaining: 1
    },
    meals: {
      logged: 3,
      remaining: 2,
      nextIn: '2h 30m'
    }
  }), []);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  }, []);

  // Remove handlers
  // const handleLogMeal = useCallback...
  // const handleLogWorkout = useCallback...

  return (
    <SafeAreaView 
      style={{ paddingTop: insets.top }}
      className="flex-1 bg-zinc-50 dark:bg-zinc-950"
    >
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={isDark ? '#fff' : '#000'}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
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

        <DateStrip />

        {/* Daily Overview Card */}
        <View className="px-4">
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
              <View className="items-center">
                <MacroProgressRing 
                  progress={dailyStats.summary.protein.percentage} 
                  color="#3b82f6"
                  isDark={isDark}
                >
                  <Text className="text-lg font-semibold text-zinc-900 dark:text-white">
                    {dailyStats.summary.protein.current}g
                  </Text>
                </MacroProgressRing>
                <Text className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                  Protein
                </Text>
                <Text className="text-xs text-zinc-500 dark:text-zinc-500">
                  Goal: {dailyStats.summary.protein.goal}g
                </Text>
              </View>
              
              <View className="items-center">
                <MacroProgressRing 
                  progress={dailyStats.summary.carbs.percentage} 
                  color="#10b981"
                  isDark={isDark}
                >
                  <Text className="text-lg font-semibold text-zinc-900 dark:text-white">
                    {dailyStats.summary.carbs.current}g
                  </Text>
                </MacroProgressRing>
                <Text className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                  Carbs
                </Text>
                <Text className="text-xs text-zinc-500 dark:text-zinc-500">
                  Goal: {dailyStats.summary.carbs.goal}g
                </Text>
              </View>
              
              <View className="items-center">
                <MacroProgressRing 
                  progress={dailyStats.summary.fat.percentage} 
                  color="#f59e0b"
                  isDark={isDark}
                >
                  <Text className="text-lg font-semibold text-zinc-900 dark:text-white">
                    {dailyStats.summary.fat.current}g
                  </Text>
                </MacroProgressRing>
                <Text className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                  Fat
                </Text>
                <Text className="text-xs text-zinc-500 dark:text-zinc-500">
                  Goal: {dailyStats.summary.fat.goal}g
                </Text>
              </View>
            </View>
          </View>

          {/* Activity Summary */}
          <View className="bg-white dark:bg-zinc-900 rounded-3xl p-6 mt-4 mb-6 shadow-sm">
            <Text className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Today's Activity
            </Text>
            
            <View className="space-y-4">
              <ActivityMetric
                icon={Utensils}
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
                icon={Dumbbell}
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
                icon={Flame}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}