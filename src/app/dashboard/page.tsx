'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getHealthPlan } from '@/lib/health-plan-generator';
import { User, HealthPlan } from '@/lib/types';
import Navbar from '@/components/custom/navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, Target, Apple, Dumbbell, Droplets, Moon, Pill, 
  Lock, Crown, FileText, TrendingUp, Calendar, CheckCircle 
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [healthPlan, setHealthPlan] = useState<HealthPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      toast.error('Você precisa estar logado');
      router.push('/login');
      return;
    }

    setUser(currentUser);
    
    if (currentUser.questionnaireCompleted) {
      const plan = getHealthPlan(currentUser.id);
      setHealthPlan(plan);
    }
    
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const isPremium = user.plan === 'premium';

  // Se não completou questionário
  if (!user.questionnaireCompleted || !healthPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Card className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-emerald-100 p-4 rounded-full">
                <Target className="w-12 h-12 text-emerald-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Bem-vindo, {user.name}!
            </h1>
            <p className="text-gray-600 mb-8">
              Você ainda não criou seu plano personalizado. Responda nosso questionário completo 
              para receber um plano de alimentação e treino feito especialmente para você!
            </p>
            <Link href="/questionario">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white">
                <FileText className="w-5 h-5 mr-2" />
                Responder Questionário
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  // Dashboard com plano gerado
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Olá, {user.name}!
              </h1>
              <p className="text-gray-600 mt-1">Seu plano personalizado está pronto</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={isPremium ? "default" : "secondary"} className={isPremium ? "bg-yellow-500 text-white" : ""}>
                {isPremium ? (
                  <><Crown className="w-4 h-4 mr-1" /> Premium</>
                ) : (
                  <>Plano Free</>
                )}
              </Badge>
              {!isPremium && (
                <Link href="/premium">
                  <Button size="sm" className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900">
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade Premium
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 border-2 border-emerald-100">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-emerald-600" />
            </div>
            <p className="text-sm text-gray-600">Calorias Diárias</p>
            <p className="text-2xl font-bold text-gray-900">{healthPlan.dailyCalories} kcal</p>
          </Card>

          <Card className="p-6 border-2 border-teal-100">
            <div className="flex items-center justify-between mb-2">
              <Apple className="w-8 h-8 text-teal-600" />
            </div>
            <p className="text-sm text-gray-600">Proteína</p>
            <p className="text-2xl font-bold text-gray-900">{healthPlan.protein}g</p>
          </Card>

          <Card className="p-6 border-2 border-emerald-100">
            <div className="flex items-center justify-between mb-2">
              <Dumbbell className="w-8 h-8 text-emerald-600" />
            </div>
            <p className="text-sm text-gray-600">Dias de Treino</p>
            <p className="text-2xl font-bold text-gray-900">{healthPlan.workoutPlan.length}x/semana</p>
          </Card>

          <Card className="p-6 border-2 border-teal-100">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-teal-600" />
            </div>
            <p className="text-sm text-gray-600">TMB</p>
            <p className="text-2xl font-bold text-gray-900">{Math.round(healthPlan.tmb)} kcal</p>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="nutrition" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="nutrition">
              <Apple className="w-4 h-4 mr-2" />
              Alimentação
            </TabsTrigger>
            <TabsTrigger value="workout">
              <Dumbbell className="w-4 h-4 mr-2" />
              Treino
            </TabsTrigger>
            <TabsTrigger value="recommendations">
              <Heart className="w-4 h-4 mr-2" />
              Recomendações
            </TabsTrigger>
            <TabsTrigger value="shopping">
              <FileText className="w-4 h-4 mr-2" />
              Compras
            </TabsTrigger>
          </TabsList>

          {/* Nutrition Tab */}
          <TabsContent value="nutrition" className="space-y-6">
            {isPremium ? (
              <>
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Macronutrientes Diários</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Proteína</p>
                      <p className="text-2xl font-bold text-emerald-600">{healthPlan.protein}g</p>
                    </div>
                    <div className="bg-teal-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Carboidratos</p>
                      <p className="text-2xl font-bold text-teal-600">{healthPlan.carbs}g</p>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Gorduras</p>
                      <p className="text-2xl font-bold text-emerald-600">{healthPlan.fats}g</p>
                    </div>
                  </div>
                </Card>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">Plano Alimentar Semanal</h3>
                  {healthPlan.mealPlan.map((dayPlan, index) => (
                    <Card key={index} className="p-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-emerald-600" />
                        {dayPlan.day}
                      </h4>
                      <div className="space-y-4">
                        {dayPlan.meals.map((meal, mealIndex) => (
                          <div key={mealIndex} className="border-l-4 border-emerald-500 pl-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-semibold text-gray-900">{meal.name}</p>
                                <p className="text-sm text-gray-600">{meal.time}</p>
                              </div>
                              <Badge variant="outline">{meal.calories} kcal</Badge>
                            </div>
                            <ul className="text-sm text-gray-700 space-y-1">
                              {meal.foods.map((food, foodIndex) => (
                                <li key={foodIndex} className="flex items-start gap-2">
                                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                  {food}
                                </li>
                              ))}
                            </ul>
                            <div className="flex gap-4 mt-2 text-xs text-gray-600">
                              <span>P: {meal.protein}g</span>
                              <span>C: {meal.carbs}g</span>
                              <span>G: {meal.fats}g</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <Card className="p-8 text-center">
                <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Plano Completo - Premium</h3>
                <p className="text-gray-600 mb-6">
                  Upgrade para Premium e tenha acesso ao plano alimentar completo de 7 dias com todas as refeições detalhadas
                </p>
                <div className="bg-emerald-50 p-6 rounded-lg mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Prévia do seu plano:</h4>
                  <div className="text-left space-y-2">
                    <p className="text-gray-700">• Calorias diárias: {healthPlan.dailyCalories} kcal</p>
                    <p className="text-gray-700">• Proteína: ~{healthPlan.protein}g por dia</p>
                    <p className="text-gray-700">• Exemplo de refeição: {healthPlan.mealPlan[0]?.meals[0]?.foods[0]}</p>
                  </div>
                </div>
                <Link href="/premium">
                  <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900">
                    <Crown className="w-5 h-5 mr-2" />
                    Assinar Premium
                  </Button>
                </Link>
              </Card>
            )}
          </TabsContent>

          {/* Workout Tab */}
          <TabsContent value="workout" className="space-y-6">
            {isPremium ? (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Plano de Treino Semanal</h3>
                {healthPlan.workoutPlan.map((day, index) => (
                  <Card key={index} className="p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Dumbbell className="w-5 h-5 text-teal-600" />
                      {day.day}
                    </h4>
                    <Badge className="mb-4">{day.type === 'strength' ? 'Força' : day.type === 'cardio' ? 'Cardio' : 'Mobilidade'}</Badge>
                    <div className="space-y-3">
                      {day.exercises.map((exercise, exIndex) => (
                        <div key={exIndex} className="border-l-4 border-teal-500 pl-4">
                          <p className="font-semibold text-gray-900">{exercise.name}</p>
                          <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-600">
                            {exercise.sets && <span>Séries: {exercise.sets}</span>}
                            {exercise.reps && <span>Repetições: {exercise.reps}</span>}
                            {exercise.duration && <span>Duração: {exercise.duration}</span>}
                            {exercise.rest && <span>Descanso: {exercise.rest}</span>}
                          </div>
                          {exercise.notes && (
                            <p className="text-sm text-gray-500 mt-1">{exercise.notes}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Treino Completo - Premium</h3>
                <p className="text-gray-600 mb-6">
                  Upgrade para Premium e tenha acesso ao plano de treino completo com exercícios detalhados
                </p>
                <div className="bg-teal-50 p-6 rounded-lg mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Prévia do seu treino:</h4>
                  <div className="text-left space-y-2">
                    <p className="text-gray-700">• Treino simples de corpo inteiro</p>
                    <p className="text-gray-700">• Exemplo: {healthPlan.workoutPlan[0]?.exercises[0]?.name}</p>
                    <p className="text-gray-700">• {healthPlan.workoutPlan.length} dias de treino por semana</p>
                  </div>
                </div>
                <Link href="/premium">
                  <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900">
                    <Crown className="w-5 h-5 mr-2" />
                    Assinar Premium
                  </Button>
                </Link>
              </Card>
            )}
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            {isPremium ? (
              <>
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-blue-600" />
                    Hidratação
                  </h3>
                  <p className="text-gray-700">{healthPlan.hydration}</p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Moon className="w-5 h-5 text-indigo-600" />
                    Análise de Sono
                  </h3>
                  <p className="text-gray-700">{healthPlan.sleepAnalysis}</p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Pill className="w-5 h-5 text-emerald-600" />
                    Suplementos Recomendados
                  </h3>
                  <ul className="space-y-2">
                    {healthPlan.supplementRecommendations.map((supplement, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {supplement}
                      </li>
                    ))}
                  </ul>
                </Card>
              </>
            ) : (
              <Card className="p-8 text-center">
                <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Recomendações - Premium</h3>
                <p className="text-gray-600 mb-6">
                  Upgrade para Premium e receba recomendações personalizadas de hidratação, sono e suplementos
                </p>
                <Link href="/premium">
                  <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900">
                    <Crown className="w-5 h-5 mr-2" />
                    Assinar Premium
                  </Button>
                </Link>
              </Card>
            )}
          </TabsContent>

          {/* Shopping Tab */}
          <TabsContent value="shopping" className="space-y-6">
            {isPremium ? (
              <>
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Lista de Compras Semanal</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {healthPlan.shoppingList.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Substituições Inteligentes</h3>
                  <div className="space-y-3">
                    {Object.entries(healthPlan.substitutions).map(([food, alternatives], index) => (
                      <div key={index} className="border-l-4 border-emerald-500 pl-4">
                        <p className="font-semibold text-gray-900">{food}</p>
                        <p className="text-sm text-gray-600">Pode substituir por: {alternatives.join(', ')}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            ) : (
              <Card className="p-8 text-center">
                <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Lista de Compras - Premium</h3>
                <p className="text-gray-600 mb-6">
                  Upgrade para Premium e receba lista de compras completa e sugestões de substituições
                </p>
                <Link href="/premium">
                  <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900">
                    <Crown className="w-5 h-5 mr-2" />
                    Assinar Premium
                  </Button>
                </Link>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
