'use client';

import React, { useState } from 'react';
import { Exercise, MuscleGroup, WorkoutGoal, WorkoutSplit, Set } from '@/lib/types';
import { exercises, getExercisesByMuscleGroup } from '@/lib/data/exercises';

// UI Components
const ExerciseSelector = ({ 
  onSelectExercise 
}: { 
  onSelectExercise: (exercise: Exercise) => void 
}) => {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<MuscleGroup | 'all'>('all');
  const [customExerciseName, setCustomExerciseName] = useState('');
  const [customMuscleGroup, setCustomMuscleGroup] = useState<MuscleGroup>('chest');

  const muscleGroups: MuscleGroup[] = ['chest', 'back', 'legs', 'shoulders', 'arms', 'core'];
  
  const filteredExercises = selectedMuscleGroup === 'all' 
    ? exercises 
    : getExercisesByMuscleGroup(selectedMuscleGroup);

  const handleAddCustomExercise = () => {
    if (customExerciseName.trim()) {
      const customExercise: Exercise = {
        id: `custom-${Date.now()}`,
        name: customExerciseName,
        muscleGroup: customMuscleGroup,
        isCustom: true
      };
      onSelectExercise(customExercise);
      setCustomExerciseName('');
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Select Exercise</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Muscle Group</label>
        <select 
          className="w-full p-2 border rounded"
          value={selectedMuscleGroup}
          onChange={(e) => setSelectedMuscleGroup(e.target.value as MuscleGroup | 'all')}
        >
          <option value="all">All Muscle Groups</option>
          {muscleGroups.map(group => (
            <option key={group} value={group}>
              {group.charAt(0).toUpperCase() + group.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Exercise Library</label>
        <div className="max-h-60 overflow-y-auto border rounded p-2 bg-white">
          {filteredExercises.map(exercise => (
            <div 
              key={exercise.id}
              className="p-2 hover:bg-gray-200 cursor-pointer rounded"
              onClick={() => onSelectExercise(exercise)}
            >
              {exercise.name}
              <span className="text-xs text-gray-500 ml-2">
                ({exercise.muscleGroup})
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium mb-2">Add Custom Exercise</h4>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Exercise name"
            className="flex-1 p-2 border rounded"
            value={customExerciseName}
            onChange={(e) => setCustomExerciseName(e.target.value)}
          />
          <select
            className="p-2 border rounded"
            value={customMuscleGroup}
            onChange={(e) => setCustomMuscleGroup(e.target.value as MuscleGroup)}
          >
            {muscleGroups.map(group => (
              <option key={group} value={group}>
                {group.charAt(0).toUpperCase() + group.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <button
          className="w-full p-2 bg-red-600 text-white rounded font-medium"
          onClick={handleAddCustomExercise}
        >
          Add Custom Exercise
        </button>
      </div>
    </div>
  );
};

const SetInput = ({ 
  set, 
  index, 
  onChange, 
  onRemove 
}: { 
  set: Set; 
  index: number; 
  onChange: (index: number, set: Set) => void; 
  onRemove: (index: number) => void;
}) => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="w-8 text-center font-medium">{index + 1}</div>
      <input
        type="number"
        placeholder="Reps"
        className="flex-1 p-2 border rounded"
        value={set.reps || ''}
        onChange={(e) => onChange(index, { ...set, reps: parseInt(e.target.value) || 0 })}
      />
      <input
        type="number"
        placeholder="Weight"
        className="flex-1 p-2 border rounded"
        value={set.weight || ''}
        onChange={(e) => onChange(index, { ...set, weight: parseFloat(e.target.value) || 0 })}
      />
      <select
        className="flex-1 p-2 border rounded"
        value={set.rpe}
        onChange={(e) => onChange(index, { ...set, rpe: parseInt(e.target.value) })}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rpe => (
          <option key={rpe} value={rpe}>RPE {rpe}</option>
        ))}
      </select>
      <button
        className="p-2 text-red-600"
        onClick={() => onRemove(index)}
      >
        ✕
      </button>
    </div>
  );
};

const WorkoutSetup = ({
  onComplete
}: {
  onComplete: (setup: {
    daysPerWeek: number;
    goal: WorkoutGoal;
    split: WorkoutSplit;
  }) => void;
}) => {
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [goal, setGoal] = useState<WorkoutGoal>('hypertrophy');
  const [split, setSplit] = useState<WorkoutSplit>('push-pull-legs');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({ daysPerWeek, goal, split });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Workout Setup</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Days per Week</label>
        <select
          className="w-full p-2 border rounded"
          value={daysPerWeek}
          onChange={(e) => setDaysPerWeek(parseInt(e.target.value))}
        >
          {[3, 4, 5, 6].map(days => (
            <option key={days} value={days}>{days} days</option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Training Goal</label>
        <select
          className="w-full p-2 border rounded"
          value={goal}
          onChange={(e) => setGoal(e.target.value as WorkoutGoal)}
        >
          <option value="hypertrophy">Hypertrophy (3-5 sets of 8-12 reps)</option>
          <option value="strength">Strength (3-5 sets of 1-5 reps)</option>
          <option value="endurance">Endurance (2-3 sets of 15-20 reps)</option>
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Workout Split</label>
        <select
          className="w-full p-2 border rounded"
          value={split}
          onChange={(e) => setSplit(e.target.value as WorkoutSplit)}
        >
          <option value="push-pull-legs">Push-Pull-Legs</option>
          <option value="full-body">Full Body</option>
          <option value="upper-lower">Upper-Lower</option>
          <option value="custom">Custom</option>
        </select>
      </div>
      
      <button
        type="submit"
        className="w-full p-2 bg-red-600 text-white rounded font-medium"
      >
        Save Workout Plan
      </button>
    </form>
  );
};

const WorkoutLogger = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [sets, setSets] = useState<Set[]>([{ reps: 0, weight: 0, rpe: 7 }]);
  const [workoutNotes, setWorkoutNotes] = useState('');
  const [workoutLogs, setWorkoutLogs] = useState<Array<{
    exercise: Exercise;
    sets: Set[];
  }>>([]);

  const handleSelectExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    // Reset sets when selecting a new exercise
    setSets([{ reps: 0, weight: 0, rpe: 7 }]);
  };

  const handleSetChange = (index: number, updatedSet: Set) => {
    const newSets = [...sets];
    newSets[index] = updatedSet;
    setSets(newSets);
  };

  const handleRemoveSet = (index: number) => {
    if (sets.length > 1) {
      const newSets = sets.filter((_, i) => i !== index);
      setSets(newSets);
    }
  };

  const handleAddSet = () => {
    // Copy the last set as a template for the new set
    const lastSet = sets[sets.length - 1];
    setSets([...sets, { ...lastSet }]);
  };

  const handleLogExercise = () => {
    if (selectedExercise && sets.length > 0) {
      setWorkoutLogs([
        ...workoutLogs,
        {
          exercise: selectedExercise,
          sets: [...sets]
        }
      ]);
      
      // Reset for next exercise
      setSelectedExercise(null);
      setSets([{ reps: 0, weight: 0, rpe: 7 }]);
    }
  };

  const handleSaveWorkout = () => {
    // In a real app, this would save to Firebase
    console.log('Saving workout:', {
      date: new Date().toISOString().split('T')[0],
      exercises: workoutLogs.map(log => ({
        exerciseId: log.exercise.id,
        exerciseName: log.exercise.name,
        sets: log.sets
      })),
      notes: workoutNotes,
      completed: true
    });
    
    // Reset the form
    setWorkoutLogs([]);
    setWorkoutNotes('');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Workout Logger</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <ExerciseSelector onSelectExercise={handleSelectExercise} />
        
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-bold mb-2">
            {selectedExercise ? `Log Sets: ${selectedExercise.name}` : 'Select an exercise'}
          </h3>
          
          {selectedExercise && (
            <>
              <div className="mb-4">
                <div className="flex font-medium mb-1">
                  <div className="w-8 text-center">#</div>
                  <div className="flex-1 text-center">Reps</div>
                  <div className="flex-1 text-center">Weight</div>
                  <div className="flex-1 text-center">RPE</div>
                  <div className="w-8"></div>
                </div>
                
                {sets.map((set, index) => (
                  <SetInput
                    key={index}
                    set={set}
                    index={index}
                    onChange={handleSetChange}
                    onRemove={handleRemoveSet}
                  />
                ))}
                
                <button
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                  onClick={handleAddSet}
                >
                  + Add Set
                </button>
              </div>
              
              <button
                className="w-full p-2 bg-red-600 text-white rounded font-medium"
                onClick={handleLogExercise}
              >
                Log Exercise
              </button>
            </>
          )}
        </div>
      </div>
      
      {workoutLogs.length > 0 && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Workout Summary</h3>
          
          <div className="mb-4">
            {workoutLogs.map((log, index) => (
              <div key={index} className="mb-4 p-3 bg-white rounded shadow">
                <h4 className="font-medium">{log.exercise.name}</h4>
                <div className="text-sm text-gray-500 mb-2">
                  {log.exercise.muscleGroup} {log.exercise.isCustom ? '(custom)' : ''}
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-sm">
                  {log.sets.map((set, setIndex) => (
                    <div key={setIndex} className="p-1 bg-gray-100 rounded">
                      Set {setIndex + 1}: {set.reps} reps × {set.weight} lbs (RPE {set.rpe})
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Workout Notes</label>
            <textarea
              className="w-full p-2 border rounded"
              rows={3}
              value={workoutNotes}
              onChange={(e) => setWorkoutNotes(e.target.value)}
              placeholder="How was your workout? Any PRs or challenges?"
            ></textarea>
          </div>
          
          <button
            className="w-full p-2 bg-red-600 text-white rounded font-medium"
            onClick={handleSaveWorkout}
          >
            Save Workout
          </button>
        </div>
      )}
      
      <WorkoutSetup
        onComplete={(setup) => {
          // In a real app, this would save to Firebase
          console.log('Workout setup:', setup);
        }}
      />
    </div>
  );
};

export default WorkoutLogger;
