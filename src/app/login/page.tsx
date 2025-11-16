'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { loginUser } from '@/lib/auth';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = loginUser(email, password);
    
    if (result.success) {
      toast.success('Login realizado com sucesso!');
      router.push('/dashboard');
    } else {
      toast.error(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8 text-emerald-600 hover:text-emerald-700 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar para início</span>
        </Link>

        <Card className="p-8 shadow-xl border-2 border-emerald-100">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-full">
              <Heart className="w-10 h-10 text-white" fill="white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Bem-vindo de volta!
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Entre para acessar seu plano de saúde
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-emerald-200 focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-emerald-200 focus:border-emerald-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-6 text-lg"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Não tem uma conta?{' '}
              <Link href="/register" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                Cadastre-se grátis
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
