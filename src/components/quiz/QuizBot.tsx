'use client';

import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '@/lib/types';

// Sample quiz questions
const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is the optimal rep range for hypertrophy (muscle building)?',
    options: ['1-5 reps', '8-12 reps', '15-20 reps', '25+ reps'],
    correctOptionIndex: 1,
    explanation: 'The 8-12 rep range is generally considered optimal for hypertrophy, balancing mechanical tension and metabolic stress.'
  },
  {
    id: 'q2',
    question: 'How much protein per pound of bodyweight is recommended for muscle growth?',
    options: ['0.5g per lb', '1g per lb', '2g per lb', '3g per lb'],
    correctOptionIndex: 1,
    explanation: 'About 1g of protein per pound of bodyweight is the general recommendation for supporting muscle growth.'
  },
  {
    id: 'q3',
    question: 'What does RPE stand for in workout tracking?',
    options: ['Reps Per Exercise', 'Rate of Perceived Exertion', 'Resistance Program Efficiency', 'Recovery Period Extension'],
    correctOptionIndex: 1,
    explanation: 'RPE (Rate of Perceived Exertion) is a scale from 1-10 that measures how difficult an exercise feels.'
  },
  {
    id: 'q4',
    question: 'Which of these is NOT a primary macronutrient?',
    options: ['Protein', 'Carbohydrates', 'Fats', 'Fiber'],
    correctOptionIndex: 3,
    explanation: 'The three primary macronutrients are protein, carbohydrates, and fats. Fiber is a type of carbohydrate.'
  },
  {
    id: 'q5',
    question: 'What is TDEE?',
    options: ['Total Daily Energy Expenditure', 'Training Duration and Exercise Efficiency', 'Targeted Diet and Exercise Evaluation', 'Total Dietary Effect Estimation'],
    correctOptionIndex: 0,
    explanation: 'TDEE (Total Daily Energy Expenditure) is the total number of calories you burn in a day.'
  },
  {
    id: 'q6',
    question: 'Which exercise primarily targets the chest muscles?',
    options: ['Deadlifts', 'Squats', 'Bench Press', 'Pull-ups'],
    correctOptionIndex: 2,
    explanation: 'Bench Press is a compound exercise that primarily targets the chest (pectoral) muscles.'
  },
  {
    id: 'q7',
    question: 'What is progressive overload?',
    options: ['Gradually increasing workout intensity over time', 'Doing more reps with lighter weights', 'Training to failure every session', 'Switching exercises frequently'],
    correctOptionIndex: 0,
    explanation: 'Progressive overload is the gradual increase of stress placed on the body during exercise training to stimulate muscle growth.'
  },
  {
    id: 'q8',
    question: 'Muscle Mario\'s favorite protein source is:',
    options: ['Chicken Breast', 'Whey Protein', 'Cardio Bunnies', 'Mushroom Kingdom Tofu'],
    correctOptionIndex: 2,
    explanation: 'Trick question! Muscle Mario loves to flex on cardio bunnies for his gains. (This is just for fun!)'
  },
  {
    id: 'q9',
    question: 'How long should you rest between sets for strength training?',
    options: ['30 seconds', '1-2 minutes', '3-5 minutes', 'No rest, supersets only'],
    correctOptionIndex: 2,
    explanation: 'For strength training (heavy weights, low reps), 3-5 minutes of rest between sets is optimal for recovery.'
  },
  {
    id: 'q10',
    question: 'What is the recommended rest time between training the same muscle group?',
    options: ['24 hours', '48-72 hours', '1 week', 'No rest needed'],
    correctOptionIndex: 1,
    explanation: 'It\'s generally recommended to wait 48-72 hours before training the same muscle group again to allow for recovery.'
  }
];

// UI Components
const QuizCard = ({
  question,
  onAnswer
}: {
  question: QuizQuestion;
  onAnswer: (isCorrect: boolean) => void;
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  
  const handleOptionSelect = (index: number) => {
    if (hasAnswered) return;
    
    setSelectedOption(index);
  };
  
  const handleSubmit = () => {
    if (selectedOption === null || hasAnswered) return;
    
    setHasAnswered(true);
    const isCorrect = selectedOption === question.correctOptionIndex;
    onAnswer(isCorrect);
  };
  
  const getOptionClass = (index: number) => {
    if (!hasAnswered) {
      return selectedOption === index 
        ? 'bg-red-100 border-red-600' 
        : 'bg-white hover:bg-gray-100';
    }
    
    if (index === question.correctOptionIndex) {
      return 'bg-green-100 border-green-600';
    }
    
    if (selectedOption === index) {
      return 'bg-red-100 border-red-600';
    }
    
    return 'bg-white opacity-70';
  };
  
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4">{question.question}</h3>
      
      <div className="space-y-2 mb-4">
        {question.options.map((option, index) => (
          <div 
            key={index}
            className={`p-3 border rounded cursor-pointer transition-colors ${getOptionClass(index)}`}
            onClick={() => handleOptionSelect(index)}
          >
            <div className="flex items-center">
              <div className="w-6 h-6 flex items-center justify-center rounded-full border mr-2">
                {String.fromCharCode(65 + index)}
              </div>
              <div>{option}</div>
            </div>
          </div>
        ))}
      </div>
      
      {hasAnswered ? (
        <div className="p-3 bg-gray-100 rounded mb-4">
          <div className="font-medium mb-1">
            {selectedOption === question.correctOptionIndex 
              ? '✅ Correct!' 
              : '❌ Incorrect!'}
          </div>
          <div className="text-sm">{question.explanation}</div>
        </div>
      ) : (
        <button
          className={`w-full p-2 bg-red-600 text-white rounded font-medium ${
            selectedOption === null ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleSubmit}
          disabled={selectedOption === null}
        >
          Submit Answer
        </button>
      )}
    </div>
  );
};

const StreakCounter = ({
  streak
}: {
  streak: number;
}) => {
  return (
    <div className="flex items-center justify-center p-3 bg-gray-100 rounded-lg mb-4">
      <div className="text-center">
        <div className="text-sm text-gray-500">Current Streak</div>
        <div className="text-2xl font-bold">{streak}</div>
      </div>
      <div className="ml-4 flex">
        {[...Array(5)].map((_, index) => (
          <div 
            key={index}
            className={`w-6 h-6 mx-1 rounded-full ${
              index < streak ? 'bg-red-600' : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
      <div className="ml-4 text-sm text-gray-500">
        {streak >= 5 ? (
          <span className="text-green-600 font-medium">Bonus: +10 points!</span>
        ) : (
          <span>Get 5 in a row for bonus!</span>
        )}
      </div>
    </div>
  );
};

const QuizBot = () => {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  // Get a random question that hasn't been answered yet
  const getRandomQuestion = () => {
    const unansweredQuestions = quizQuestions.filter(
      q => !answeredQuestions.includes(q.id)
    );
    
    if (unansweredQuestions.length === 0) {
      // All questions have been answered
      setShowResults(true);
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * unansweredQuestions.length);
    return unansweredQuestions[randomIndex];
  };
  
  // Initialize with a random question
  useEffect(() => {
    setCurrentQuestion(getRandomQuestion());
  }, []);
  
  const handleAnswer = (isCorrect: boolean) => {
    if (!currentQuestion) return;
    
    // Update answered questions
    setAnsweredQuestions([...answeredQuestions, currentQuestion.id]);
    
    if (isCorrect) {
      // Award points for correct answer
      const newStreak = streak + 1;
      setStreak(newStreak);
      
      // Base points for correct answer
      let pointsEarned = 5;
      
      // Bonus for 5 in a row
      if (newStreak === 5) {
        pointsEarned += 10;
      }
      
      setPoints(points + pointsEarned);
      
      // Show notification
      // In a real app, this would be a toast notification
      console.log(`+${pointsEarned} Diesel Points earned!`);
    } else {
      // Reset streak on wrong answer
      setStreak(0);
    }
    
    // Wait 2 seconds before showing next question
    setTimeout(() => {
      setCurrentQuestion(getRandomQuestion());
    }, 2000);
  };
  
  const handleReset = () => {
    setAnsweredQuestions([]);
    setShowResults(false);
    setCurrentQuestion(getRandomQuestion());
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Diesel Quiz Bot</h2>
      
      <div className="p-4 bg-gray-100 rounded-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold">Daily Quiz Challenge</h3>
            <div className="text-sm text-gray-500">
              Test your fitness knowledge and earn Diesel Points!
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Points Earned</div>
            <div className="text-2xl font-bold text-red-600">{points}</div>
          </div>
        </div>
        
        {streak > 0 && <StreakCounter streak={streak} />}
        
        {showResults ? (
          <div className="text-center p-6">
            <div className="text-xl font-bold mb-2">Quiz Complete!</div>
            <div className="text-gray-600 mb-4">
              You've answered all available questions and earned {points} Diesel Points.
            </div>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded font-medium"
              onClick={handleReset}
            >
              Start Over
            </button>
          </div>
        ) : currentQuestion ? (
          <QuizCard 
            question={currentQuestion} 
            onAnswer={handleAnswer} 
          />
        ) : (
          <div className="text-center p-6">
            <div className="text-xl font-bold">Loading question...</div>
          </div>
        )}
      </div>
      
      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-bold mb-2">Quiz Rules</h3>
        
        <div className="space-y-2">
          <div className="p-2 bg-white rounded">
            <div className="font-medium">Points System</div>
            <div className="text-sm text-gray-600">
              • 5 points for each correct answer<br />
              • 10 bonus points for getting 5 correct answers in a row<br />
              • Streak resets if you answer incorrectly
            </div>
          </div>
          
          <div className="p-2 bg-white rounded">
            <div className="font-medium">Daily Challenges</div>
            <div className="text-sm text-gray-600">
              • New questions available daily<br />
              • Test your knowledge on workout techniques, nutrition, and fitness facts<br />
              • Some questions include Muscle Mario humor!
            </div>
          </div>
          
          <div className="p-2 bg-white rounded">
            <div className="font-medium">Educational Value</div>
            <div className="text-sm text-gray-600">
              • Each question includes an explanation to help you learn<br />
              • Topics cover all aspects of the CDU fitness philosophy<br />
              • Apply what you learn to your workouts and nutrition
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizBot;
