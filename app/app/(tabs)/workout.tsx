import React, { useState, memo, useCallback } from 'react';

interface WorkoutPlan {
  id: string;
  name: string;
  duration: string;
  calories: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  image: string;
  progress: number;
}

interface StatCardProps {
  icon: React.ComponentType<{ size: number; className?: string }>;
  label: string;
  value: string | number;
  color: string;
}

interface WorkoutCardProps {
  plan: WorkoutPlan;
}
import { Text, View, ScrollView, useColorScheme, Pressable, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Dumbbell, Play, Clock, Flame, ChevronRight,
  Timer, Calendar, Trophy, Zap, BarChart,
} from 'lucide-react-native';

// Consistent spacing values
const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Enhanced StatCard with better spacing
const StatCard: React.FC<StatCardProps> = memo(({ icon: Icon, label, value, color }) => (
  <View 
    className={`bg-${color}-50 dark:bg-${color}-900/30 rounded-2xl min-w-[140px] max-w-[180px]`}
    style={{ 
      padding: SPACING.md,
      marginRight: SPACING.sm,
    }}
  >
    <Icon size={24} className={`text-${color}-600 dark:text-${color}-400 mb-3`} />
    <Text className="text-2xl font-semibold text-zinc-900 dark:text-white mb-2">
      {value}
    </Text>
    <Text className="text-sm text-zinc-600 dark:text-zinc-400">
      {label}
    </Text>
  </View>
));

// Enhanced WorkoutCard with improved spacing
const WorkoutCard: React.FC<WorkoutCardProps> = memo(({ plan }) => (
  <Pressable 
    className="mb-6 active:opacity-90" 
    accessibilityRole="button"
    accessibilityLabel={`Start ${plan.name} workout`}
  >
    <View className="bg-white dark:bg-zinc-800 rounded-3xl shadow-sm overflow-hidden">
      <Image
        source={{ uri: plan.image }}
        className="w-full h-52 bg-zinc-100 dark:bg-zinc-700"
        accessibilityLabel={`${plan.name} workout image`}
      />
      <View className="p-5">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-semibold text-zinc-900 dark:text-white">
            {plan.name}
          </Text>
          <Pressable 
            className="flex-row items-center bg-violet-100 dark:bg-violet-900/30 px-4 py-2 rounded-full active:opacity-80"
            accessibilityRole="button"
            accessibilityLabel={`Start ${plan.name} workout`}
          >
            <Play size={16} className="text-violet-600 dark:text-violet-400 mr-2" />
            <Text className="text-sm font-medium text-violet-600 dark:text-violet-400">
              Start
            </Text>
          </Pressable>
        </View>

        <View className="flex-row items-center mb-4">
          <View className="flex-row items-center mr-4">
            <Clock size={16} className="text-zinc-600 dark:text-zinc-400 mr-1.5" />
            <Text className="text-sm text-zinc-600 dark:text-zinc-400">
              {plan.duration}
            </Text>
          </View>
          <View className="flex-row items-center mr-4">
            <Flame size={16} className="text-zinc-600 dark:text-zinc-400 mr-1.5" />
            <Text className="text-sm text-zinc-600 dark:text-zinc-400">
              {plan.calories} cal
            </Text>
          </View>
          <View className="px-3 py-1.5 bg-violet-100 dark:bg-violet-900/30 rounded-full">
            <Text className="text-xs font-medium text-violet-600 dark:text-violet-400">
              {plan.difficulty}
            </Text>
          </View>
        </View>

        <View className="w-full h-2.5 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
          <View
            className="h-full bg-violet-500 rounded-full"
            style={{ width: `${plan.progress * 100}%` }}
          />
        </View>
        <Text className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
          {Math.round(plan.progress * 100)}% completed
        </Text>
      </View>
    </View>
  </Pressable>
));

const WorkoutScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [activeTab, setActiveTab] = useState<'plans' | 'progress'>('plans');

  const workoutPlans: WorkoutPlan[] = [
    {
      id: '1',
      name: 'Full Body Strength',
      duration: '45 min',
      calories: 320,
      difficulty: 'Intermediate',
      category: 'Strength',
      image: '/api/placeholder/400/200',
      progress: 0.6,
    },
    {
      id: '2',
      name: 'HIIT Cardio Blast',
      duration: '30 min',
      calories: 400,
      difficulty: 'Advanced',
      category: 'Cardio',
      image: '/api/placeholder/400/200',
      progress: 0.3,
    },
    {
      id: '3',
      name: 'Core Foundation',
      duration: '20 min',
      calories: 180,
      difficulty: 'Beginner',
      category: 'Core',
      image: '/api/placeholder/400/200',
      progress: 0.8,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-zinc-50 dark:bg-zinc-900">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Platform.select({ ios: 100, android: 20 }) // Extra padding for iOS tab bar
        }}
      >
        {/* Header with improved spacing */}
        <View style={{ padding: SPACING.md }}>
          <Text className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Workouts
          </Text>
          <Text className="text-base text-zinc-600 dark:text-zinc-400">
            Track your fitness journey
          </Text>
        </View>

        {/* Stats with horizontal scroll snap */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          className="mb-8"
          contentContainerStyle={{
            paddingHorizontal: SPACING.md,
            paddingVertical: SPACING.xs
          }}
          snapToInterval={156} // Width of card + margin
          decelerationRate="fast"
        >
          <StatCard icon={(props) => <Calendar {...props} />} label="Workouts This Week" value="12" color="violet" />
          <StatCard icon={(props) => <Timer {...props} />} label="Active Minutes" value="320" color="blue" />
          <StatCard icon={(props) => <Flame {...props} />} label="Calories Burned" value="2.8k" color="orange" />
          <StatCard icon={(props) => <Trophy {...props} />} label="Achievements" value="8" color="emerald" />
        </ScrollView>

        {/* Quick Actions with improved layout */}
        <View style={{ paddingHorizontal: SPACING.md, marginBottom: SPACING.lg }}>
          <View className="flex-row justify-between">
            <Pressable
              className="flex-1 mr-2 bg-violet-500 rounded-2xl active:opacity-90"
              style={{ padding: SPACING.md }}
              accessibilityRole="button"
            >
              {/* ... Quick Action content remains the same ... */}
            </Pressable>
            <Pressable
              className="flex-1 ml-2 bg-zinc-800 dark:bg-zinc-700 rounded-2xl active:opacity-90"
              style={{ padding: SPACING.md }}
              accessibilityRole="button"
            >
              {/* ... Quick Action content remains the same ... */}
            </Pressable>
          </View>
        </View>

        {/* Enhanced Tab Navigation */}
        <View style={{ 
          paddingHorizontal: SPACING.md,
          marginBottom: SPACING.lg 
        }}>
          <View className="flex-row bg-zinc-100 dark:bg-zinc-800 rounded-full p-1">
            {['plans', 'progress'].map((tab) => (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab as 'plans' | 'progress')}
                className={`flex-1 py-3 px-6 rounded-full ${
                  activeTab === tab ? 'bg-white dark:bg-zinc-700' : ''
                }`}
                accessibilityRole="tab"
                accessibilityState={{ selected: activeTab === tab }}
              >
                <Text
                  className={`text-center font-medium ${
                    activeTab === tab 
                      ? 'text-violet-500' 
                      : 'text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  {tab === 'plans' ? 'Workout Plans' : 'My Progress'}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Main Content */}
        <View style={{ paddingHorizontal: SPACING.md }}>
          {activeTab === 'plans' ? (
            <>
              {workoutPlans.map((plan) => (
                <WorkoutCard key={plan.id} plan={plan} />
              ))}
              
              {/* Categories with improved layout */}
              <Text className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                Categories
              </Text>
              <View className="flex-row flex-wrap">
                {['Strength', 'Cardio', 'HIIT', 'Yoga', 'Core', 'Flexibility'].map((category) => (
                  <Pressable
                    key={category}
                    className="mr-2 mb-2 px-4 py-2.5 rounded-full bg-white dark:bg-zinc-800 active:opacity-80 shadow-sm"
                    accessibilityRole="button"
                  >
                    <Text className="text-sm font-medium text-zinc-900 dark:text-white">
                      {category}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </>
          ) : (
            <View className="py-12">
              <Text className="text-center text-lg text-zinc-600 dark:text-zinc-400">
                Your progress data will appear here
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutScreen;