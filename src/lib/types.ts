// Tipos do sistema

export type UserPlan = 'free' | 'premium';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  plan: UserPlan;
  createdAt: string;
  questionnaireCompleted: boolean;
}

export interface QuestionnaireData {
  // Dados físicos
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number;
  weight: number;
  bodyFat?: number;
  goal: 'lose_weight' | 'gain_muscle' | 'maintain';
  measurements?: {
    arm?: number;
    chest?: number;
    waist?: number;
    hip?: number;
  };
  
  // Rotina e hábitos
  sleepHours: number;
  sleepTime: string;
  stressLevel: 1 | 2 | 3 | 4 | 5;
  energyLevel: 1 | 2 | 3 | 4 | 5;
  trainingDays: number;
  trainingTime: string[];
  alreadyTrains: boolean;
  trainingDuration?: string;
  activityLevel: 'sedentary' | 'moderate' | 'active';
  workType: 'sitting' | 'standing' | 'physical';
  
  // Alimentação
  mealsPerDay: number;
  dietaryRestrictions: string[];
  dietPreference: 'vegetarian' | 'low_carb' | 'free' | 'other';
  waterIntake: number;
  dietHistory: string;
  supplements: string[];
  
  // Saúde geral
  healthIssues: string[];
  medications: string[];
  sleepProblems: string[];
  medicalHistory: string;
}

export interface HealthPlan {
  userId: string;
  createdAt: string;
  
  // Cálculos nutricionais
  tmb: number;
  dailyCalories: number;
  protein: number;
  carbs: number;
  fats: number;
  
  // Plano alimentar
  mealPlan: MealPlan[];
  shoppingList: string[];
  substitutions: { [key: string]: string[] };
  
  // Plano de treino
  workoutPlan: WorkoutDay[];
  
  // Recomendações
  hydration: string;
  sleepAnalysis: string;
  supplementRecommendations: string[];
}

export interface MealPlan {
  day: string;
  meals: {
    name: string;
    time: string;
    foods: string[];
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  }[];
}

export interface WorkoutDay {
  day: string;
  type: 'strength' | 'cardio' | 'mobility' | 'rest';
  exercises: Exercise[];
}

export interface Exercise {
  name: string;
  sets?: number;
  reps?: string;
  duration?: string;
  rest?: string;
  notes?: string;
}
