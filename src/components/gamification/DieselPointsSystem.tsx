'use client';

import React, { useState } from 'react';
import { DieselPointsTransaction } from '@/lib/types';

// UI Components
const DieselPointsDisplay = ({ 
  points 
}: { 
  points: number 
}) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-4">
      <h3 className="text-lg font-bold mb-2">Diesel Points</h3>
      
      <div className="flex items-center">
        <div className="text-3xl font-bold text-red-600">{points}</div>
        <div className="ml-2 text-gray-500">points</div>
      </div>
      
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-red-600 h-4 rounded-full" 
            style={{ width: `${Math.min(100, (points / 500) * 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs mt-1">
          <div>0</div>
          <div>100</div>
          <div>250</div>
          <div>500</div>
        </div>
      </div>
      
      <div className="mt-2 text-sm">
        <div className="font-medium">Current Perks:</div>
        {points >= 500 ? (
          <div className="text-green-600">20% off CDU Merch!</div>
        ) : points >= 250 ? (
          <div className="text-green-600">10% off CDU Merch!</div>
        ) : points >= 100 ? (
          <div className="text-green-600">5% off CDU Merch!</div>
        ) : (
          <div className="text-gray-500">Earn 100 points for your first perk!</div>
        )}
      </div>
    </div>
  );
};

const DieselMeter = ({ 
  points,
  streakDays
}: { 
  points: number;
  streakDays: number;
}) => {
  return (
    <div className="p-4 bg-red-600 text-white rounded-lg mb-4">
      <h3 className="text-lg font-bold mb-2">Diesel Meter</h3>
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-4xl font-bold">{points}</div>
          <div className="text-sm opacity-80">Total Points</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold">{streakDays}</div>
          <div className="text-sm opacity-80">Day Streak</div>
        </div>
        
        <div className="text-right">
          <div className="text-xl font-bold">
            {points >= 500 ? 'Diesel Legend' : 
             points >= 250 ? 'Diesel Master' : 
             points >= 100 ? 'Diesel Trainee' : 'Diesel Rookie'}
          </div>
          <div className="text-sm opacity-80">Current Rank</div>
        </div>
      </div>
      
      <div className="w-full bg-white bg-opacity-20 rounded-full h-6 mb-1">
        <div 
          className="bg-white h-6 rounded-full" 
          style={{ width: `${Math.min(100, (points / 500) * 100)}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-xs">
        <div>Rookie</div>
        <div>Trainee</div>
        <div>Master</div>
        <div>Legend</div>
      </div>
    </div>
  );
};

const PointsHistory = ({ 
  transactions 
}: { 
  transactions: DieselPointsTransaction[] 
}) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-4">
      <h3 className="text-lg font-bold mb-2">Points History</h3>
      
      <div className="max-h-80 overflow-y-auto">
        {transactions.length > 0 ? (
          <div className="space-y-2">
            {transactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="p-3 bg-white rounded shadow flex justify-between items-center"
              >
                <div>
                  <div className="font-medium">{transaction.description}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(transaction.timestamp).toLocaleString()} • 
                    <span className="ml-1 capitalize">{transaction.category}</span>
                  </div>
                </div>
                <div className={`font-bold ${transaction.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.points > 0 ? '+' : ''}{transaction.points}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 p-4">
            No points transactions yet. Start logging workouts and meals to earn points!
          </div>
        )}
      </div>
    </div>
  );
};

const Leaderboard = ({ 
  users 
}: { 
  users: Array<{ id: string; name: string; points: number }> 
}) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-4">
      <h3 className="text-lg font-bold mb-2">Leaderboard</h3>
      
      <div className="space-y-2">
        {users.map((user, index) => (
          <div 
            key={user.id} 
            className={`p-3 rounded shadow flex justify-between items-center ${
              index === 0 ? 'bg-yellow-100' : 
              index === 1 ? 'bg-gray-200' : 
              index === 2 ? 'bg-amber-100' : 
              'bg-white'
            }`}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 text-white font-bold mr-3">
                {index + 1}
              </div>
              <div className="font-medium">{user.name}</div>
            </div>
            <div className="font-bold">{user.points} pts</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DieselPointsSystem = () => {
  // Mock data for demonstration
  const [userPoints, setUserPoints] = useState(175);
  const [streakDays, setStreakDays] = useState(5);
  
  const [pointsTransactions, setPointsTransactions] = useState<DieselPointsTransaction[]>([
    {
      id: 'tx1',
      userId: 'user1',
      points: 20,
      category: 'workout',
      description: 'Completed full workout',
      timestamp: '2025-03-13T10:30:00Z'
    },
    {
      id: 'tx2',
      userId: 'user1',
      points: 10,
      category: 'nutrition',
      description: 'Logged meal with photo',
      timestamp: '2025-03-13T13:15:00Z'
    },
    {
      id: 'tx3',
      userId: 'user1',
      points: 5,
      category: 'nutrition',
      description: 'Hit protein goal',
      timestamp: '2025-03-13T20:00:00Z'
    },
    {
      id: 'tx4',
      userId: 'user1',
      points: 15,
      category: 'quiz',
      description: 'Answered 3 quiz questions correctly',
      timestamp: '2025-03-12T16:45:00Z'
    },
    {
      id: 'tx5',
      userId: 'user1',
      points: 5,
      category: 'community',
      description: 'Posted in #diesel-draft',
      timestamp: '2025-03-12T18:20:00Z'
    },
    {
      id: 'tx6',
      userId: 'user1',
      points: 20,
      category: 'consistency',
      description: 'Maintained 5-day streak',
      timestamp: '2025-03-13T23:00:00Z'
    }
  ]);
  
  const leaderboardUsers = [
    { id: 'user2', name: 'Charlie', points: 350 },
    { id: 'user1', name: 'You', points: 175 },
    { id: 'user3', name: 'Alex', points: 220 },
    { id: 'user4', name: 'Jordan', points: 165 },
    { id: 'user5', name: 'Taylor', points: 140 },
    { id: 'user6', name: 'Morgan', points: 120 },
    { id: 'user7', name: 'Casey', points: 95 }
  ].sort((a, b) => b.points - a.points);
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Diesel Points</h2>
      
      <DieselMeter points={userPoints} streakDays={streakDays} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <DieselPointsDisplay points={userPoints} />
          
          <div className="p-4 bg-gray-100 rounded-lg mb-4">
            <h3 className="text-lg font-bold mb-2">How to Earn Points</h3>
            
            <div className="space-y-2">
              <div className="p-2 bg-white rounded">
                <div className="font-medium">Workouts</div>
                <div className="text-sm text-gray-600">
                  • 20 points per full workout<br />
                  • 5 bonus points for hitting goal reps<br />
                  • 10 points for logging custom exercises
                </div>
              </div>
              
              <div className="p-2 bg-white rounded">
                <div className="font-medium">Nutrition</div>
                <div className="text-sm text-gray-600">
                  • 10 points per meal with photo<br />
                  • 5 points for hitting protein goal<br />
                  • 5 points for logging 4+ meals per day
                </div>
              </div>
              
              <div className="p-2 bg-white rounded">
                <div className="font-medium">Quizzes</div>
                <div className="text-sm text-gray-600">
                  • 5 points per correct answer<br />
                  • 10 bonus points for 5 correct in a row
                </div>
              </div>
              
              <div className="p-2 bg-white rounded">
                <div className="font-medium">Community</div>
                <div className="text-sm text-gray-600">
                  • 5 points per post in #diesel-draft<br />
                  • 10 points for helping in #workout-help
                </div>
              </div>
              
              <div className="p-2 bg-white rounded">
                <div className="font-medium">Consistency</div>
                <div className="text-sm text-gray-600">
                  • 20 bonus points for 7-day streak
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <Leaderboard users={leaderboardUsers} />
          <PointsHistory transactions={pointsTransactions} />
        </div>
      </div>
      
      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-bold mb-2">Perks & Rewards</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-white rounded shadow">
            <div className="text-xl font-bold mb-1">100 Points</div>
            <div className="text-sm mb-2">Diesel Trainee</div>
            <div className="text-sm text-gray-600">
              • 5% off CDU Merch<br />
              • Unlock Diesel Trainee role on Discord
            </div>
          </div>
          
          <div className="p-3 bg-white rounded shadow">
            <div className="text-xl font-bold mb-1">250 Points</div>
            <div className="text-sm mb-2">Diesel Master</div>
            <div className="text-sm text-gray-600">
              • 10% off CDU Merch<br />
              • Unlock Diesel Master role on Discord<br />
              • Priority access to monthly challenges
            </div>
          </div>
          
          <div className="p-3 bg-white rounded shadow">
            <div className="text-xl font-bold mb-1">500 Points</div>
            <div className="text-sm mb-2">Diesel Legend</div>
            <div className="text-sm text-gray-600">
              • 20% off CDU Merch<br />
              • Unlock Diesel Legend role on Discord<br />
              • Eligible for monthly Diesel Legend prize
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-500 text-center">
          Points sync to Skool for monthly frat challenges. Top 3 members each month get the exclusive Diesel Legend role!
        </div>
      </div>
    </div>
  );
};

export default DieselPointsSystem;
