// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import {
  signInWithEmail,
  registerWithEmail,
  signOutUser,
  resetPassword,
  updateUserProfile,
  changePassword,
  onAuthStateChange,
  createInitialAdmin,
} from '../services/firebase/auth';
import { User, LoginCredentials, RegisterData, ChangePasswordData } from '../types/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Observar mudanças de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  // Criar admin inicial se não existir
  useEffect(() => {
    const initializeAdmin = async () => {
      try {
        await createInitialAdmin();
      } catch (error) {
        // Ignorar erros - admin já existe
      }
    };

    initializeAdmin();
  }, []);

  // Login
  const signIn = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      const user = await signInWithEmail(credentials);
      setUser(user);
    } catch (error) {
      setError((error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Registro
  const signUp = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);
      const user = await registerWithEmail(data);
      setUser(user);
    } catch (error) {
      setError((error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const signOut = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await signOutUser();
      setUser(null);
    } catch (error) {
      setError((error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Reset de senha
  const resetUserPassword = async (email: string) => {
    try {
      setError(null);
      await resetPassword(email);
    } catch (error) {
      setError((error as Error).message);
      throw error;
    }
  };

  // Atualizar perfil
  const updateProfile = async (data: Partial<User>) => {
    try {
      setError(null);
      await updateUserProfile(data);
      
      // Atualizar estado local
      if (user) {
        setUser({ ...user, ...data });
      }
    } catch (error) {
      setError((error as Error).message);
      throw error;
    }
  };

  // Trocar senha
  const changeUserPassword = async (passwordData: ChangePasswordData) => {
    try {
      setError(null);
      await changePassword(passwordData);
    } catch (error) {
      setError((error as Error).message);
      throw error;
    }
  };

  // Limpar erro
  const clearError = () => {
    setError(null);
  };

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    resetPassword: resetUserPassword,
    updateProfile,
    changePassword: changeUserPassword,
    clearError,
  };
};