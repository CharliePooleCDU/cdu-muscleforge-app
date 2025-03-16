// Firebase service for nutrition-related operations
import { db, storage } from '../firebase/config';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Meal, NutritionGoals, FoodItem } from '../types';

// Collection references
const mealsCollection = 'meals';
const nutritionGoalsCollection = 'nutritionGoals';

// Meals
export const createMeal = async (meal: Omit<Meal, 'id'>, photoFile?: File): Promise<string> => {
  try {
    // If photo is provided, upload it first
    let photoUrl = meal.photoUrl;
    
    if (photoFile) {
      const storageRef = ref(storage, `meal-photos/${meal.userId}/${Date.now()}_${photoFile.name}`);
      const snapshot = await uploadBytes(storageRef, photoFile);
      photoUrl = await getDownloadURL(snapshot.ref);
    }
    
    // Create meal document with photo URL if available
    const mealWithPhoto = { ...meal, photoUrl };
    const docRef = await addDoc(collection(db, mealsCollection), mealWithPhoto);
    return docRef.id;
  } catch (error) {
    console.error('Error creating meal:', error);
    throw error;
  }
};

export const getMealById = async (id: string): Promise<Meal | null> => {
  try {
    const docRef = doc(db, mealsCollection, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Meal;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting meal:', error);
    throw error;
  }
};

export const getUserMeals = async (userId: string, date?: string): Promise<Meal[]> => {
  try {
    let q;
    
    if (date) {
      q = query(
        collection(db, mealsCollection),
        where('userId', '==', userId),
        where('date', '==', date),
        orderBy('time', 'asc')
      );
    } else {
      q = query(
        collection(db, mealsCollection),
        where('userId', '==', userId),
        orderBy('date', 'desc'),
        orderBy('time', 'asc')
      );
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Meal);
  } catch (error) {
    console.error('Error getting user meals:', error);
    throw error;
  }
};

export const updateMeal = async (id: string, updates: Partial<Meal>, photoFile?: File): Promise<void> => {
  try {
    // If photo is provided, upload it first
    let photoUrl = updates.photoUrl;
    
    if (photoFile) {
      const storageRef = ref(storage, `meal-photos/${updates.userId}/${Date.now()}_${photoFile.name}`);
      const snapshot = await uploadBytes(storageRef, photoFile);
      photoUrl = await getDownloadURL(snapshot.ref);
    }
    
    // Update meal document with photo URL if available
    const updatesWithPhoto = photoUrl ? { ...updates, photoUrl } : updates;
    const docRef = doc(db, mealsCollection, id);
    await updateDoc(docRef, updatesWithPhoto);
  } catch (error) {
    console.error('Error updating meal:', error);
    throw error;
  }
};

export const deleteMeal = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, mealsCollection, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting meal:', error);
    throw error;
  }
};

// Nutrition Goals
export const setNutritionGoals = async (goals: NutritionGoals): Promise<string> => {
  try {
    // Check if goals already exist for this user
    const q = query(
      collection(db, nutritionGoalsCollection),
      where('userId', '==', goals.userId)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.docs.length > 0) {
      // Update existing goals
      const docId = querySnapshot.docs[0].id;
      const docRef = doc(db, nutritionGoalsCollection, docId);
      await updateDoc(docRef, goals);
      return docId;
    } else {
      // Create new goals
      const docRef = await addDoc(collection(db, nutritionGoalsCollection), goals);
      return docRef.id;
    }
  } catch (error) {
    console.error('Error setting nutrition goals:', error);
    throw error;
  }
};

export const getNutritionGoals = async (userId: string): Promise<NutritionGoals | null> => {
  try {
    const q = query(
      collection(db, nutritionGoalsCollection),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.docs.length > 0) {
      const doc = querySnapshot.docs[0];
      return { ...doc.data() } as NutritionGoals;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting nutrition goals:', error);
    throw error;
  }
};

// Helper functions
export const calculateTDEE = (
  weight: number, // in pounds
  height: number, // in inches
  age: number,
  activityLevel: number // 1.2-1.9
): number => {
  // Convert pounds to kg and inches to cm
  const weightKg = weight * 0.453592;
  const heightCm = height * 2.54;
  
  // Harris-Benedict BMR formula for men (as per requirements)
  const bmr = 66 + (6.23 * weight) + (12.7 * height) - (6.8 * age);
  
  // Multiply BMR by activity level to get TDEE
  return Math.round(bmr * activityLevel);
};

export const calculateDailyMacros = async (userId: string, date: string): Promise<{
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  totalCalories: number;
}> => {
  try {
    const meals = await getUserMeals(userId, date);
    
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;
    let totalCalories = 0;
    
    // Calculate totals from all meals
    meals.forEach(meal => {
      meal.foods.forEach(food => {
        // Get food item details from database
        // In a real app, this would fetch from Firestore
        // For this example, we'll assume the food details are included in the meal data
        const foodItem = food as unknown as { 
          foodId: string; 
          foodName: string; 
          quantity: number;
          protein: number;
          carbs: number;
          fats: number;
          calories: number;
        };
        
        totalProtein += foodItem.protein * foodItem.quantity;
        totalCarbs += foodItem.carbs * foodItem.quantity;
        totalFats += foodItem.fats * foodItem.quantity;
        totalCalories += foodItem.calories * foodItem.quantity;
      });
    });
    
    return {
      totalProtein: Math.round(totalProtein),
      totalCarbs: Math.round(totalCarbs),
      totalFats: Math.round(totalFats),
      totalCalories: Math.round(totalCalories)
    };
  } catch (error) {
    console.error('Error calculating daily macros:', error);
    throw error;
  }
};
