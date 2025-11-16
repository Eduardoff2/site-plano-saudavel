'use client';

import Navbar from '@/components/custom/navbar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Apple, Dumbbell, Heart, Moon, Droplets, Brain, 
  TrendingUp, Award, Star, Quote
} from 'lucide-react';

export default function DicasPage() {
  const professionalTips = [
    {
      category: 'Nutrição',
      icon: Apple,
      color: 'emerald',
      tips: [
        {
          title: 'Priorize Proteínas de Qualidade',
          author: 'Dr. Carlos Mendes - Nutricionista Esportivo',
          content: 'Consuma pelo menos 1.6-2.2g de proteína por kg de peso corporal. Distribua ao longo do dia em 4-6 refeições para otimizar a síntese proteica muscular.',
        },
        {
          title: 'Hidratação Estratégica',
          author: 'Dra. Ana Paula Silva - Nutricionista',
          content: 'Beba 35-40ml de água por kg de peso corporal diariamente. Durante treinos intensos, adicione eletrólitos para repor minerais perdidos no suor.',
        },
        {
          title: 'Timing de Carboidratos',
          author: 'Prof. Ricardo Santos - Nutrição Esportiva',
          content: 'Concentre carboidratos complexos nas refeições pré e pós-treino. Isso maximiza energia durante exercícios e acelera a recuperação muscular.',
        },
      ],
    },
    {
      category: 'Treino',
      icon: Dumbbell,
      color: 'teal',
      tips: [
        {
          title: 'Progressão de Carga Inteligente',
          author: 'Marcos Vieira - Personal Trainer CREF',
          content: 'Aumente a carga em 2-5% quando conseguir completar todas as séries com boa forma. A progressão gradual previne lesões e garante ganhos consistentes.',
        },
        {
          title: 'Descanso é Treino',
          author: 'Fernanda Costa - Fisiculturista Profissional',
          content: 'Músculos crescem durante o descanso, não no treino. Garanta 48-72h de recuperação para cada grupo muscular e durma 7-9h por noite.',
        },
        {
          title: 'Técnica Antes de Peso',
          author: 'João Pedro Lima - Treinador de Força',
          content: 'Domine o movimento com cargas leves antes de aumentar o peso. Uma execução perfeita previne lesões e ativa corretamente os músculos-alvo.',
        },
      ],
    },
    {
      category: 'Saúde Mental',
      icon: Brain,
      color: 'indigo',
      tips: [
        {
          title: 'Consistência > Perfeição',
          author: 'Dra. Juliana Martins - Psicóloga do Esporte',
          content: 'Não existe dieta ou treino perfeito. O melhor plano é aquele que você consegue manter a longo prazo. Foque em pequenas melhorias diárias.',
        },
        {
          title: 'Gerencie o Estresse',
          author: 'Dr. Paulo Henrique - Psiquiatra',
          content: 'Estresse crônico aumenta cortisol, prejudicando ganhos musculares e perda de gordura. Pratique meditação, respiração profunda ou yoga regularmente.',
        },
      ],
    },
    {
      category: 'Recuperação',
      icon: Moon,
      color: 'purple',
      tips: [
        {
          title: 'Qualidade do Sono',
          author: 'Dr. Roberto Alves - Médico do Sono',
          content: 'Durante o sono profundo ocorre 70% da liberação de GH (hormônio do crescimento). Mantenha rotina regular, quarto escuro e temperatura amena.',
        },
        {
          title: 'Alongamento Dinâmico',
          author: 'Carla Souza - Fisioterapeuta Esportiva',
          content: 'Faça alongamentos dinâmicos antes do treino e estáticos depois. Isso melhora amplitude de movimento, previne lesões e acelera recuperação.',
        },
      ],
    },
  ];

  const testimonials = [
    {
      name: 'Marina Silva',
      age: 32,
      result: 'Perdeu 18kg em 6 meses',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      quote: 'O plano personalizado mudou minha vida! Consegui emagrecer de forma saudável e sustentável. Hoje me sinto mais disposta e confiante.',
      achievement: '18kg perdidos',
    },
    {
      name: 'Carlos Eduardo',
      age: 28,
      result: 'Ganhou 12kg de massa muscular',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      quote: 'Sempre tive dificuldade para ganhar peso. Com o plano alimentar e treino personalizados, finalmente consegui resultados reais em 8 meses!',
      achievement: '+12kg de músculo',
    },
    {
      name: 'Juliana Mendes',
      age: 35,
      result: 'Reduziu 15% de gordura corporal',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      quote: 'Depois de 3 filhos, achei que nunca mais teria meu corpo de volta. O programa me provou o contrário! Estou mais forte e saudável que nunca.',
      achievement: '-15% gordura',
    },
    {
      name: 'Roberto Santos',
      age: 45,
      result: 'Controlou diabetes tipo 2',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      quote: 'Além de perder 22kg, meus exames de glicemia normalizaram! Meu médico ficou impressionado com os resultados em apenas 5 meses.',
      achievement: 'Glicemia normalizada',
    },
    {
      name: 'Amanda Costa',
      age: 26,
      result: 'Melhorou performance atlética',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
      quote: 'Como atleta amadora, precisava de um plano profissional. Melhorei meus tempos de corrida em 20% e me sinto muito mais forte!',
      achievement: '+20% performance',
    },
    {
      name: 'Fernando Oliveira',
      age: 38,
      result: 'Eliminou dores nas costas',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
      quote: 'Sofria com dores crônicas há anos. O treino de fortalecimento e alongamento mudou tudo. Hoje vivo sem dor e com muito mais qualidade de vida.',
      achievement: 'Sem dores crônicas',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-full">
              <Heart className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Dicas de Profissionais
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conselhos valiosos de nutricionistas, fisiculturistas e especialistas em saúde para você alcançar seus objetivos
          </p>
        </div>

        {/* Professional Tips */}
        <div className="space-y-12 mb-16">
          {professionalTips.map((section, sectionIndex) => {
            const IconComponent = section.icon;
            const colorClasses = {
              emerald: 'bg-emerald-100 text-emerald-600 border-emerald-500',
              teal: 'bg-teal-100 text-teal-600 border-teal-500',
              indigo: 'bg-indigo-100 text-indigo-600 border-indigo-500',
              purple: 'bg-purple-100 text-purple-600 border-purple-500',
            }[section.color];

            return (
              <div key={sectionIndex}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-lg ${colorClasses}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {section.category}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {section.tips.map((tip, tipIndex) => (
                    <Card key={tipIndex} className={`p-6 border-l-4 ${colorClasses} hover:shadow-lg transition-shadow`}>
                      <div className="flex items-start gap-3 mb-3">
                        <Award className={`w-5 h-5 flex-shrink-0 mt-1 ${section.color === 'emerald' ? 'text-emerald-600' : section.color === 'teal' ? 'text-teal-600' : section.color === 'indigo' ? 'text-indigo-600' : 'text-purple-600'}`} />
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            {tip.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            {tip.author}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {tip.content}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials Section */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4 rounded-full">
                <Star className="w-12 h-12 text-gray-900" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Histórias de Sucesso
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pessoas reais que transformaram suas vidas com nosso plano personalizado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-emerald-100"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.age} anos</p>
                    <Badge className="mt-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                      {testimonial.achievement}
                    </Badge>
                  </div>
                </div>
                
                <div className="relative mb-4">
                  <Quote className="w-8 h-8 text-emerald-200 absolute -top-2 -left-2" />
                  <p className="text-gray-700 italic pl-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-emerald-600 font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  {testimonial.result}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="p-8 sm:p-12 text-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Pronto para Sua Transformação?
          </h2>
          <p className="text-lg mb-8 text-emerald-50 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já transformaram suas vidas com nosso plano personalizado
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register">
              <button className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-emerald-50 transition-colors shadow-lg">
                Começar Agora - Grátis
              </button>
            </a>
            <a href="/premium">
              <button className="px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors shadow-lg">
                Ver Planos Premium
              </button>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
