// Gerador de planos de saúde personalizados

import { QuestionnaireData, HealthPlan, MealPlan, WorkoutDay } from './types';

export function generateHealthPlan(data: QuestionnaireData, userId: string): HealthPlan {
  // Calcular TMB (Taxa Metabólica Basal) usando fórmula de Harris-Benedict
  const tmb = calculateTMB(data);
  
  // Calcular gasto calórico diário baseado no nível de atividade
  const activityMultiplier = getActivityMultiplier(data.activityLevel, data.trainingDays);
  const dailyCalories = adjustCaloriesForGoal(tmb * activityMultiplier, data.goal);
  
  // Calcular macronutrientes
  const macros = calculateMacros(dailyCalories, data.goal, data.weight);
  
  // Gerar plano alimentar
  const mealPlan = generateMealPlan(data, dailyCalories, macros);
  
  // Gerar lista de compras
  const shoppingList = generateShoppingList(mealPlan, data.dietPreference);
  
  // Gerar substituições
  const substitutions = generateSubstitutions(data.dietPreference);
  
  // Gerar plano de treino
  const workoutPlan = generateWorkoutPlan(data);
  
  // Recomendações
  const hydration = calculateHydration(data.weight, data.trainingDays);
  const sleepAnalysis = analyzeSleep(data.sleepHours, data.sleepTime, data.sleepProblems);
  const supplementRecommendations = recommendSupplements(data);
  
  return {
    userId,
    createdAt: new Date().toISOString(),
    tmb,
    dailyCalories,
    protein: macros.protein,
    carbs: macros.carbs,
    fats: macros.fats,
    mealPlan,
    shoppingList,
    substitutions,
    workoutPlan,
    hydration,
    sleepAnalysis,
    supplementRecommendations,
  };
}

function calculateTMB(data: QuestionnaireData): number {
  const { age, gender, height, weight } = data;
  
  if (gender === 'male') {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
}

function getActivityMultiplier(activityLevel: string, trainingDays: number): number {
  if (trainingDays === 0) return 1.2; // Sedentário
  if (trainingDays <= 2) return 1.375; // Levemente ativo
  if (trainingDays <= 4) return 1.55; // Moderadamente ativo
  if (trainingDays <= 6) return 1.725; // Muito ativo
  return 1.9; // Extremamente ativo
}

function adjustCaloriesForGoal(calories: number, goal: string): number {
  if (goal === 'lose_weight') return Math.round(calories - 500);
  if (goal === 'gain_muscle') return Math.round(calories + 300);
  return Math.round(calories);
}

function calculateMacros(calories: number, goal: string, weight: number) {
  let proteinPerKg = 1.6;
  let fatPercentage = 0.25;
  
  if (goal === 'gain_muscle') {
    proteinPerKg = 2.0;
    fatPercentage = 0.25;
  } else if (goal === 'lose_weight') {
    proteinPerKg = 2.2;
    fatPercentage = 0.25;
  }
  
  const protein = Math.round(weight * proteinPerKg);
  const fats = Math.round((calories * fatPercentage) / 9);
  const carbs = Math.round((calories - (protein * 4) - (fats * 9)) / 4);
  
  return { protein, carbs, fats };
}

function generateMealPlan(data: QuestionnaireData, dailyCalories: number, macros: any): MealPlan[] {
  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const mealsPerDay = data.mealsPerDay;
  
  const caloriesPerMeal = Math.round(dailyCalories / mealsPerDay);
  const proteinPerMeal = Math.round(macros.protein / mealsPerDay);
  
  return days.map(day => ({
    day,
    meals: generateDayMeals(mealsPerDay, caloriesPerMeal, proteinPerMeal, data.dietPreference, data.dietaryRestrictions)
  }));
}

function generateDayMeals(mealsCount: number, caloriesPerMeal: number, proteinPerMeal: number, dietPreference: string, restrictions: string[]) {
  const mealTemplates = getMealTemplates(dietPreference, restrictions);
  const meals = [];
  
  const mealTimes = ['07:00', '10:00', '12:30', '15:30', '19:00', '21:30'];
  const mealNames = ['Café da Manhã', 'Lanche da Manhã', 'Almoço', 'Lanche da Tarde', 'Jantar', 'Ceia'];
  
  for (let i = 0; i < mealsCount; i++) {
    meals.push({
      name: mealNames[i] || `Refeição ${i + 1}`,
      time: mealTimes[i] || '12:00',
      foods: mealTemplates[i % mealTemplates.length],
      calories: caloriesPerMeal,
      protein: proteinPerMeal,
      carbs: Math.round(caloriesPerMeal * 0.4 / 4),
      fats: Math.round(caloriesPerMeal * 0.25 / 9),
    });
  }
  
  return meals;
}

function getMealTemplates(dietPreference: string, restrictions: string[]) {
  const isVegetarian = dietPreference === 'vegetarian';
  const isLowCarb = dietPreference === 'low_carb';
  
  if (isVegetarian) {
    return [
      ['Aveia com banana e pasta de amendoim', 'Leite vegetal', 'Chia'],
      ['Iogurte de soja com granola', 'Frutas vermelhas'],
      ['Arroz integral', 'Feijão', 'Salada verde', 'Tofu grelhado'],
      ['Pão integral', 'Pasta de grão-de-bico', 'Cenoura'],
      ['Quinoa', 'Grão-de-bico', 'Legumes assados', 'Abacate'],
      ['Shake de proteína vegetal', 'Banana', 'Aveia'],
    ];
  }
  
  if (isLowCarb) {
    return [
      ['Ovos mexidos', 'Abacate', 'Queijo', 'Café'],
      ['Castanhas mistas', 'Queijo cottage'],
      ['Frango grelhado', 'Salada verde', 'Azeite', 'Brócolis'],
      ['Atum', 'Cream cheese', 'Pepino'],
      ['Salmão', 'Aspargos', 'Salada', 'Azeite'],
      ['Whey protein', 'Pasta de amendoim'],
    ];
  }
  
  return [
    ['Pão integral', 'Ovos', 'Queijo branco', 'Café', 'Fruta'],
    ['Iogurte grego', 'Granola', 'Banana'],
    ['Arroz integral', 'Frango grelhado', 'Feijão', 'Salada', 'Legumes'],
    ['Batata doce', 'Atum', 'Salada de folhas'],
    ['Macarrão integral', 'Carne moída magra', 'Molho de tomate', 'Salada'],
    ['Whey protein', 'Aveia', 'Banana'],
  ];
}

function generateShoppingList(mealPlan: MealPlan[], dietPreference: string): string[] {
  const baseList = [
    'Ovos (2 dúzias)',
    'Frango (1kg)',
    'Arroz integral (1kg)',
    'Feijão (500g)',
    'Batata doce (1kg)',
    'Banana (1 cacho)',
    'Maçã (6 unidades)',
    'Aveia (500g)',
    'Pão integral (1 pacote)',
    'Queijo branco (300g)',
    'Iogurte grego (6 unidades)',
    'Alface (2 unidades)',
    'Tomate (500g)',
    'Cenoura (500g)',
    'Brócolis (2 unidades)',
    'Azeite extra virgem (500ml)',
    'Whey protein (1 pote)',
    'Pasta de amendoim (1 pote)',
  ];
  
  if (dietPreference === 'vegetarian') {
    return [
      'Tofu (500g)',
      'Grão-de-bico (500g)',
      'Lentilha (500g)',
      'Quinoa (500g)',
      'Leite vegetal (2L)',
      'Proteína vegetal em pó (1 pote)',
      'Pasta de grão-de-bico (hummus)',
      'Aveia (1kg)',
      'Banana (1 cacho)',
      'Frutas vermelhas (500g)',
      'Abacate (4 unidades)',
      'Castanhas mistas (300g)',
      'Chia (200g)',
      'Granola (500g)',
      'Arroz integral (1kg)',
      'Legumes variados (2kg)',
      'Folhas verdes (mix)',
      'Azeite extra virgem (500ml)',
    ];
  }
  
  if (dietPreference === 'low_carb') {
    return [
      'Ovos (3 dúzias)',
      'Frango (2kg)',
      'Salmão (500g)',
      'Atum (6 latas)',
      'Carne vermelha magra (1kg)',
      'Queijos variados (500g)',
      'Cream cheese (200g)',
      'Abacate (6 unidades)',
      'Castanhas (500g)',
      'Whey protein (1 pote)',
      'Pasta de amendoim (1 pote)',
      'Brócolis (3 unidades)',
      'Couve-flor (2 unidades)',
      'Aspargos (500g)',
      'Folhas verdes (mix)',
      'Azeite extra virgem (500ml)',
      'Manteiga ghee (200g)',
    ];
  }
  
  return baseList;
}

function generateSubstitutions(dietPreference: string): { [key: string]: string[] } {
  return {
    'Frango': ['Peixe', 'Carne vermelha magra', 'Atum', 'Tofu (vegetariano)'],
    'Arroz integral': ['Quinoa', 'Batata doce', 'Macarrão integral', 'Inhame'],
    'Banana': ['Maçã', 'Pera', 'Mamão', 'Morango'],
    'Whey protein': ['Albumina', 'Proteína vegetal', 'Carne magra'],
    'Pão integral': ['Tapioca', 'Batata doce', 'Aveia', 'Crepioca'],
    'Iogurte': ['Iogurte grego', 'Iogurte vegetal', 'Queijo cottage'],
  };
}

function generateWorkoutPlan(data: QuestionnaireData): WorkoutDay[] {
  const trainingDays = data.trainingDays;
  const isBeginnerOrHome = !data.alreadyTrains || data.trainingTime.includes('casa');
  
  if (trainingDays <= 2) {
    return generateFullBodyPlan(2, isBeginnerOrHome);
  } else if (trainingDays <= 4) {
    return generateUpperLowerPlan(4, isBeginnerOrHome);
  } else {
    return generatePPLPlan(6, isBeginnerOrHome);
  }
}

function generateFullBodyPlan(days: number, isHome: boolean): WorkoutDay[] {
  const plan: WorkoutDay[] = [
    {
      day: 'Segunda',
      type: 'strength',
      exercises: isHome ? [
        { name: 'Flexão de braço', sets: 3, reps: '10-15', rest: '60s' },
        { name: 'Agachamento livre', sets: 3, reps: '15-20', rest: '60s' },
        { name: 'Prancha', sets: 3, reps: '30-60s', rest: '45s' },
        { name: 'Afundo', sets: 3, reps: '12 cada perna', rest: '60s' },
        { name: 'Polichinelo', sets: 3, reps: '30s', rest: '30s' },
      ] : [
        { name: 'Supino reto', sets: 3, reps: '8-12', rest: '90s' },
        { name: 'Agachamento livre', sets: 4, reps: '8-12', rest: '120s' },
        { name: 'Remada curvada', sets: 3, reps: '10-12', rest: '90s' },
        { name: 'Desenvolvimento', sets: 3, reps: '10-12', rest: '90s' },
        { name: 'Rosca direta', sets: 3, reps: '10-15', rest: '60s' },
      ]
    },
    {
      day: 'Quarta',
      type: 'cardio',
      exercises: [
        { name: 'Caminhada/Corrida', duration: '30-40min', notes: 'Intensidade moderada' },
        { name: 'Alongamento', duration: '10min' },
      ]
    },
    {
      day: 'Sexta',
      type: 'strength',
      exercises: isHome ? [
        { name: 'Flexão diamante', sets: 3, reps: '8-12', rest: '60s' },
        { name: 'Agachamento búlgaro', sets: 3, reps: '10 cada perna', rest: '60s' },
        { name: 'Prancha lateral', sets: 3, reps: '30s cada lado', rest: '45s' },
        { name: 'Burpee', sets: 3, reps: '10-15', rest: '90s' },
        { name: 'Mountain climber', sets: 3, reps: '20', rest: '60s' },
      ] : [
        { name: 'Leg press', sets: 4, reps: '10-15', rest: '90s' },
        { name: 'Puxada frontal', sets: 3, reps: '10-12', rest: '90s' },
        { name: 'Supino inclinado', sets: 3, reps: '10-12', rest: '90s' },
        { name: 'Elevação lateral', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'Tríceps testa', sets: 3, reps: '10-15', rest: '60s' },
      ]
    },
  ];
  
  return plan;
}

function generateUpperLowerPlan(days: number, isHome: boolean): WorkoutDay[] {
  return [
    {
      day: 'Segunda - Superior',
      type: 'strength',
      exercises: isHome ? [
        { name: 'Flexão de braço', sets: 4, reps: '12-15', rest: '60s' },
        { name: 'Flexão diamante', sets: 3, reps: '10-12', rest: '60s' },
        { name: 'Prancha', sets: 3, reps: '45-60s', rest: '45s' },
        { name: 'Pike push-up', sets: 3, reps: '10-12', rest: '60s' },
      ] : [
        { name: 'Supino reto', sets: 4, reps: '8-12', rest: '90s' },
        { name: 'Remada curvada', sets: 4, reps: '8-12', rest: '90s' },
        { name: 'Desenvolvimento', sets: 3, reps: '10-12', rest: '90s' },
        { name: 'Rosca direta', sets: 3, reps: '10-15', rest: '60s' },
        { name: 'Tríceps pulley', sets: 3, reps: '12-15', rest: '60s' },
      ]
    },
    {
      day: 'Terça - Inferior',
      type: 'strength',
      exercises: isHome ? [
        { name: 'Agachamento livre', sets: 4, reps: '15-20', rest: '90s' },
        { name: 'Afundo', sets: 3, reps: '12 cada perna', rest: '60s' },
        { name: 'Ponte glúteo', sets: 3, reps: '15-20', rest: '60s' },
        { name: 'Panturrilha em pé', sets: 4, reps: '20', rest: '45s' },
      ] : [
        { name: 'Agachamento livre', sets: 4, reps: '8-12', rest: '120s' },
        { name: 'Leg press', sets: 3, reps: '12-15', rest: '90s' },
        { name: 'Stiff', sets: 3, reps: '10-12', rest: '90s' },
        { name: 'Cadeira extensora', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'Panturrilha sentado', sets: 4, reps: '15-20', rest: '45s' },
      ]
    },
    {
      day: 'Quinta - Superior',
      type: 'strength',
      exercises: isHome ? [
        { name: 'Flexão declinada', sets: 4, reps: '10-15', rest: '60s' },
        { name: 'Prancha com toque', sets: 3, reps: '12 cada lado', rest: '60s' },
        { name: 'Mergulho em cadeira', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'Superman', sets: 3, reps: '15', rest: '45s' },
      ] : [
        { name: 'Supino inclinado', sets: 4, reps: '8-12', rest: '90s' },
        { name: 'Puxada frontal', sets: 4, reps: '10-12', rest: '90s' },
        { name: 'Elevação lateral', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'Rosca martelo', sets: 3, reps: '10-12', rest: '60s' },
        { name: 'Tríceps testa', sets: 3, reps: '12-15', rest: '60s' },
      ]
    },
    {
      day: 'Sexta - Inferior',
      type: 'strength',
      exercises: isHome ? [
        { name: 'Agachamento búlgaro', sets: 4, reps: '12 cada perna', rest: '90s' },
        { name: 'Ponte glúteo unilateral', sets: 3, reps: '12 cada perna', rest: '60s' },
        { name: 'Agachamento sumô', sets: 3, reps: '15-20', rest: '60s' },
        { name: 'Panturrilha unilateral', sets: 3, reps: '15 cada perna', rest: '45s' },
      ] : [
        { name: 'Agachamento frontal', sets: 4, reps: '10-12', rest: '120s' },
        { name: 'Cadeira flexora', sets: 3, reps: '12-15', rest: '90s' },
        { name: 'Afundo com halteres', sets: 3, reps: '12 cada perna', rest: '90s' },
        { name: 'Cadeira abdutora', sets: 3, reps: '15-20', rest: '60s' },
        { name: 'Panturrilha leg press', sets: 4, reps: '20', rest: '45s' },
      ]
    },
  ];
}

function generatePPLPlan(days: number, isHome: boolean): WorkoutDay[] {
  return [
    {
      day: 'Segunda - Push (Empurrar)',
      type: 'strength',
      exercises: isHome ? [
        { name: 'Flexão de braço', sets: 4, reps: '12-15', rest: '60s' },
        { name: 'Flexão diamante', sets: 3, reps: '10-12', rest: '60s' },
        { name: 'Pike push-up', sets: 3, reps: '10-12', rest: '60s' },
        { name: 'Mergulho em cadeira', sets: 3, reps: '12-15', rest: '60s' },
      ] : [
        { name: 'Supino reto', sets: 4, reps: '8-12', rest: '90s' },
        { name: 'Supino inclinado', sets: 3, reps: '10-12', rest: '90s' },
        { name: 'Desenvolvimento', sets: 4, reps: '8-12', rest: '90s' },
        { name: 'Elevação lateral', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'Tríceps pulley', sets: 3, reps: '12-15', rest: '60s' },
      ]
    },
    {
      day: 'Terça - Pull (Puxar)',
      type: 'strength',
      exercises: isHome ? [
        { name: 'Prancha', sets: 4, reps: '45-60s', rest: '60s' },
        { name: 'Superman', sets: 3, reps: '15', rest: '45s' },
        { name: 'Prancha lateral', sets: 3, reps: '30s cada lado', rest: '45s' },
      ] : [
        { name: 'Barra fixa', sets: 4, reps: '6-10', rest: '120s' },
        { name: 'Remada curvada', sets: 4, reps: '8-12', rest: '90s' },
        { name: 'Puxada frontal', sets: 3, reps: '10-12', rest: '90s' },
        { name: 'Rosca direta', sets: 3, reps: '10-15', rest: '60s' },
        { name: 'Rosca martelo', sets: 3, reps: '10-12', rest: '60s' },
      ]
    },
    {
      day: 'Quarta - Legs (Pernas)',
      type: 'strength',
      exercises: isHome ? [
        { name: 'Agachamento livre', sets: 4, reps: '15-20', rest: '90s' },
        { name: 'Afundo', sets: 3, reps: '12 cada perna', rest: '60s' },
        { name: 'Ponte glúteo', sets: 4, reps: '15-20', rest: '60s' },
        { name: 'Panturrilha em pé', sets: 4, reps: '20', rest: '45s' },
      ] : [
        { name: 'Agachamento livre', sets: 4, reps: '6-10', rest: '120s' },
        { name: 'Leg press', sets: 4, reps: '10-15', rest: '90s' },
        { name: 'Stiff', sets: 3, reps: '10-12', rest: '90s' },
        { name: 'Cadeira extensora', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'Panturrilha sentado', sets: 4, reps: '15-20', rest: '45s' },
      ]
    },
    {
      day: 'Quinta - Push',
      type: 'strength',
      exercises: isHome ? [
        { name: 'Flexão declinada', sets: 4, reps: '10-15', rest: '60s' },
        { name: 'Flexão archer', sets: 3, reps: '8 cada lado', rest: '60s' },
        { name: 'Pike push-up', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'Mergulho em cadeira', sets: 3, reps: '15', rest: '60s' },
      ] : [
        { name: 'Supino inclinado', sets: 4, reps: '8-12', rest: '90s' },
        { name: 'Crucifixo', sets: 3, reps: '12-15', rest: '90s' },
        { name: 'Desenvolvimento Arnold', sets: 3, reps: '10-12', rest: '90s' },
        { name: 'Elevação frontal', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'Tríceps testa', sets: 3, reps: '12-15', rest: '60s' },
      ]
    },
    {
      day: 'Sexta - Pull',
      type: 'strength',
      exercises: isHome ? [
        { name: 'Prancha com toque', sets: 4, reps: '12 cada lado', rest: '60s' },
        { name: 'Superman alternado', sets: 3, reps: '20', rest: '45s' },
        { name: 'Prancha alta', sets: 3, reps: '45-60s', rest: '60s' },
      ] : [
        { name: 'Levantamento terra', sets: 4, reps: '6-8', rest: '120s' },
        { name: 'Remada cavalinho', sets: 4, reps: '10-12', rest: '90s' },
        { name: 'Pulldown', sets: 3, reps: '12-15', rest: '90s' },
        { name: 'Rosca concentrada', sets: 3, reps: '10-12', rest: '60s' },
        { name: 'Rosca inversa', sets: 3, reps: '12-15', rest: '60s' },
      ]
    },
    {
      day: 'Sábado - Legs',
      type: 'strength',
      exercises: isHome ? [
        { name: 'Agachamento búlgaro', sets: 4, reps: '12 cada perna', rest: '90s' },
        { name: 'Ponte glúteo unilateral', sets: 3, reps: '12 cada perna', rest: '60s' },
        { name: 'Agachamento sumô', sets: 3, reps: '15-20', rest: '60s' },
        { name: 'Panturrilha unilateral', sets: 4, reps: '15 cada perna', rest: '45s' },
      ] : [
        { name: 'Agachamento frontal', sets: 4, reps: '8-12', rest: '120s' },
        { name: 'Cadeira flexora', sets: 4, reps: '12-15', rest: '90s' },
        { name: 'Afundo com halteres', sets: 3, reps: '12 cada perna', rest: '90s' },
        { name: 'Cadeira abdutora', sets: 3, reps: '15-20', rest: '60s' },
        { name: 'Panturrilha leg press', sets: 4, reps: '20', rest: '45s' },
      ]
    },
  ];
}

function calculateHydration(weight: number, trainingDays: number): string {
  const baseWater = weight * 35; // ml por kg
  const extraForTraining = trainingDays * 500; // ml extra por dia de treino
  const totalMl = baseWater + (extraForTraining / 7);
  const liters = (totalMl / 1000).toFixed(1);
  
  return `Recomendação: ${liters}L de água por dia. Aumente para ${(parseFloat(liters) + 0.5).toFixed(1)}L nos dias de treino.`;
}

function analyzeSleep(hours: number, sleepTime: string, problems: string[]): string {
  let analysis = '';
  
  if (hours < 7) {
    analysis = `Você está dormindo apenas ${hours}h por noite, o que é insuficiente. O ideal são 7-9 horas para recuperação muscular e saúde geral. `;
  } else if (hours >= 7 && hours <= 9) {
    analysis = `Suas ${hours}h de sono estão dentro do ideal! Continue mantendo essa rotina. `;
  } else {
    analysis = `Você está dormindo ${hours}h, o que pode ser excessivo. Tente ajustar para 7-9h. `;
  }
  
  if (problems.length > 0) {
    analysis += `Problemas identificados: ${problems.join(', ')}. Considere consultar um especialista em sono.`;
  }
  
  return analysis;
}

function recommendSupplements(data: QuestionnaireData): string[] {
  const recommendations: string[] = [];
  
  // Recomendações básicas
  recommendations.push('Whey Protein ou Proteína Vegetal (para atingir meta proteica)');
  recommendations.push('Creatina 5g/dia (melhora performance e ganho muscular)');
  recommendations.push('Ômega 3 (saúde cardiovascular e anti-inflamatório)');
  recommendations.push('Vitamina D3 (imunidade e saúde óssea)');
  
  // Baseado no objetivo
  if (data.goal === 'lose_weight') {
    recommendations.push('Cafeína (termogênico natural, auxilia no gasto calórico)');
  }
  
  if (data.goal === 'gain_muscle') {
    recommendations.push('BCAA (recuperação muscular)');
    recommendations.push('Glutamina (recuperação e imunidade)');
  }
  
  // Baseado no sono
  if (data.sleepHours < 7 || data.sleepProblems.length > 0) {
    recommendations.push('Magnésio (melhora qualidade do sono)');
    recommendations.push('Melatonina (regulação do ciclo circadiano)');
  }
  
  // Baseado no estresse
  if (data.stressLevel >= 4) {
    recommendations.push('Ashwagandha (redução de estresse e cortisol)');
  }
  
  return recommendations;
}

// Salvar e recuperar planos
const PLANS_KEY = 'mps_health_plans';

export function saveHealthPlan(plan: HealthPlan): void {
  if (typeof window === 'undefined') return;
  
  const plans = getHealthPlans();
  const existingIndex = plans.findIndex(p => p.userId === plan.userId);
  
  if (existingIndex !== -1) {
    plans[existingIndex] = plan;
  } else {
    plans.push(plan);
  }
  
  localStorage.setItem(PLANS_KEY, JSON.stringify(plans));
}

export function getHealthPlan(userId: string): HealthPlan | null {
  const plans = getHealthPlans();
  return plans.find(p => p.userId === userId) || null;
}

function getHealthPlans(): HealthPlan[] {
  if (typeof window === 'undefined') return [];
  
  const plansStr = localStorage.getItem(PLANS_KEY);
  if (!plansStr) return [];
  
  return JSON.parse(plansStr);
}
