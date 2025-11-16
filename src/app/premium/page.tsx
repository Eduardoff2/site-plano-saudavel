'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Navbar from '@/components/custom/navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, Check, Zap, Star, TrendingUp, 
  Apple, Dumbbell, FileText, Droplets, Moon, Pill,
  Lock, Sparkles
} from 'lucide-react';

export default function PremiumPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const handleSubscribe = () => {
    // Redireciona para o link de pagamento do Mercado Pago
    window.location.href = 'https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=ea7a27063eb44ef88551786f53bacb9e';
  };

  const features = [
    {
      icon: Apple,
      title: 'Plano Alimentar Completo',
      description: 'Cardápio detalhado para 7 dias com todas as refeições e macronutrientes calculados',
      free: false,
      premium: true,
    },
    {
      icon: Dumbbell,
      title: 'Treino Personalizado',
      description: 'Programa de treino completo adaptado ao seu nível e objetivos',
      free: 'Básico',
      premium: 'Completo',
    },
    {
      icon: FileText,
      title: 'Lista de Compras',
      description: 'Lista semanal organizada com todos os ingredientes necessários',
      free: false,
      premium: true,
    },
    {
      icon: Droplets,
      title: 'Recomendações de Hidratação',
      description: 'Plano personalizado de hidratação baseado no seu peso e atividade',
      free: false,
      premium: true,
    },
    {
      icon: Moon,
      title: 'Análise de Sono',
      description: 'Orientações para otimizar seu sono e recuperação muscular',
      free: false,
      premium: true,
    },
    {
      icon: Pill,
      title: 'Suplementação Inteligente',
      description: 'Recomendações de suplementos baseadas nas suas necessidades',
      free: false,
      premium: true,
    },
    {
      icon: TrendingUp,
      title: 'Substituições Inteligentes',
      description: 'Alternativas para cada alimento do seu plano',
      free: false,
      premium: true,
    },
    {
      icon: Sparkles,
      title: 'Atualizações Ilimitadas',
      description: 'Refaça o questionário quantas vezes quiser e gere novos planos',
      free: 'Limitado',
      premium: 'Ilimitado',
    },
  ];

  const benefits = [
    'Plano alimentar detalhado para 7 dias',
    'Treino completo organizado por dias',
    'Cálculo preciso de macronutrientes',
    'Lista de compras semanal',
    'Sugestões de substituições',
    'Recomendações de hidratação',
    'Análise personalizada de sono',
    'Orientações sobre suplementos',
    'Suporte prioritário',
    'Atualizações ilimitadas do plano',
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4 rounded-full animate-pulse">
              <Crown className="w-12 h-12 text-gray-900" />
            </div>
          </div>
          <Badge className="mb-4 bg-yellow-400 text-gray-900 hover:bg-yellow-500">
            <Star className="w-4 h-4 mr-1" />
            Plano Mais Popular
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Upgrade para Premium
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Desbloqueie todo o potencial do seu plano de saúde personalizado
          </p>
        </div>

        {/* Pricing Card */}
        <Card className="max-w-4xl mx-auto p-8 sm:p-12 mb-12 border-4 border-yellow-400 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="w-8 h-8 text-yellow-500" />
              <h2 className="text-3xl font-bold text-gray-900">Plano Premium</h2>
            </div>
            <div className="flex items-baseline justify-center gap-2 mb-6">
              <span className="text-5xl font-bold text-gray-900">R$ 14,90</span>
              <span className="text-xl text-gray-600">/mês</span>
            </div>
            <p className="text-gray-600 mb-8">
              Acesso completo a todas as funcionalidades premium
            </p>
            
            <Button 
              size="lg" 
              onClick={handleSubscribe}
              className="w-full sm:w-auto px-12 py-6 text-lg bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold shadow-lg hover:shadow-xl transition-all"
            >
              <Crown className="w-6 h-6 mr-2" />
              Assinar Premium Agora
            </Button>
            
            <p className="text-sm text-gray-500 mt-4">
              Pagamento seguro via Mercado Pago
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              O que está incluído:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-yellow-100 p-1 rounded-full flex-shrink-0">
                    <Check className="w-5 h-5 text-yellow-600" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Features Comparison */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Compare os Planos
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Free Plan */}
            <Card className="p-6 border-2 border-gray-200">
              <div className="text-center mb-6">
                <Lock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Plano Free</h3>
                <p className="text-gray-600">Acesso básico</p>
              </div>
              <div className="space-y-3">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                      <IconComponent className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">{feature.title}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          {feature.free === false ? (
                            <span className="text-red-600">✗ Não disponível</span>
                          ) : feature.free === true ? (
                            <span className="text-green-600">✓ Incluído</span>
                          ) : (
                            <span className="text-yellow-600">{feature.free}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Premium Plan */}
            <Card className="p-6 border-4 border-yellow-400 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 px-4 py-1 text-sm font-bold">
                RECOMENDADO
              </div>
              <div className="text-center mb-6 mt-4">
                <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Plano Premium</h3>
                <p className="text-gray-600">Acesso completo</p>
              </div>
              <div className="space-y-3">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                      <IconComponent className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">{feature.title}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          {feature.premium === true ? (
                            <span className="text-green-600 font-semibold">✓ Incluído</span>
                          ) : (
                            <span className="text-green-600 font-semibold">{feature.premium}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>

        {/* Testimonials */}
        <Card className="p-8 sm:p-12 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center">
          <Zap className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Transforme Sua Vida Hoje
          </h2>
          <p className="text-lg mb-8 text-emerald-50 max-w-2xl mx-auto">
            Milhares de pessoas já alcançaram seus objetivos com nosso plano premium. 
            Você é o próximo!
          </p>
          <Button 
            size="lg" 
            onClick={handleSubscribe}
            className="px-12 py-6 text-lg bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold shadow-lg"
          >
            <Crown className="w-6 h-6 mr-2" />
            Começar Agora
          </Button>
        </Card>

        {/* FAQ */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-2">Posso cancelar a qualquer momento?</h3>
              <p className="text-gray-600">
                Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas adicionais.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-2">Como funciona o pagamento?</h3>
              <p className="text-gray-600">
                O pagamento é processado de forma segura pelo Mercado Pago. Você será cobrado mensalmente de forma automática.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-2">Posso atualizar meu plano depois?</h3>
              <p className="text-gray-600">
                Sim! Usuários premium podem refazer o questionário quantas vezes quiserem e gerar novos planos personalizados.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
