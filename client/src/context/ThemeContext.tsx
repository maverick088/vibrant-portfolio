import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Theme {
  name: string;
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
  cardColors: string[];
}

const themes: Theme[] = [
  {
    name: 'Warm Beige',
    background: '#ede6d3',
    foreground: '#1a1a1a',
    primary: '#ff6b35',
    secondary: '#e8dcc4',
    accent: '#ff6b35',
    cardColors: ['#b8d4b8', '#adc3e0', '#e8a598', '#c4a7d8', '#f0d674', '#98d4c4']
  },
  {
    name: 'Cool Mint',
    background: '#e8f5f0',
    foreground: '#0a2818',
    primary: '#00a86b',
    secondary: '#d4ebe2',
    accent: '#00a86b',
    cardColors: ['#a8d5ba', '#b3d4f0', '#ffc0a9', '#d4b3f0', '#ffe4a1', '#a1e4d4']
  },
  {
    name: 'Soft Pink',
    background: '#fef0f0',
    foreground: '#2d1810',
    primary: '#e75480',
    secondary: '#fde0e0',
    accent: '#e75480',
    cardColors: ['#ffc4d1', '#c4d1ff', '#ffd4a3', '#e4c4ff', '#fff4c4', '#c4ffe4']
  },
  {
    name: 'Ocean Blue',
    background: '#e0f2fe',
    foreground: '#0c2a3d',
    primary: '#0077be',
    secondary: '#cce7f5',
    accent: '#0077be',
    cardColors: ['#a3d5ff', '#ffa3d5', '#a3ffd5', '#ffd5a3', '#d5a3ff', '#a3a3ff']
  },
  {
    name: 'Dark Mode',
    background: '#1a1a1a',
    foreground: '#f0f0f0',
    primary: '#ff6b35',
    secondary: '#2a2a2a',
    accent: '#ff6b35',
    cardColors: ['#4a5a4a', '#4a5a6a', '#6a4a4a', '#5a4a6a', '#6a6a4a', '#4a6a6a']
  }
];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(themes[0]);

  useEffect(() => {
    // Apply theme to CSS variables
    const root = document.documentElement;
    root.style.setProperty('--background', theme.background);
    root.style.setProperty('--foreground', theme.foreground);
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--secondary', theme.secondary);
    root.style.setProperty('--accent', theme.accent);
    
    // Apply card colors
    theme.cardColors.forEach((color, index) => {
      root.style.setProperty(`--card-color-${index + 1}`, color);
    });
    
    // Set background color directly
    document.body.style.backgroundColor = theme.background;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}