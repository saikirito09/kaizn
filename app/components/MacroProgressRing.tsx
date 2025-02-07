import React from 'react';
import { View } from 'react-native';

interface MacroProgressRingProps {
  progress: number;
  color: string;
  size?: number;
  isDark: boolean;
  children: React.ReactNode;
}

export const MacroProgressRing: React.FC<MacroProgressRingProps> = ({ 
  progress, 
  color, 
  size = 90, 
  isDark, 
  children 
}) => (
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
