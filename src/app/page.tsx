'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Target, Dumbbell, Apple, TrendingUp, CheckCircle, ArrowRight, Star, Quote } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/auth';
import Navbar from '@/components/custom/navbar';
import Image from 'next/image';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getCurrentUser());
  }, []);

  const testimonials = [
    {
      name: "Maria Silva",
      age: 32,
      result: "Perdi 12kg em 3 meses",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      text: "O plano personalizado mudou minha vida! Consegui emagrecer de forma saudável e sem passar fome. As refeições são deliciosas e os treinos se encaixam perfeitamente na minha rotina.",
      rating: 5
    },
    {
      name: "João Santos",
      age: 28,
      result: "Ganhei 8kg de massa muscular",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      text: "Sempre tive dificuldade para ganhar peso. Com o plano alimentar e de treino personalizados, finalmente consegui resultados reais. Recomendo demais!",
      rating: 5
    },
    {
      name: "Ana Costa",
      age: 45,
      result: "Melhorei minha saúde geral",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
      text: "Depois dos 40, percebi que precisava cuidar melhor da minha saúde. O plano me ajudou a ter mais energia, dormir melhor e me sentir mais disposta no dia a dia.",
      rating: 5
    },
    {
      name: "Carlos Oliveira",
      age: 35,
      result: "Reduzi 15% de gordura corporal",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      text: "O diferencial é a personalização. O plano se adaptou perfeitamente à minha rotina corrida de trabalho. Consegui resultados que nunca imaginei!",
      rating: 5
    },
    {
      name: "Juliana Ferreira",
      age: 29,
      result: "Conquistei o corpo dos sonhos",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      text: "Tentei várias dietas antes, mas nenhuma funcionou como este plano. É sustentável, prático e os resultados aparecem! Estou muito feliz e confiante.",
      rating: 5
    },
    {
      name: "Roberto Lima",
      age: 52,
      result: "Controlei diabetes e pressão",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      text: "Meu médico ficou impressionado com a melhora nos meus exames. O plano alimentar me ajudou a controlar a diabetes e a pressão arterial. Gratidão!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Navbar />
      
      {/* Hero Section with Model Image */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-6">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-full">
                  <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-white" fill="white" />
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Seu Plano de Saúde
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                  100% Personalizado
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-8">
                Crie planos completos de alimentação e treino baseados nas suas necessidades, 
                objetivos e rotina. Tudo automatizado e personalizado para você!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                {isLoggedIn ? (
                  <>
                    <Link href="/dashboard">
                      <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-lg px-8 py-6 w-full sm:w-auto">
                        <Target className="w-5 h-5 mr-2" />
                        Acessar Meu Painel
                      </Button>
                    </Link>
                    <Link href="/questionario">
                      <Button size="lg" variant="outline" className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-6 w-full sm:w-auto">
                        Criar Novo Plano
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/register">
                      <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-lg px-8 py-6 w-full sm:w-auto">
                        Começar Agora Grátis
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button size="lg" variant="outline" className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-6 w-full sm:w-auto">
                        Já tenho conta
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Model Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/16f7d930-ef6b-43ec-9911-07e4c4bbe241.webp" 
                  alt="Modelo fitness - Transformação de saúde" 
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent"></div>
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border-2 border-emerald-200">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">+5.000</p>
                    <p className="text-sm text-gray-600">Vidas transformadas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Como Funciona?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="p-6 hover:shadow-xl transition-shadow border-2 border-emerald-100">
              <div className="bg-emerald-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Responda o Questionário</h3>
              <p className="text-gray-600">
                Conte sobre seus objetivos, rotina, alimentação e saúde. 
                Quanto mais detalhes, melhor será seu plano!
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow border-2 border-teal-100">
              <div className="bg-teal-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Receba Seu Plano</h3>
              <p className="text-gray-600">
                Nosso sistema gera automaticamente um plano completo de alimentação 
                e treino personalizado para você.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow border-2 border-emerald-100">
              <div className="bg-emerald-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Comece a Transformação</h3>
              <p className="text-gray-600">
                Siga seu plano personalizado e alcance seus objetivos de saúde 
                e bem-estar de forma consistente!
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-12 sm:py-20 px-4 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            O Que Você Recebe
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Planos completos e detalhados para transformar sua saúde
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="p-6 sm:p-8 bg-white border-2 border-emerald-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-lg">
                  <Apple className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Plano Alimentar Completo</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>Cálculo preciso de calorias e macronutrientes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>Refeições detalhadas para 7 dias</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>Lista de compras semanal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>Sugestões de substituições inteligentes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6 sm:p-8 bg-white border-2 border-teal-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-3 rounded-lg">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Plano de Treino Personalizado</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Treinos adaptados ao seu nível</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Divisão por dias da semana</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Exercícios para casa ou academia</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>Séries, repetições e tempo de descanso</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Pronto para Transformar Sua Saúde?
          </h2>
          <p className="text-lg sm:text-xl mb-8 opacity-90">
            Comece agora gratuitamente e receba seu plano personalizado em minutos!
          </p>
          <Link href={isLoggedIn ? "/questionario" : "/register"}>
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-6">
              {isLoggedIn ? "Criar Meu Plano Agora" : "Começar Gratuitamente"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-20 px-4 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Histórias de Sucesso
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Veja como nosso plano personalizado transformou a vida de milhares de pessoas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all border-2 border-emerald-100 relative">
                <div className="absolute top-4 right-4 text-yellow-400">
                  <Quote className="w-8 h-8 opacity-20" />
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover border-2 border-emerald-200"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.age} anos</p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-emerald-600 font-semibold text-sm">
                    {testimonial.result}
                  </p>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  "{testimonial.text}"
                </p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href={isLoggedIn ? "/questionario" : "/register"}>
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-lg px-8 py-6">
                Comece Sua Transformação Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Heart className="w-6 h-6" fill="white" />
            <span className="text-xl font-bold">Meu Plano Saudável</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 Meu Plano Saudável. Todos os direitos reservados.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Este site não substitui orientação médica profissional. Consulte sempre um especialista.
          </p>
        </div>
      </footer>
    </div>
  );
}
