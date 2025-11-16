// Sistema de autenticação simulado (localStorage)

import { User } from './types';

const USERS_KEY = 'mps_users';
const CURRENT_USER_KEY = 'mps_current_user';

export function registerUser(name: string, email: string, password: string): { success: boolean; message: string; user?: User } {
  const users = getUsers();
  
  // Verificar se email já existe
  if (users.find(u => u.email === email)) {
    return { success: false, message: 'Email já cadastrado' };
  }
  
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    password, // Em produção, usar hash
    plan: 'free',
    createdAt: new Date().toISOString(),
    questionnaireCompleted: false,
  };
  
  users.push(newUser);
  saveUsers(users);
  
  return { success: true, message: 'Cadastro realizado com sucesso!', user: newUser };
}

export function loginUser(email: string, password: string): { success: boolean; message: string; user?: User } {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return { success: false, message: 'Email ou senha incorretos' };
  }
  
  setCurrentUser(user);
  return { success: true, message: 'Login realizado com sucesso!', user };
}

export function logoutUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem(CURRENT_USER_KEY);
  if (!userStr) return null;
  
  return JSON.parse(userStr);
}

export function setCurrentUser(user: User): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }
}

export function updateCurrentUser(updates: Partial<User>): void {
  const currentUser = getCurrentUser();
  if (!currentUser) return;
  
  const updatedUser = { ...currentUser, ...updates };
  setCurrentUser(updatedUser);
  
  // Atualizar também na lista de usuários
  const users = getUsers();
  const index = users.findIndex(u => u.id === currentUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
    saveUsers(users);
  }
}

export function upgradeToPremium(): void {
  updateCurrentUser({ plan: 'premium' });
}

function getUsers(): User[] {
  if (typeof window === 'undefined') return [];
  
  const usersStr = localStorage.getItem(USERS_KEY);
  if (!usersStr) return [];
  
  return JSON.parse(usersStr);
}

function saveUsers(users: User[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
}
