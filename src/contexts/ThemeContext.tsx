// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeContextData {
  theme: ThemeMode;
  actualTheme: 'light' | 'dark'; // O tema real sendo usado
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>('light');
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  // Detectar preferência do sistema
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  // Carregar tema salvo do localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('pizzaria-theme') as ThemeMode;
    if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
      setThemeState(savedTheme);
    }
  }, []);

  // Atualizar actualTheme baseado no theme e preferência do sistema
  useEffect(() => {
    let newActualTheme: 'light' | 'dark';
    
    if (theme === 'auto') {
      newActualTheme = getSystemTheme();
    } else {
      newActualTheme = theme as 'light' | 'dark';
    }
    
    setActualTheme(newActualTheme);
    
    // Aplicar tema ao documento
    document.documentElement.setAttribute('data-theme', newActualTheme);
    document.body.className = newActualTheme;
    
    console.log('🎨 Tema atualizado:', { theme, actualTheme: newActualTheme });
  }, [theme]);

  // Escutar mudanças na preferência do sistema (apenas para modo auto)
  useEffect(() => {
    if (theme !== 'auto') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'auto') {
        const systemTheme = getSystemTheme();
        setActualTheme(systemTheme);
        document.documentElement.setAttribute('data-theme', systemTheme);
        document.body.className = systemTheme;
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('pizzaria-theme', newTheme);
    console.log('💾 Tema salvo:', newTheme);
  };

  const toggleTheme = () => {
    const newTheme = actualTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      actualTheme,
      setTheme,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};