'use client';

import React, { useState } from 'react';
import { FoodItem, Meal } from '@/lib/types';
import { foodDatabase, searchFoodItems } from '@/lib/data/food-database';

// UI Components
const FoodSelector = ({ 
  onSelectFood 
}: { 
  onSelectFood: (food: FoodItem, quantity: number) => void 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  const searchResults = searchQuery 
    ? searchFoodItems(searchQuery)
    : [];

  const handleAddFood = () => {
    if (selectedFood) {
      onSelectFood(selectedFood, quantity);
      setSelectedFood(null);
      setQuantity(1);
      setSearchQuery('');
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Add Food</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Search Food</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Search for food (e.g., chicken, rice)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {searchQuery && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Results</label>
          <div className="max-h-60 overflow-y-auto border rounded p-2 bg-white">
            {searchResults.length > 0 ? (
              searchResults.map(food => (
                <div 
                  key={food.id}
                  className={`p-2 hover:bg-gray-200 cursor-pointer rounded ${selectedFood?.id === food.id ? 'bg-gray-200' : ''}`}
                  onClick={() => setSelectedFood(food)}
                >
                  <div className="font-medium">{food.name}</div>
                  <div className="text-xs text-gray-500">
                    {food.calories} cal | P: {food.protein}g | C: {food.carbs}g | F: {food.fats}g
                    <span className="ml-1">({food.servingSize}g serving)</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No results found</div>
            )}
          </div>
        </div>
      )}
      
      {selectedFood && (
        <div className="mb-4 p-3 bg-white rounded border">
          <div className="font-medium">{selectedFood.name}</div>
          <div className="text-sm text-gray-500 mb-2">
            {selectedFood.calories} cal | P: {selectedFood.protein}g | C: {selectedFood.carbs}g | F: {selectedFood.fats}g
            <span className="ml-1">({selectedFood.servingSize}g serving)</span>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Quantity:</label>
            <input
              type="number"
              className="w-20 p-1 border rounded"
              min="0.25"
              step="0.25"
              value={quantity}
              onChange={(e) => setQuantity(parseFloat(e.target.value) || 1)}
            />
            <span className="text-sm text-gray-500">servings</span>
          </div>
          
          <div className="mt-2 text-sm">
            <div>Total calories: {Math.round(selectedFood.calories * quantity)} cal</div>
            <div>Total protein: {Math.round(selectedFood.protein * quantity)}g</div>
            <div>Total carbs: {Math.round(selectedFood.carbs * quantity)}g</div>
            <div>Total fats: {Math.round(selectedFood.fats * quantity)}g</div>
          </div>
        </div>
      )}
      
      <button
        className={`w-full p-2 bg-red-600 text-white rounded font-medium ${!selectedFood ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleAddFood}
        disabled={!selectedFood}
      >
        Add Food to Meal
      </button>
    </div>
  );
};

const MealPhotoUploader = ({
  onPhotoSelected
}: {
  onPhotoSelected: (file: File) => void
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onPhotoSelected(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Meal Photo</label>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
        {previewUrl ? (
          <div>
            <img 
              src={previewUrl} 
              alt="Meal preview" 
              className="max-h-48 mx-auto mb-2 rounded"
            />
            <button
              className="text-sm text-red-600"
              onClick={() => setPreviewUrl(null)}
            >
              Remove photo
            </button>
          </div>
        ) : (
          <div>
            <p className="text-gray-500 mb-2">Upload a photo of your meal</p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="meal-photo-input"
              onChange={handleFileChange}
            />
            <label
              htmlFor="meal-photo-input"
              className="inline-block px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
            >
              Select Photo
            </label>
          </div>
        )}
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        Tip: Taking photos of your meals helps with accountability and earns you 10 Diesel Points!
      </div>
    </div>
  );
};

const TDEECalculator = ({
  onCalculate
}: {
  onCalculate: (tdee: number, macros: {protein: number, carbs: number, fats: number}) => void
}) => {
  const [weight, setWeight] = useState(180);
  const [height, setHeight] = useState(70); // 5'10" in inches
  const [age, setAge] = useState(25);
  const [activityLevel, setActivityLevel] = useState(1.55);
  
  const calculateTDEE = () => {
    // Harris-Benedict BMR formula for men (as per requirements)
    const bmr = 66 + (6.23 * weight) + (12.7 * height) - (6.8 * age);
    
    // Multiply BMR by activity level to get TDEE
    const tdee = Math.round(bmr * activityLevel);
    
    // Calculate recommended macros
    const protein = Math.round(weight); // 1g per lb of bodyweight
    const fats = Math.round(weight * 0.4); // 0.4g per lb of bodyweight
    const carbs = Math.round(weight * 2); // 2g per lb of bodyweight
    
    onCalculate(tdee, { protein, carbs, fats });
  };
  
  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-4">
      <h3 className="text-lg font-bold mb-2">TDEE Calculator</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Weight (lbs)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={weight}
            onChange={(e) => setWeight(parseInt(e.target.value) || 0)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Height (inches)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value) || 0)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Activity Level</label>
          <select
            className="w-full p-2 border rounded"
            value={activityLevel}
            onChange={(e) => setActivityLevel(parseFloat(e.target.value))}
          >
            <option value={1.2}>Sedentary (little or no exercise)</option>
            <option value={1.375}>Lightly active (light exercise 1-3 days/week)</option>
            <option value={1.55}>Moderately active (moderate exercise 3-5 days/week)</option>
            <option value={1.725}>Very active (hard exercise 6-7 days/week)</option>
            <option value={1.9}>Extra active (very hard exercise & physical job)</option>
          </select>
        </div>
      </div>
      
      <button
        className="w-full p-2 bg-red-600 text-white rounded font-medium"
        onClick={calculateTDEE}
      >
        Calculate TDEE & Macros
      </button>
    </div>
  );
};

const NutritionTracker = () => {
  const [mealTime, setMealTime] = useState('');
  const [mealFoods, setMealFoods] = useState<Array<{
    food: FoodItem;
    quantity: number;
  }>>([]);
  const [mealNotes, setMealNotes] = useState('');
  const [mealPhoto, setMealPhoto] = useState<File | null>(null);
  
  const [tdee, setTDEE] = useState(0);
  const [macroGoals, setMacroGoals] = useState({
    protein: 0,
    carbs: 0,
    fats: 0
  });
  
  const [meals, setMeals] = useState<Array<{
    id: string;
    time: string;
    foods: Array<{
      food: FoodItem;
      quantity: number;
    }>;
    notes: string;
    photoUrl?: string;
  }>>([]);
  
  const handleAddFood = (food: FoodItem, quantity: number) => {
    setMealFoods([...mealFoods, { food, quantity }]);
  };
  
  const handleRemoveFood = (index: number) => {
    const newFoods = [...mealFoods];
    newFoods.splice(index, 1);
    setMealFoods(newFoods);
  };
  
  const handlePhotoSelected = (file: File) => {
    setMealPhoto(file);
  };
  
  const handleSaveMeal = () => {
    if (mealFoods.length === 0 || !mealTime) {
      alert('Please add at least one food and select a meal time');
      return;
    }
    
    // In a real app, this would save to Firebase
    const newMeal = {
      id: `meal-${Date.now()}`,
      time: mealTime,
      foods: [...mealFoods],
      notes: mealNotes,
      photoUrl: mealPhoto ? URL.createObjectURL(mealPhoto) : undefined
    };
    
    setMeals([...meals, newMeal]);
    
    // Reset form
    setMealTime('');
    setMealFoods([]);
    setMealNotes('');
    setMealPhoto(null);
  };
  
  // Calculate totals for the day
  const dailyTotals = meals.reduce((totals, meal) => {
    meal.foods.forEach(({ food, quantity }) => {
      totals.calories += food.calories * quantity;
      totals.protein += food.protein * quantity;
      totals.carbs += food.carbs * quantity;
      totals.fats += food.fats * quantity;
    });
    return totals;
  }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Nutrition Tracker</h2>
      
      <TDEECalculator
        onCalculate={(calculatedTDEE, calculatedMacros) => {
          setTDEE(calculatedTDEE);
          setMacroGoals(calculatedMacros);
        }}
      />
      
      {tdee > 0 && (
        <div className="p-4 bg-gray-100 rounded-lg mb-6">
          <h3 className="text-lg font-bold mb-2">Your Nutrition Goals</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-white rounded shadow text-center">
              <div className="text-sm text-gray-500">Daily Calories</div>
              <div className="text-xl font-bold">{tdee}</div>
            </div>
            
            <div className="p-3 bg-white rounded shadow text-center">
              <div className="text-sm text-gray-500">Protein</div>
              <div className="text-xl font-bold">{macroGoals.protein}g</div>
            </div>
            
            <div className="p-3 bg-white rounded shadow text-center">
              <div className="text-sm text-gray-500">Carbs</div>
              <div className="text-xl font-bold">{macroGoals.carbs}g</div>
            </div>
            
            <div className="p-3 bg-white rounded shadow text-center">
              <div className="text-sm text-gray-500">Fats</div>
              <div className="text-xl font-bold">{macroGoals.fats}g</div>
            </div>
          </div>
          
          {meals.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Today's Progress</h4>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-2 bg-white rounded">
                  <div className="text-sm">Calories</div>
                  <div className="flex items-center">
                    <div className="font-bold">{Math.round(dailyTotals.calories)}</div>
                    <div className="text-xs text-gray-500 ml-1">/ {tdee}</div>
                    <div className="ml-auto text-sm">
                      {Math.round((dailyTotals.calories / tdee) * 100)}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-red-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(100, (dailyTotals.calories / tdee) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="p-2 bg-white rounded">
                  <div className="text-sm">Protein</div>
                  <div className="flex items-center">
                    <div className="font-bold">{Math.round(dailyTotals.protein)}g</div>
                    <div className="text-xs text-gray-500 ml-1">/ {macroGoals.protein}g</div>
                    <div className="ml-auto text-sm">
                      {Math.round((dailyTotals.protein / macroGoals.protein) * 100)}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(100, (dailyTotals.protein / macroGoals.protein) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="p-2 bg-white rounded">
                  <div className="text-sm">Carbs</div>
                  <div className="flex items-center">
                    <div className="font-bold">{Math.round(dailyTotals.carbs)}g</div>
                    <div className="text-xs text-gray-500 ml-1">/ {macroGoals.carbs}g</div>
                    <div className="ml-auto text-sm">
                      {Math.round((dailyTotals.carbs / macroGoals.carbs) * 100)}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(100, (dailyTotals.carbs / macroGoals.carbs) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="p-2 bg-white rounded">
                  <div className="text-sm">Fats</div>
                  <div className="flex items-center">
                    <div className="font-bold">{Math.round(dailyTotals.fats)}g</div>
                    <div className="text-xs text-gray-500 ml-1">/ {macroGoals.fats}g</div>
                    <div className="ml-auto text-sm">
                      {Math.round((dailyTotals.fats / macroGoals.fats) * 100)}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-yellow-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(100, (dailyTotals.fats / macroGoals.fats) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <FoodSelector onSelectFood={handleAddFood} />
        
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Log Meal</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Meal Time</label>
            <select
              className="w-full p-2 border rounded"
              value={mealTime}
              onChange={(e) => setMealTime(e.target.value)}
            >
              <option value="">Select meal time</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>
          
          <MealPhotoUploader onPhotoSelected={handlePhotoSelected} />
          
          {mealFoods.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Foods in this meal</label>
              <div className="border rounded p-2 bg-white">
                {mealFoods.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-100 rounded">
                    <div>
                      <div className="font-medium">{item.food.name}</div>
                      <div className="text-xs text-gray-500">
                        {Math.round(item.food.calories * item.quantity)} cal | 
                        P: {Math.round(item.food.protein * item.quantity)}g | 
                        C: {Math.round(item.food.carbs * item.quantity)}g | 
                        F: {Math.round(item.food.fats * item.quantity)}g
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.quantity} {item.quantity === 1 ? 'serving' : 'servings'} 
                        ({Math.round(item.food.servingSize * item.quantity)}g)
                      </div>
                    </div>
                    <button
                      className="text-red-600"
                      onClick={() => handleRemoveFood(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              className="w-full p-2 border rounded"
              rows={2}
              value={mealNotes}
              onChange={(e) => setMealNotes(e.target.value)}
              placeholder="Any notes about this meal?"
            ></textarea>
          </div>
          
          <button
            className={`w-full p-2 bg-red-600 text-white rounded font-medium ${(!mealTime || mealFoods.length === 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSaveMeal}
            disabled={!mealTime || mealFoods.length === 0}
          >
            Log Meal
          </button>
        </div>
      </div>
      
      {meals.length > 0 && (
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Today's Meals</h3>
          
          <div className="space-y-4">
            {meals.map((meal) => (
              <div key={meal.id} className="p-3 bg-white rounded shadow">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold capitalize">{meal.time}</h4>
                  <div className="text-sm text-gray-500">
                    {meal.foods.reduce((total, item) => total + (item.food.calories * item.quantity), 0)} calories
                  </div>
                </div>
                
                {meal.photoUrl && (
                  <img 
                    src={meal.photoUrl} 
                    alt={`${meal.time} meal`} 
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )}
                
                <div className="text-sm">
                  {meal.foods.map((item, index) => (
                    <div key={index} className="mb-1">
                      <span className="font-medium">{item.food.name}</span>
                      <span className="text-gray-500 ml-1">
                        ({item.quantity} {item.quantity === 1 ? 'serving' : 'servings'})
                      </span>
                    </div>
                  ))}
                </div>
                
                {meal.notes && (
                  <div className="mt-2 text-sm text-gray-600 italic">
                    "{meal.notes}"
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionTracker;
