import React, { useMemo } from 'react';
import { ScrollView, Text, View, Pressable, useColorScheme } from 'react-native';

export const DateStrip: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const dateInfo = useMemo<DateInfo[]>(() => {
    const dates: DateInfo[] = [];
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