// Firebase service for workout-related operations
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
import { Exercise, WorkoutLog, WorkoutPlan, Set } from '../types';

// Collection references
const workoutLogsCollection = 'workoutLogs';
const workoutPlansCollection = 'workoutPlans';

// Workout Logs
export const createWorkoutLog = async (workoutLog: Omit<WorkoutLog, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, workoutLogsCollection), workoutLog);
    return docRef.id;
  } catch (error) {
    console.error('Error creating workout log:', error);
    throw error;
  }
};

export const getWorkoutLogById = async (id: string): Promise<WorkoutLog | null> => {
  try {
    const docRef = doc(db, workoutLogsCollection, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as WorkoutLog;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting workout log:', error);
    throw error;
  }
};

export const getUserWorkoutLogs = async (userId: string): Promise<WorkoutLog[]> => {
  try {
    const q = query(
      collection(db, workoutLogsCollection),
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as WorkoutLog);
  } catch (error) {
    console.error('Error getting user workout logs:', error);
    throw error;
  }
};

export const updateWorkoutLog = async (id: string, updates: Partial<WorkoutLog>): Promise<void> => {
  try {
    const docRef = doc(db, workoutLogsCollection, id);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error('Error updating workout log:', error);
    throw error;
  }
};

export const deleteWorkoutLog = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, workoutLogsCollection, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting workout log:', error);
    throw error;
  }
};

// Workout Plans
export const createWorkoutPlan = async (workoutPlan: Omit<WorkoutPlan, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, workoutPlansCollection), workoutPlan);
    return docRef.id;
  } catch (error) {
    console.error('Error creating workout plan:', error);
    throw error;
  }
};

export const getWorkoutPlanById = async (id: string): Promise<WorkoutPlan | null> => {
  try {
    const docRef = doc(db, workoutPlansCollection, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as WorkoutPlan;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting workout plan:', error);
    throw error;
  }
};

export const getUserWorkoutPlan = async (userId: string): Promise<WorkoutPlan | null> => {
  try {
    const q = query(
      collection(db, workoutPlansCollection),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as WorkoutPlan;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user workout plan:', error);
    throw error;
  }
};

export const updateWorkoutPlan = async (id: string, updates: Partial<WorkoutPlan>): Promise<void> => {
  try {
    const docRef = doc(db, workoutPlansCollection, id);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error('Error updating workout plan:', error);
    throw error;
  }
};

export const deleteWorkoutPlan = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, workoutPlansCollection, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting workout plan:', error);
    throw error;
  }
};

// Helper functions
export const calculateOneRepMax = (weight: number, reps: number): number => {
  // Brzycki formula: 1RM = weight × (36 / (37 - reps))
  return weight * (36 / (37 - reps));
};

export const getWorkoutProgress = async (userId: string, exerciseId: string): Promise<{date: string, maxWeight: number}[]> => {
  try {
    const q = query(
      collection(db, workoutLogsCollection),
      where('userId', '==', userId),
      orderBy('date', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    const logs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as WorkoutLog);
    
    // Extract max weight for the specified exercise from each workout log
    return logs
      .filter(log => log.exercises.some(ex => ex.exerciseId === exerciseId))
      .map(log => {
        const exercise = log.exercises.find(ex => ex.exerciseId === exerciseId);
        if (!exercise) return { date: log.date, maxWeight: 0 };
        
        // Find the max weight used in any set for this exercise
        const maxWeight = exercise.sets.reduce((max, set) => Math.max(max, set.weight), 0);
        return { date: log.date, maxWeight };
      });
  } catch (error) {
    console.error('Error getting workout progress:', error);
    throw error;
  }
};
