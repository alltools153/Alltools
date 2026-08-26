'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeId } from '@/types/theme';
import { DEFAULT_THEME, THEMES_LIST } from '@/lib/themeConfig';

interface ThemeContextType {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  availableThemes: typeof THEMES_LIST;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
  availableThemes: THEMES_LIST,
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('alltools_theme') as ThemeId;
      if (savedTheme && THEMES_LIST.some((t) => t.id === savedTheme)) {
        setThemeState(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      } else {
        document.documentElement.setAttribute('data-theme', DEFAULT_THEME);
      }
    } catch {
      document.documentElement.setAttribute('data-theme', DEFAULT_THEME);
    }
    setMounted(true);
  }, []);

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('alltools_theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, availableThemes: THEMES_LIST }}>
      <div className={`min-h-screen bg-background text-foreground transition-colors duration-300 ${!mounted ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
