import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, SafeAreaView, RefreshControl, View, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { DateStrip } from '@/components/DateStrip';
import { DailyOverview } from '@/components/DailyOverview';
import { ActivitySummary } from '@/components/ActivitySummary';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [isRefreshing, setIsRefreshing] = useState(false);

  const dailyStats = useMemo<DailyStats>(() => ({
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
        <Header isDark={isDark} />
        <DateStrip />
        <View className="px-4">
          <DailyOverview dailyStats={dailyStats} isDark={isDark} />
          <ActivitySummary dailyStats={dailyStats} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;