interface DailyStats {
    summary: {
      calories: {
        goal: number;
        consumed: number;
        burned: number;
        net: number;
      };
      protein: MacroNutrient;
      carbs: MacroNutrient;
      fat: MacroNutrient;
    };
    workouts: {
      completed: number;
      duration: number;
      remaining: number;
    };
    meals: {
      logged: number;
      remaining: number;
      nextIn: string;
    };
  }
  
  interface MacroNutrient {
    current: number;
    goal: number;
    percentage: number;
  }
  
  interface DateInfo {
    date: number;
    day: string;
    isToday: boolean;
    activities: {
      workout: boolean;
      nutrition: boolean;
    };
  }