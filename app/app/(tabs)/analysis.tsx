import React from 'react';
import { Text, View, ScrollView, useColorScheme, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Dumbbell,
  Apple,
  TrendingUp,
  Target,
  Flame,
  Scale,
  Heart,
  Trophy,
  ChevronRight
} from 'lucide-react-native';
import { LineChart, BarChart, ProgressChart } from 'react-native-chart-kit';

// ----- Type Definitions for Custom Components -----

interface MetricCardProps {
  icon: React.ComponentType<{ size: number; className?: string }>;
  label: string;
  value: string;
  trend?: string;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, label, value, trend, color }) => (
  <View className="bg-zinc-50 dark:bg-black/20 p-4 rounded-2xl flex-1 mr-2 last:mr-0">
    <View className="flex-row items-center justify-between mb-2">
      <Icon size={16} className={`text-${color}-600 dark:text-${color}-400`} />
      {trend && (
        <View
          className={`flex-row items-center bg-${color}-50 dark:bg-${color}-900/20 px-2 py-1 rounded-full`}
        >
          <TrendingUp size={12} className={`text-${color}-600 dark:text-${color}-400`} />
          <Text className={`ml-1 text-xs font-medium text-${color}-600 dark:text-${color}-400`}>
            {trend}
          </Text>
        </View>
      )}
    </View>
    <Text className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">{label}</Text>
    <Text className="text-xl font-semibold text-zinc-900 dark:text-white">{value}</Text>
  </View>
);

interface GoalCardProps {
  icon: React.ComponentType<{ size: number; className?: string }>;
  title: string;
  progress: number;
  target: string;
  color: string;
}

const GoalCard: React.FC<GoalCardProps> = ({ icon: Icon, title, progress, target, color }) => (
  <View className="flex-row items-center bg-zinc-50 dark:bg-black/20 p-4 rounded-2xl mb-2">
    <View
      className={`w-10 h-10 rounded-full bg-${color}-100 dark:bg-${color}-900/30 items-center justify-center mr-3`}
    >
      <Icon size={20} className={`text-${color}-600 dark:text-${color}-400`} />
    </View>
    <View className="flex-1">
      <Text className="text-sm font-medium text-zinc-900 dark:text-white mb-1">{title}</Text>
      <View className="flex-row items-center">
        <View className="flex-1 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full mr-3">
          <View
            className={`h-2 bg-${color}-500 rounded-full`}
            style={{ width: `${progress}%` }}
          />
        </View>
        <Text className="text-xs text-zinc-600 dark:text-zinc-400">
          {progress}% of {target}
        </Text>
      </View>
    </View>
  </View>
);

// ----- Main Analytics Screen Component -----

const AnalyticsScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const screenWidth = Dimensions.get('window').width;

  // Chart data definitions
  const weightData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [82, 81, 79.5, 78.2, 77.8, 76.5],
        color: (opacity = 1) =>
          isDark
            ? `rgba(167, 139, 250, ${opacity})`
            : `rgba(124, 58, 237, ${opacity})`,
        strokeWidth: 2
      }
    ]
  };

  const nutritionData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [2100, 1950, 2300, 2000, 2250, 1800, 2400],
        color: (opacity = 1) =>
          isDark
            ? `rgba(52, 211, 153, ${opacity})`
            : `rgba(5, 150, 105, ${opacity})`,
        strokeWidth: 2
      },
      {
        data: [1800, 1700, 2100, 1850, 1950, 1600, 2200],
        color: (opacity = 1) =>
          isDark
            ? `rgba(147, 197, 253, ${opacity})`
            : `rgba(59, 130, 246, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ['Calories In', 'Calories Out']
  };

  const workoutData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        data: [12000, 15000, 13500, 16800],
        color: (opacity = 1) =>
          isDark
            ? `rgba(147, 197, 253, ${opacity})`
            : `rgba(59, 130, 246, ${opacity})`
      }
    ]
  };

  const healthScoreData = {
    // Values between 0 and 1 (example data)
    data: [0.8, 0.7, 0.9]
  };

  const chartConfig = {
    backgroundColor: isDark ? '#18181b' : '#ffffff',
    backgroundGradientFrom: isDark ? '#18181b' : '#ffffff',
    backgroundGradientTo: isDark ? '#18181b' : '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) =>
      isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) =>
      isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: isDark ? '#34d399' : '#059669'
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-50 dark:bg-zinc-900">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-2 pb-4">
          <Text className="text-2xl font-semibold text-zinc-900 dark:text-white">
            Analytics
          </Text>
          <Text className="text-sm text-zinc-600 dark:text-zinc-400">
            Your health journey insights
          </Text>
        </View>

        {/* Quick Stats */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 mb-4">
          <MetricCard icon={(props) => <Scale {...props} />} label="Weight" value="76.5kg" trend="-0.3" color="violet" />
          <MetricCard icon={(props) => <Target {...props} />} label="BMI" value="23.5" trend="-0.1" color="emerald" />
          <MetricCard icon={(props) => <Heart {...props} />} label="Health Score" value="85%" trend="+5%" color="rose" />
          <MetricCard icon={(props) => <Flame {...props} />} label="Calories" value="2,400" trend="+200" color="orange" />
        </ScrollView>

        <View className="px-4">
          {/* Weight Tracking */}
          <View className="bg-white dark:bg-zinc-800 rounded-3xl p-6 mb-4 shadow-sm">
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-row items-center">
                <Scale size={24} className="text-violet-600 dark:text-violet-400" />
                <Text className="text-lg font-semibold text-zinc-900 dark:text-white ml-2">
                  Weight Progress
                </Text>
              </View>
              <View className="flex-row items-center bg-violet-50 dark:bg-violet-900/20 px-3 py-1.5 rounded-full">
                <Text className="text-sm font-medium text-violet-600 dark:text-violet-400">
                  6 Month View
                </Text>
              </View>
            </View>

            <LineChart
              data={weightData}
              width={screenWidth - 64}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />

            <View className="flex-row justify-between bg-zinc-50 dark:bg-black/20 p-4 rounded-2xl mt-6">
              <View className="items-center">
                <Text className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Starting</Text>
                <Text className="text-xl font-semibold text-violet-600 dark:text-violet-400">
                  82kg
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Current</Text>
                <Text className="text-xl font-semibold text-violet-600 dark:text-violet-400">
                  76.5kg
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Goal</Text>
                <Text className="text-xl font-semibold text-violet-600 dark:text-violet-400">
                  75kg
                </Text>
              </View>
            </View>
          </View>

          {/* Goals Progress */}
          <View className="bg-white dark:bg-zinc-800 rounded-3xl p-6 mb-4 shadow-sm">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <Trophy size={24} className="text-yellow-600 dark:text-yellow-400" />
                <Text className="text-lg font-semibold text-zinc-900 dark:text-white ml-2">
                  Goals Progress
                </Text>
              </View>
              <ChevronRight size={20} className="text-zinc-400" />
            </View>

            <GoalCard
              icon={props => <Scale {...props} />}
              title="Weight Loss Goal"
              progress={85}
              target="75kg"
              color="violet"
            />
            <GoalCard
              icon={props => <Dumbbell {...props} />}
              title="Strength Training"
              progress={70}
              target="12 sessions"
              color="blue"
            />
            <GoalCard
              icon={props => <Apple {...props} />}
              title="Healthy Diet Score"
              progress={90}
              target="score"
              color="emerald"
            />
          </View>

          {/* Health Score */}
          <View className="bg-white dark:bg-zinc-800 rounded-3xl p-6 mb-4 shadow-sm">
            <View className="flex-row items-center mb-6">
              <Heart size={24} className="text-rose-600 dark:text-rose-400" />
              <Text className="text-lg font-semibold text-zinc-900 dark:text-white ml-2">
                Health Score
              </Text>
            </View>

            <ProgressChart
              data={healthScoreData}
              width={screenWidth - 64}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(244, 63, 94, ${opacity})`
              }}
              hideLegend={false}
            />

            <View className="flex-row justify-between bg-zinc-50 dark:bg-black/20 p-4 rounded-2xl mt-6">
              <View className="items-center">
                <Text className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Diet</Text>
                <Text className="text-xl font-semibold text-rose-600 dark:text-rose-400">80%</Text>
              </View>
              <View className="items-center">
                <Text className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Activity</Text>
                <Text className="text-xl font-semibold text-rose-600 dark:text-rose-400">70%</Text>
              </View>
              <View className="items-center">
                <Text className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Sleep</Text>
                <Text className="text-xl font-semibold text-rose-600 dark:text-rose-400">90%</Text>
              </View>
            </View>
          </View>

          {/* Nutrition Section */}
          <View className="bg-white dark:bg-zinc-800 rounded-3xl p-6 mb-4 shadow-sm">
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-row items-center">
                <Apple size={24} className="text-emerald-600 dark:text-emerald-400" />
                <Text className="text-lg font-semibold text-zinc-900 dark:text-white ml-2">
                  Nutrition Overview
                </Text>
              </View>
              <View className="flex-row items-center bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-full">
                <Text className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Last 7 Days
                </Text>
              </View>
            </View>

            <LineChart
              data={nutritionData}
              width={screenWidth - 64}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
              legend={nutritionData.legend}
            />

            <View className="flex-row justify-between bg-zinc-50 dark:bg-black/20 p-4 rounded-2xl mt-6">
              <View className="items-center">
                <Text className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Protein</Text>
                <Text className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                  156g
                </Text>
                <Text className="text-xs text-zinc-500 dark:text-zinc-500">Goal: 160g</Text>
              </View>
              <View className="items-center">
                <Text className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Carbs</Text>
                <Text className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                  245g
                </Text>
                <Text className="text-xs text-zinc-500 dark:text-zinc-500">Goal: 250g</Text>
              </View>
              <View className="items-center">
                <Text className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Fat</Text>
                <Text className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                  65g
                </Text>
                <Text className="text-xs text-zinc-500 dark:text-zinc-500">Goal: 70g</Text>
              </View>
            </View>
          </View>

          {/* Weekly Workout Stats */}
          <View className="bg-white dark:bg-zinc-800 rounded-3xl p-6 mb-6 shadow-sm">
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-row items-center">
                <Dumbbell size={24} className="text-blue-600 dark:text-blue-400" />
                <Text className="text-lg font-semibold text-zinc-900 dark:text-white ml-2">
                  Workout Progress
                </Text>
              </View>
              <View className="flex-row items-center bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full">
                <Text className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Monthly
                </Text>
              </View>
            </View>

            <BarChart
              data={workoutData}
              width={screenWidth - 64}
              height={220}
              chartConfig={{
                ...chartConfig,
                propsForDots: {
                  ...chartConfig.propsForDots,
                  stroke: isDark ? '#93c5fd' : '#3b82f6'
                }
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
              showBarTops={false}
              flatColor={true}
            />

            <View className="flex-row justify-between bg-zinc-50 dark:bg-black/20 p-4 rounded-2xl mt-6">
              <View>
                <Text className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Total Sessions</Text>
                <Text className="text-xl font-semibold text-zinc-900 dark:text-white">16</Text>
              </View>
              <View>
                <Text className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Active Time</Text>
                <Text className="text-xl font-semibold text-zinc-900 dark:text-white">5.2h</Text>
              </View>
              <View>
                <Text className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Volume</Text>
                <Text className="text-xl font-semibold text-zinc-900 dark:text-white">16.8k</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnalyticsScreen;
