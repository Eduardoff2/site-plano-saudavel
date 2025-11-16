'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, updateCurrentUser } from '@/lib/auth';
import { QuestionnaireData } from '@/lib/types';
import { generateHealthPlan, saveHealthPlan } from '@/lib/health-plan-generator';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import Navbar from '@/components/custom/navbar';
import { toast } from 'sonner';
import Link from 'next/link';

// Importar etapas
import Step1Physical from './steps/Step1Physical';
import Step2Routine from './steps/Step2Routine';
import Step3Nutrition from './steps/Step3Nutrition';
import Step4Health from './steps/Step4Health';

export default function QuestionnairePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<QuestionnaireData>>({
    dietaryRestrictions: [],
    supplements: [],
    healthIssues: [],
    medications: [],
    sleepProblems: [],
    trainingTime: [],
  });

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      toast.error('Você precisa estar logado');
      router.push('/login');
    }
  }, [router]);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (data: Partial<QuestionnaireData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      const user = getCurrentUser();
      if (!user) {
        toast.error('Usuário não encontrado');
        return;
      }

      // Gerar plano de saúde
      const healthPlan = generateHealthPlan(formData as QuestionnaireData, user.id);
      
      // Salvar plano
      saveHealthPlan(healthPlan);
      
      // Atualizar usuário
      updateCurrentUser({ questionnaireCompleted: true });
      
      toast.success('Plano gerado com sucesso!');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Erro ao gerar plano. Tente novamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Questionário de Saúde
          </h1>
          <p className="text-gray-600">
            Responda com atenção para recebermos um plano personalizado perfeito para você
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Etapa {currentStep} de {totalSteps}
            </span>
            <span className="text-sm font-medium text-emerald-600">
              {Math.round(progress)}% completo
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Steps */}
        <Card className="p-6 sm:p-8 mb-6">
          {currentStep === 1 && (
            <Step1Physical formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 2 && (
            <Step2Routine formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 3 && (
            <Step3Nutrition formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 4 && (
            <Step4Health formData={formData} updateFormData={updateFormData} />
          )}
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-between">
          <Button
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="outline"
            size="lg"
            className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Anterior
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
            >
              Próxima
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={loading}
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
            >
              {loading ? 'Gerando plano...' : 'Gerar Meu Plano'}
              <CheckCircle className="w-5 h-5 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
