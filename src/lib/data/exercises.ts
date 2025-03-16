import { Exercise, MuscleGroup } from '../types';

// Exercise library organized by muscle group
export const exercises: Exercise[] = [
  // Chest exercises
  {
    id: 'bench-press',
    name: 'Bench Press',
    muscleGroup: 'chest',
    description: 'Lie on a flat bench and press weight upward using a barbell or dumbbells.'
  },
  {
    id: 'push-ups',
    name: 'Push-Ups',
    muscleGroup: 'chest',
    description: 'A bodyweight exercise performed in a prone position, raising and lowering the body using the arms.'
  },
  {
    id: 'chest-flys',
    name: 'Chest Flys',
    muscleGroup: 'chest',
    description: 'Lie on a flat bench with a dumbbell in each hand, then open arms wide and bring them back together.'
  },
  
  // Back exercises
  {
    id: 'pull-ups',
    name: 'Pull-Ups',
    muscleGroup: 'back',
    description: 'Hang from a bar and pull your body upward until your chin is above the bar.'
  },
  {
    id: 'rows',
    name: 'Rows',
    muscleGroup: 'back',
    description: 'Pull weight toward your body while keeping your back straight, targeting the middle back.'
  },
  {
    id: 'deadlifts',
    name: 'Deadlifts',
    muscleGroup: 'back',
    description: 'Lift a loaded barbell from the ground to hip level, keeping your back straight.'
  },
  
  // Legs exercises
  {
    id: 'squats',
    name: 'Squats',
    muscleGroup: 'legs',
    description: 'Lower your body by bending your knees and hips, then return to standing position.'
  },
  {
    id: 'lunges',
    name: 'Lunges',
    muscleGroup: 'legs',
    description: 'Step forward with one leg, lowering your hips until both knees are bent at 90-degree angles.'
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    muscleGroup: 'legs',
    description: 'Push weight away from your body using your legs while seated in a leg press machine.'
  },
  
  // Shoulders exercises
  {
    id: 'overhead-press',
    name: 'Overhead Press',
    muscleGroup: 'shoulders',
    description: 'Press weight upward from shoulder height until arms are fully extended overhead.'
  },
  {
    id: 'lateral-raises',
    name: 'Lateral Raises',
    muscleGroup: 'shoulders',
    description: 'Raise weights out to the sides until arms are parallel to the floor, targeting the lateral deltoids.'
  },
  
  // Arms exercises
  {
    id: 'bicep-curls',
    name: 'Bicep Curls',
    muscleGroup: 'arms',
    description: 'Curl weight toward your shoulders by bending at the elbow, targeting the biceps.'
  },
  {
    id: 'tricep-dips',
    name: 'Tricep Dips',
    muscleGroup: 'arms',
    description: 'Lower and raise your body using your arms while supporting yourself on parallel bars or a bench.'
  },
  
  // Core exercises
  {
    id: 'planks',
    name: 'Planks',
    muscleGroup: 'core',
    description: 'Hold a position similar to a push-up, maintaining a straight line from head to heels.'
  },
  {
    id: 'leg-raises',
    name: 'Leg Raises',
    muscleGroup: 'core',
    description: 'Lie on your back and raise your legs toward the ceiling, targeting the lower abdominals.'
  }
];

// Helper function to get exercises by muscle group
export const getExercisesByMuscleGroup = (muscleGroup: MuscleGroup): Exercise[] => {
  return exercises.filter(exercise => exercise.muscleGroup === muscleGroup);
};

// Helper function to get exercise by ID
export const getExerciseById = (id: string): Exercise | undefined => {
  return exercises.find(exercise => exercise.id === id);
};
