import { Link, Stack } from 'expo-router';
import { Text, View, useColorScheme } from 'react-native';

export default function NotFoundScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
          This screen doesn't exist.
        </Text>
        <Link 
          href="/" 
          className="mt-4 py-4"
        >
          <Text className={`text-base font-medium text-violet-600 dark:text-violet-400`}>
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  );
}