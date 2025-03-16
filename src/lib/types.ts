// Type definitions for CDU MuscleForge App

// Exercise Types
export type MuscleGroup = 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core';

export type WorkoutGoal = 'hypertrophy' | 'strength' | 'endurance';

export type WorkoutSplit = 'push-pull-legs' | 'full-body' | 'upper-lower' | 'custom';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  isCustom?: boolean;
  description?: string;
}

export interface Set {
  reps: number;
  weight: number;
  rpe: number; // Rate of Perceived Exertion (1-10)
}

export interface WorkoutLog {
  id: string;
  userId: string;
  date: string;
  exercises: {
    exerciseId: string;
    exerciseName: string;
    sets: Set[];
  }[];
  notes?: string;
  completed: boolean;
}

export interface WorkoutPlan {
  id: string;
  userId: string;
  daysPerWeek: number;
  goal: WorkoutGoal;
  split: WorkoutSplit;
  schedule: {
    [key: string]: string[]; // day -> exercise ids
  };
}

// Nutrition Types
export interface FoodItem {
  id: string;
  name: string;
  protein: number; // grams
  carbs: number; // grams
  fats: number; // grams
  calories: number;
  servingSize: number; // grams
}

export interface Meal {
  id: string;
  userId: string;
  date: string;
  time: string;
  foods: {
    foodId: string;
    foodName: string;
    quantity: number; // in servings
  }[];
  photoUrl?: string;
  notes?: string;
}

export interface NutritionGoals {
  userId: string;
  caloriesPerDay: number;
  proteinPerDay: number; // grams
  carbsPerDay: number; // grams
  fatsPerDay: number; // grams
}

export interface UserProfile {
  id: string;
  displayName: string;
  weight: number; // in pounds
  height: number; // in inches
  age: number;
  activityLevel: number; // 1.2-1.9
  dieselPoints: number;
  streakDays: number;
  goals: {
    workout?: WorkoutGoal;
    nutrition?: NutritionGoals;
  };
}

// Gamification Types
export interface DieselPointsTransaction {
  id: string;
  userId: string;
  points: number;
  category: 'workout' | 'nutrition' | 'quiz' | 'community' | 'consistency';
  description: string;
  timestamp: string;
}

// Quiz Types
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  questionId: string;
  selectedOptionIndex: number;
  isCorrect: boolean;
  timestamp: string;
}
