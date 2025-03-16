import { FoodItem } from '../types';

// Food database with macronutrient information
export const foodDatabase: FoodItem[] = [
  // Protein sources
  {
    id: 'chicken-breast',
    name: 'Chicken Breast',
    protein: 31,
    carbs: 0,
    fats: 3.6,
    calories: 165,
    servingSize: 100
  },
  {
    id: 'ground-beef-lean',
    name: 'Ground Beef (93% lean)',
    protein: 22,
    carbs: 0,
    fats: 8.7,
    calories: 172,
    servingSize: 100
  },
  {
    id: 'salmon',
    name: 'Salmon',
    protein: 25,
    carbs: 0,
    fats: 13,
    calories: 208,
    servingSize: 100
  },
  {
    id: 'eggs',
    name: 'Eggs',
    protein: 6,
    carbs: 0.6,
    fats: 5,
    calories: 72,
    servingSize: 50 // One large egg
  },
  {
    id: 'greek-yogurt',
    name: 'Greek Yogurt (plain)',
    protein: 10,
    carbs: 3.6,
    fats: 0.4,
    calories: 59,
    servingSize: 100
  },
  {
    id: 'whey-protein',
    name: 'Whey Protein Powder',
    protein: 24,
    carbs: 3,
    fats: 1,
    calories: 120,
    servingSize: 30 // One scoop
  },
  
  // Carbohydrate sources
  {
    id: 'white-rice',
    name: 'White Rice (cooked)',
    protein: 2.7,
    carbs: 28,
    fats: 0.3,
    calories: 130,
    servingSize: 100
  },
  {
    id: 'brown-rice',
    name: 'Brown Rice (cooked)',
    protein: 2.6,
    carbs: 23,
    fats: 0.9,
    calories: 112,
    servingSize: 100
  },
  {
    id: 'sweet-potato',
    name: 'Sweet Potato',
    protein: 1.6,
    carbs: 20,
    fats: 0.1,
    calories: 86,
    servingSize: 100
  },
  {
    id: 'oatmeal',
    name: 'Oatmeal (dry)',
    protein: 13,
    carbs: 68,
    fats: 6.9,
    calories: 389,
    servingSize: 100
  },
  {
    id: 'pasta',
    name: 'Pasta (cooked)',
    protein: 5.8,
    carbs: 30.9,
    fats: 0.9,
    calories: 158,
    servingSize: 100
  },
  {
    id: 'bread',
    name: 'Whole Wheat Bread',
    protein: 4,
    carbs: 12,
    fats: 1,
    calories: 69,
    servingSize: 30 // One slice
  },
  
  // Fat sources
  {
    id: 'avocado',
    name: 'Avocado',
    protein: 2,
    carbs: 8.5,
    fats: 15,
    calories: 160,
    servingSize: 100
  },
  {
    id: 'olive-oil',
    name: 'Olive Oil',
    protein: 0,
    carbs: 0,
    fats: 14,
    calories: 119,
    servingSize: 15 // One tablespoon
  },
  {
    id: 'almonds',
    name: 'Almonds',
    protein: 6,
    carbs: 6,
    fats: 14,
    calories: 164,
    servingSize: 28 // One ounce
  },
  {
    id: 'peanut-butter',
    name: 'Peanut Butter',
    protein: 4,
    carbs: 3,
    fats: 8,
    calories: 94,
    servingSize: 16 // One tablespoon
  },
  
  // Vegetables
  {
    id: 'broccoli',
    name: 'Broccoli',
    protein: 2.8,
    carbs: 6.6,
    fats: 0.4,
    calories: 34,
    servingSize: 100
  },
  {
    id: 'spinach',
    name: 'Spinach',
    protein: 2.9,
    carbs: 3.6,
    fats: 0.4,
    calories: 23,
    servingSize: 100
  },
  
  // Fruits
  {
    id: 'banana',
    name: 'Banana',
    protein: 1.1,
    carbs: 22.8,
    fats: 0.3,
    calories: 89,
    servingSize: 100
  },
  {
    id: 'apple',
    name: 'Apple',
    protein: 0.3,
    carbs: 13.8,
    fats: 0.2,
    calories: 52,
    servingSize: 100
  }
];

// Helper function to get food item by ID
export const getFoodItemById = (id: string): FoodItem | undefined => {
  return foodDatabase.find(food => food.id === id);
};

// Helper function to search food items by name
export const searchFoodItems = (query: string): FoodItem[] => {
  const lowerCaseQuery = query.toLowerCase();
  return foodDatabase.filter(food => 
    food.name.toLowerCase().includes(lowerCaseQuery)
  );
};
