import React, { useCallback, useMemo } from 'react';
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
import { Camera, Plus, ChevronRight, Flame } from 'lucide-react-native';

// DateStrip Component
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
        // Simulate completed days (in real app, this would come from actual data)
        isCompleted: i < 0 ? Math.random() > 0.3 : false
      });
    }
    return dates;
  }, []);

  const streak = useMemo(() => {
    // Simulate a streak count (in real app, this would be calculated from actual data)
    return 12;
  }, []);

  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between px-4 mb-4">
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
          className="flex-row items-center bg-orange-100 dark:bg-orange-900/30 px-3 py-1.5 rounded-full active:opacity-80"
          android_ripple={{ color: isDark ? '#ffffff20' : '#00000010' }}
        >
          <Flame size={16} className="text-orange-600 dark:text-orange-400" />
          <Text className="ml-1.5 font-medium text-orange-600 dark:text-orange-400">
            {streak} Day Streak!
          </Text>
        </Pressable>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="px-4"
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
                  'bg-emerald-500 dark:bg-emerald-500' : 
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
            {date.isCompleted && (
              <View className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            )}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const dailyProgress = useMemo(() => ({
    calories: {
      current: 1431,
      target: 3000,
      percentage: 47.7
    },
    macros: {
      protein: { current: 85, target: 240 },
      carbs: { current: 162, target: 300 },
      fat: { current: 57, target: 100 }
    }
  }), []);

  const recentMeals = useMemo(() => ([
    {
      id: 1,
      name: "Breakfast",
      time: "8:30 AM",
      calories: 450,
      imageUrl: null,
    },
    {
      id: 2,
      name: "Morning Snack",
      time: "10:45 AM",
      calories: 180,
      imageUrl: null,
    }
  ]), []);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  }, []);

  const handleAddFood = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const ProgressBar = ({ value, color }) => (
    <View className="h-1.5 w-full rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
      <View 
        className={`h-full rounded-full ${color}`}
        style={{ width: `${value}%` }}
      />
    </View>
  );

  const MacroCard = ({ label, current, target, color }) => {
    const percentage = (current / target) * 100;
    
    return (
      <View className="flex-1 mx-1">
        <View className="bg-white dark:bg-zinc-900 rounded-2xl p-3 shadow-sm">
          <Text className="text-zinc-600 dark:text-zinc-400 text-sm mb-2">
            {label}
          </Text>
          <Text className="text-zinc-900 dark:text-white text-lg font-semibold mb-1">
            {current}
            <Text className="text-zinc-500 dark:text-zinc-400 text-sm font-normal">
              /{target}g
            </Text>
          </Text>
          <ProgressBar value={percentage} color={color} />
        </View>
      </View>
    );
  };

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
        <DateStrip />

        {/* Main Content */}
        <View className="px-4">
          {/* Calories Card */}
          <Pressable 
            className="active:opacity-80"
            android_ripple={{ color: isDark ? '#ffffff20' : '#00000010' }}
          >
            <View className="bg-white dark:bg-zinc-900 rounded-3xl p-6 mb-6 shadow-sm">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-base text-zinc-600 dark:text-zinc-400">
                  Daily Goal
                </Text>
                <View className="bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
                  <Text className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {dailyProgress.calories.percentage}% Complete
                  </Text>
                </View>
              </View>
              
              <View className="items-center mb-4">
                <Text className="text-4xl font-bold text-zinc-900 dark:text-white mb-1">
                  {dailyProgress.calories.current.toLocaleString()}
                </Text>
                <Text className="text-base text-zinc-600 dark:text-zinc-400">
                  of {dailyProgress.calories.target.toLocaleString()} calories
                </Text>
              </View>

              <ProgressBar 
                value={dailyProgress.calories.percentage} 
                color="bg-emerald-500"
              />
            </View>
          </Pressable>

          {/* Macros */}
          <View className="flex-row mx-[-4px] mb-6">
            <MacroCard 
              label="Protein"
              current={dailyProgress.macros.protein.current}
              target={dailyProgress.macros.protein.target}
              color="bg-blue-500"
            />
            <MacroCard 
              label="Carbs"
              current={dailyProgress.macros.carbs.current}
              target={dailyProgress.macros.carbs.target}
              color="bg-amber-500"
            />
            <MacroCard 
              label="Fat"
              current={dailyProgress.macros.fat.current}
              target={dailyProgress.macros.fat.target}
              color="bg-rose-500"
            />
          </View>

          {/* Meals Section */}
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-lg font-semibold text-zinc-900 dark:text-white">
                Today's Meals
              </Text>
              <Pressable 
                className="flex-row items-center active:opacity-80"
                android_ripple={{ color: isDark ? '#ffffff20' : '#00000010' }}
              >
                <Text className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mr-1">
                  See All
                </Text>
                <ChevronRight size={16} className="text-emerald-600 dark:text-emerald-400" />
              </Pressable>
            </View>

            {recentMeals.map(meal => (
              <Pressable
                key={meal.id}
                className="flex-row items-center p-4 mb-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 active:opacity-80"
                android_ripple={{ color: isDark ? '#ffffff20' : '#00000010' }}
              >
                <View className="w-12 h-12 rounded-xl mr-4 items-center justify-center bg-white dark:bg-zinc-700">
                  <Text className="text-lg">🍳</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-base font-medium text-zinc-900 dark:text-white">
                    {meal.name}
                  </Text>
                  <Text className="text-sm text-zinc-600 dark:text-zinc-400">
                    {meal.time} • {meal.calories} calories
                  </Text>
                </View>
                <ChevronRight size={20} className="text-zinc-400 dark:text-zinc-500" />
              </Pressable>
            ))}

            {/* Add Meal Button */}
            <Pressable
              onPress={handleAddFood}
              disabled={isLoading}
              className={`bg-emerald-500 dark:bg-emerald-600 rounded-2xl p-4 flex-row items-center justify-center shadow-sm active:opacity-80 ${isLoading ? 'opacity-70' : ''}`}
              android_ripple={{ color: '#ffffff20' }}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Plus size={20} color="#fff" />
                  <Text className="text-white font-semibold ml-2">
                    Add Meal
                  </Text>
                </>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}