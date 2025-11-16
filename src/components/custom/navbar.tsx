'use client';

import { useState, useEffect } from 'react';
import { User } from '@/lib/types';
import { getCurrentUser, logoutUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, User as UserIcon, LogOut, Home, FileText, Heart, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    router.push('/');
  };

  return (
    <nav className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <Heart className="w-8 h-8" fill="white" />
            <span className="text-xl sm:text-2xl font-bold">Meu Plano Saudável</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-emerald-100 transition-colors flex items-center gap-2">
              <Home className="w-4 h-4" />
              Início
            </Link>
            <Link href="/dicas" className="hover:text-emerald-100 transition-colors flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Dicas
            </Link>
            
            {user ? (
              <>
                <Link href="/dashboard" className="hover:text-emerald-100 transition-colors flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  Meu Painel
                </Link>
                {user.plan === 'free' && (
                  <Link href="/premium">
                    <Button variant="secondary" size="sm" className="bg-yellow-400 text-gray-900 hover:bg-yellow-500">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Assinar Premium
                    </Button>
                  </Link>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="text-white hover:bg-white/20"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    Entrar
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="secondary" size="sm" className="bg-white text-emerald-600 hover:bg-emerald-50">
                    Cadastrar
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-white/20">
            <Link 
              href="/" 
              className="block py-2 hover:bg-white/10 rounded-lg px-3 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Início
              </div>
            </Link>
            <Link 
              href="/dicas" 
              className="block py-2 hover:bg-white/10 rounded-lg px-3 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Dicas
              </div>
            </Link>
            
            {user ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="block py-2 hover:bg-white/10 rounded-lg px-3 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    Meu Painel
                  </div>
                </Link>
                {user.plan === 'free' && (
                  <Link 
                    href="/premium" 
                    className="block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Assinar Premium
                    </Button>
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 hover:bg-white/10 rounded-lg px-3 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    Sair
                  </div>
                </button>
              </>
            ) : (
              <div className="space-y-2 px-3">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-white text-white hover:bg-white/20">
                    Entrar
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-white text-emerald-600 hover:bg-emerald-50">
                    Cadastrar
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
