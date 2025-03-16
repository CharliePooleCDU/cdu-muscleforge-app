'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import WorkoutLogger from '@/components/workout/WorkoutLogger';
import NutritionTracker from '@/components/nutrition/NutritionTracker';
import DieselPointsSystem from '@/components/gamification/DieselPointsSystem';
import QuizBot from '@/components/quiz/QuizBot';
import CommunityIntegration from '@/components/community/CommunityIntegration';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const renderContent = () => {
    switch (activeTab) {
      case 'workout':
        return <WorkoutLogger />;
      case 'nutrition':
        return <NutritionTracker />;
      case 'points':
        return <DieselPointsSystem />;
      case 'quiz':
        return <QuizBot />;
      case 'community':
        return <CommunityIntegration />;
      default:
        return (
          <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            
            <div className="p-4 bg-red-600 text-white rounded-lg mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-1">Welcome to CDU MuscleForge!</h3>
                  <p className="text-sm opacity-90">Track your workouts, log your nutrition, and earn Diesel Points</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">175</div>
                  <div className="text-sm opacity-90">Diesel Points</div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="w-full bg-white bg-opacity-20 rounded-full h-4 mb-1">
                  <div 
                    className="bg-white h-4 rounded-full" 
                    style={{ width: '35%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs">
                  <div>Rookie</div>
                  <div>Trainee</div>
                  <div>Master</div>
                  <div>Legend</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Recent Workouts</h3>
                
                <div className="space-y-2">
                  <div className="p-3 bg-white rounded shadow">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">Push Day</div>
                      <div className="text-sm text-gray-500">Today</div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Bench Press, Push-Ups, Overhead Press
                    </div>
                  </div>
                  
                  <div className="p-3 bg-white rounded shadow">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">Pull Day</div>
                      <div className="text-sm text-gray-500">Yesterday</div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Pull-Ups, Rows, Bicep Curls
                    </div>
                  </div>
                  
                  <div className="p-3 bg-white rounded shadow">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">Leg Day</div>
                      <div className="text-sm text-gray-500">2 days ago</div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Squats, Lunges, Leg Press
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setActiveTab('workout')}
                  className="w-full p-2 bg-red-600 text-white rounded font-medium mt-4"
                >
                  Log Workout
                </button>
              </div>
              
              <div className="p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Nutrition Today</h3>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="p-2 bg-white rounded text-center">
                    <div className="text-sm text-gray-500">Calories</div>
                    <div className="text-xl font-bold">1,850</div>
                    <div className="text-xs text-gray-500">/ 2,400</div>
                  </div>
                  
                  <div className="p-2 bg-white rounded text-center">
                    <div className="text-sm text-gray-500">Protein</div>
                    <div className="text-xl font-bold">145g</div>
                    <div className="text-xs text-gray-500">/ 180g</div>
                  </div>
                  
                  <div className="p-2 bg-white rounded text-center">
                    <div className="text-sm text-gray-500">Carbs</div>
                    <div className="text-xl font-bold">210g</div>
                    <div className="text-xs text-gray-500">/ 260g</div>
                  </div>
                  
                  <div className="p-2 bg-white rounded text-center">
                    <div className="text-sm text-gray-500">Fats</div>
                    <div className="text-xl font-bold">55g</div>
                    <div className="text-xs text-gray-500">/ 70g</div>
                  </div>
                </div>
                
                <button
                  onClick={() => setActiveTab('nutrition')}
                  className="w-full p-2 bg-red-600 text-white rounded font-medium"
                >
                  Log Meal
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Daily Quiz</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Test your fitness knowledge and earn Diesel Points!
                </p>
                <button
                  onClick={() => setActiveTab('quiz')}
                  className="w-full p-2 bg-red-600 text-white rounded font-medium"
                >
                  Take Quiz
                </button>
              </div>
              
              <div className="p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Leaderboard</h3>
                <div className="text-sm text-gray-600 mb-2">
                  You're currently #2 on the weekly leaderboard!
                </div>
                <button
                  onClick={() => setActiveTab('points')}
                  className="w-full p-2 bg-red-600 text-white rounded font-medium"
                >
                  View Leaderboard
                </button>
              </div>
              
              <div className="p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Community</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Connect with Discord and Skool to share your progress.
                </p>
                <button
                  onClick={() => setActiveTab('community')}
                  className="w-full p-2 bg-red-600 text-white rounded font-medium"
                >
                  Community Settings
                </button>
              </div>
            </div>
            
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Fitness Tip of the Day</h3>
              <div className="p-3 bg-white rounded shadow">
                <p className="text-gray-600">
                  <span className="font-medium">Rest between muscle groups:</span> It's generally recommended to wait 48-72 hours before training the same muscle group again to allow for proper recovery and growth.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-red-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-xl font-bold">
                  CDU MuscleForge
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-800">
                  175 Points
                </span>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <div className="w-8 h-8 rounded-full bg-red-800 flex items-center justify-center">
                  CD
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-12 overflow-x-auto">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  activeTab === 'dashboard' 
                    ? 'border-red-600 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('workout')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  activeTab === 'workout' 
                    ? 'border-red-600 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Workout
              </button>
              <button
                onClick={() => setActiveTab('nutrition')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  activeTab === 'nutrition' 
                    ? 'border-red-600 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Nutrition
              </button>
              <button
                onClick={() => setActiveTab('points')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  activeTab === 'points' 
                    ? 'border-red-600 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Diesel Points
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  activeTab === 'quiz' 
                    ? 'border-red-600 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Quiz
              </button>
              <button
                onClick={() => setActiveTab('community')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  activeTab === 'community' 
                    ? 'border-red-600 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Community
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-6">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              &copy; 2025 Cock Diesel University. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
