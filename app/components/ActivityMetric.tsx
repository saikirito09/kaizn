import React from 'react';
import { View, Text } from 'react-native';
import { Icon as LucideIcon } from 'lucide-react-native';

interface ActivityMetricProps {
  icon: React.FC<{ size: number; className: string }>;
  color: string;
  darkColor: string;
  label: string;
  value: React.ReactNode;
  sublabel: string;
}

export const ActivityMetric: React.FC<ActivityMetricProps> = ({ 
  icon: Icon, 
  color, 
  darkColor, 
  label, 
  value, 
  sublabel 
}) => (
  <View className="flex-row items-center justify-between">
    <View className="flex-row items-center py-2">
      <View 
        className={`w-11 h-11 rounded-2xl items-center justify-center mr-4 
        ${color === 'emerald' ? 'bg-emerald-50 dark:bg-emerald-900/20' : 
          color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20' : 
          'bg-orange-50 dark:bg-orange-900/20'}`}
      >
        <Icon 
          size={21} 
          className={`
            ${color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' : 
              color === 'blue' ? 'text-blue-600 dark:text-blue-400' : 
              'text-orange-600 dark:text-orange-400'}`} 
        />
      </View>
      <View className="space-y-0.5">
        <Text className="text-base font-medium text-zinc-900 dark:text-white">
          {label}
        </Text>
        <Text className="text-sm text-zinc-600 dark:text-zinc-400">
          {sublabel}
        </Text>
      </View>
    </View>
    <View className="ml-4">
      {value}
    </View>
  </View>
);