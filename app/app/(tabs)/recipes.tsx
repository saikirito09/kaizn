import React, { useState, memo, useCallback } from 'react';
import { View, Text, ScrollView, Pressable, Image, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Search, ChevronRight, Timer, Users, Sparkles,
  Clock, ChefHat, Bot, BookOpen, UtensilsCrossed
} from 'lucide-react-native';

// Types
interface Recipe {
  id: string;
  name: string;
  description: string;
  cookTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  image: string;
  tags: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
  onPress: (recipe: Recipe) => void;
}

// Constants
const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Helper Components
const SearchBar = memo(({ onSearch, onGenerate }: { 
  onSearch: (text: string) => void;
  onGenerate: (prompt: string) => void;
}) => {
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = useCallback(() => {
    setIsGenerating(true);
    onGenerate(text);
    setTimeout(() => setIsGenerating(false), 2000); // Simulated delay
  }, [text, onGenerate]);

  return (
    <View className="px-4 py-2 bg-white dark:bg-zinc-900 shadow-sm">
      <View className="flex-row items-center bg-zinc-100 dark:bg-zinc-800 rounded-2xl px-4 py-3">
        <Search size={20} className="text-zinc-400 dark:text-zinc-500" />
        <TextInput
          value={text}
          onChangeText={(value) => {
            setText(value);
            onSearch(value);
          }}
          placeholder="Search recipes or describe what you want to cook..."
          placeholderTextColor="#71717a"
          className="flex-1 ml-3 text-base text-zinc-900 dark:text-white"
        />
        {text.length > 0 && (
          <Pressable
            onPress={handleGenerate}
            className="flex-row items-center bg-violet-500 rounded-xl px-3 py-2 active:opacity-90"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <>
                <Bot size={16} className="text-white mr-1" />
                <Text className="text-sm font-medium text-white">Generate</Text>
              </>
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
});

const RecipeCard: React.FC<RecipeCardProps> = memo(({ recipe, onPress }) => (
  <Pressable
    onPress={() => onPress(recipe)}
    className="bg-white dark:bg-zinc-800 rounded-3xl shadow-sm mb-4 overflow-hidden active:opacity-90"
  >
    <Image
      source={{ uri: recipe.image }}
      className="w-full h-48 bg-zinc-100 dark:bg-zinc-700"
      accessibilityLabel={`${recipe.name} recipe image`}
    />
    <View className="p-4">
      <View className="flex-row items-start justify-between mb-2">
        <View className="flex-1 mr-4">
          <Text className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">
            {recipe.name}
          </Text>
          <Text 
            numberOfLines={2} 
            className="text-sm text-zinc-600 dark:text-zinc-400"
          >
            {recipe.description}
          </Text>
        </View>
        <ChevronRight size={20} className="text-zinc-400 dark:text-zinc-500" />
      </View>
      
      <View className="flex-row items-center mt-3">
        <View className="flex-row items-center mr-4">
          <Timer size={16} className="text-zinc-600 dark:text-zinc-400 mr-1" />
          <Text className="text-sm text-zinc-600 dark:text-zinc-400">
            {recipe.cookTime}
          </Text>
        </View>
        <View className="flex-row items-center mr-4">
          <Users size={16} className="text-zinc-600 dark:text-zinc-400 mr-1" />
          <Text className="text-sm text-zinc-600 dark:text-zinc-400">
            {recipe.servings} servings
          </Text>
        </View>
        <View className="px-2 py-1 bg-violet-100 dark:bg-violet-900/30 rounded-full">
          <Text className="text-xs font-medium text-violet-600 dark:text-violet-400">
            {recipe.difficulty}
          </Text>
        </View>
      </View>

      <View className="flex-row flex-wrap mt-3">
        {recipe.tags.map((tag) => (
          <View
            key={tag}
            className="bg-zinc-100 dark:bg-zinc-700 rounded-full px-2 py-1 mr-2 mb-1"
          >
            <Text className="text-xs text-zinc-600 dark:text-zinc-400">
              {tag}
            </Text>
          </View>
        ))}
      </View>
    </View>
  </Pressable>
));

const QuickActionButton = memo(({ 
  icon: Icon, 
  label, 
  sublabel,
  onPress 
}: {
  icon: React.ComponentType<{ size: number; className: string }>;
  label: string;
  sublabel: string;
  onPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    className="flex-1 bg-white dark:bg-zinc-800 rounded-3xl p-4 mx-2 shadow-sm active:opacity-90"
  >
    <Icon size={24} className="text-violet-500 dark:text-violet-400 mb-3" />
    <Text className="text-base font-semibold text-zinc-900 dark:text-white mb-1">
      {label}
    </Text>
    <Text className="text-sm text-zinc-600 dark:text-zinc-400">
      {sublabel}
    </Text>
  </Pressable>
));

const RecipeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data
  const recipes: Recipe[] = [
    {
      id: '1',
      name: 'Creamy Garlic Pasta',
      description: 'A rich and creamy pasta dish with roasted garlic, fresh herbs, and parmesan cheese.',
      cookTime: '25 min',
      servings: 4,
      difficulty: 'Easy',
      image: '/api/placeholder/400/300',
      tags: ['Pasta', 'Vegetarian', 'Quick']
    },
    {
      id: '2',
      name: 'Grilled Salmon Bowl',
      description: 'Fresh grilled salmon served over quinoa with roasted vegetables and avocado.',
      cookTime: '35 min',
      servings: 2,
      difficulty: 'Medium',
      image: '/api/placeholder/400/300',
      tags: ['Seafood', 'Healthy', 'Bowl']
    },
    {
      id: '3',
      name: 'Classic Beef Stir-Fry',
      description: 'Tender beef strips with crispy vegetables in a savory sauce.',
      cookTime: '30 min',
      servings: 4,
      difficulty: 'Medium',
      image: '/api/placeholder/400/300',
      tags: ['Beef', 'Asian', 'Quick']
    },
  ];

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
    // Implement search logic
  }, []);

  const handleGenerate = useCallback((prompt: string) => {
    // Implement AI generation logic
    console.log('Generating recipe for:', prompt);
  }, []);

  const handleRecipePress = useCallback((recipe: Recipe) => {
    // Navigate to recipe details
    console.log('Selected recipe:', recipe.name);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-zinc-50 dark:bg-zinc-900">
      {/* Header */}
      <View className="px-4 pt-2 pb-4">
        <Text className="text-2xl font-semibold text-zinc-900 dark:text-white">
          Recipes
        </Text>
        <Text className="text-sm text-zinc-600 dark:text-zinc-400">
          Discover and create delicious meals
        </Text>
      </View>

      <SearchBar onSearch={handleSearch} onGenerate={handleGenerate} />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: SPACING.md }}
      >
        {/* Quick Actions */}
        <View className="flex-row mb-6 -mx-2">
          <QuickActionButton
            icon={ChefHat as React.ComponentType<{ size: number; className: string }>}
            label="Chef Mode"
            sublabel="Get step-by-step guidance"
            onPress={() => {}}
          />
          <QuickActionButton
            icon={BookOpen as React.ComponentType<{ size: number; className: string }>}
            label="My Recipes"
            sublabel="View saved recipes"
            onPress={() => {}}
          />
        </View>

        {/* Categories */}
        <Text className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
          Popular Categories
        </Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          className="mb-6 -mx-2"
        >
          {['Quick & Easy', 'Vegetarian', 'Healthy', 'Desserts', 'Breakfast'].map((category) => (
            <Pressable
              key={category}
              className="mx-2 items-center"
            >
              <View className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-2xl items-center justify-center mb-2">
                <UtensilsCrossed size={24} className="text-violet-500 dark:text-violet-400" />
              </View>
              <Text className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Featured Recipe */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-semibold text-zinc-900 dark:text-white">
              Featured Recipes
            </Text>
            <Pressable className="flex-row items-center">
              <Text className="text-sm font-medium text-violet-500 dark:text-violet-400 mr-1">
                View All
              </Text>
              <ChevronRight size={16} className="text-violet-500 dark:text-violet-400" />
            </Pressable>
          </View>
          
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onPress={handleRecipePress}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecipeScreen;