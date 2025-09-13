import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Helper function to convert hex to HSL
function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

interface Theme {
  name: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
  input: string;
  ring: string;
  cardColors: string[];
}

const themes: Theme[] = [
  {
    name: 'Warm Beige',
    background: '#ede6d3',
    foreground: '#1a1a1a',
    card: '#ffffff',
    cardForeground: '#1a1a1a',
    popover: '#ffffff',
    popoverForeground: '#1a1a1a',
    primary: '#ff6b35',
    primaryForeground: '#ffffff',
    secondary: '#e8dcc4',
    secondaryForeground: '#1a1a1a',
    muted: '#b8a890',
    mutedForeground: '#5a5a5a',
    accent: '#ff6b35',
    accentForeground: '#ffffff',
    border: '#d9ceb8',
    input: '#d9ceb8',
    ring: '#ff6b35',
    cardColors: ['#b8d4b8', '#adc3e0', '#e8a598', '#c4a7d8', '#f0d674', '#98d4c4']
  },
  {
    name: 'Cool Mint',
    background: '#e8f5f0',
    foreground: '#0a2818',
    card: '#ffffff',
    cardForeground: '#0a2818',
    popover: '#ffffff',
    popoverForeground: '#0a2818',
    primary: '#00a86b',
    primaryForeground: '#ffffff',
    secondary: '#d4ebe2',
    secondaryForeground: '#0a2818',
    muted: '#a8c0a8',
    mutedForeground: '#4a6a4a',
    accent: '#00a86b',
    accentForeground: '#ffffff',
    border: '#c0d8c0',
    input: '#c0d8c0',
    ring: '#00a86b',
    cardColors: ['#a8d5ba', '#b3d4f0', '#ffc0a9', '#d4b3f0', '#ffe4a1', '#a1e4d4']
  },
  {
    name: 'Soft Pink',
    background: '#fef0f0',
    foreground: '#2d1810',
    card: '#ffffff',
    cardForeground: '#2d1810',
    popover: '#ffffff',
    popoverForeground: '#2d1810',
    primary: '#e75480',
    primaryForeground: '#ffffff',
    secondary: '#fde0e0',
    secondaryForeground: '#2d1810',
    muted: '#e0c0c0',
    mutedForeground: '#6a4a4a',
    accent: '#e75480',
    accentForeground: '#ffffff',
    border: '#f0d0d0',
    input: '#f0d0d0',
    ring: '#e75480',
    cardColors: ['#ffc4d1', '#c4d1ff', '#ffd4a3', '#e4c4ff', '#fff4c4', '#c4ffe4']
  },
  {
    name: 'Ocean Blue',
    background: '#e0f2fe',
    foreground: '#0c2a3d',
    card: '#ffffff',
    cardForeground: '#0c2a3d',
    popover: '#ffffff',
    popoverForeground: '#0c2a3d',
    primary: '#0077be',
    primaryForeground: '#ffffff',
    secondary: '#cce7f5',
    secondaryForeground: '#0c2a3d',
    muted: '#a0c8e0',
    mutedForeground: '#4a6a8a',
    accent: '#0077be',
    accentForeground: '#ffffff',
    border: '#b0d8f0',
    input: '#b0d8f0',
    ring: '#0077be',
    cardColors: ['#a3d5ff', '#ffa3d5', '#a3ffd5', '#ffd5a3', '#d5a3ff', '#a3a3ff']
  },
  {
    name: 'Dark Mode',
    background: '#1a1a1a',
    foreground: '#f0f0f0',
    card: '#2a2a2a',
    cardForeground: '#f0f0f0',
    popover: '#2a2a2a',
    popoverForeground: '#f0f0f0',
    primary: '#ff6b35',
    primaryForeground: '#1a1a1a',
    secondary: '#3a3a3a',
    secondaryForeground: '#f0f0f0',
    muted: '#4a4a4a',
    mutedForeground: '#a0a0a0',
    accent: '#ff6b35',
    accentForeground: '#1a1a1a',
    border: '#3a3a3a',
    input: '#3a3a3a',
    ring: '#ff6b35',
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
    // Apply theme to CSS variables in HSL format for alpha support
    const root = document.documentElement;
    root.style.setProperty('--background', hexToHsl(theme.background));
    root.style.setProperty('--foreground', hexToHsl(theme.foreground));
    root.style.setProperty('--card', hexToHsl(theme.card));
    root.style.setProperty('--card-foreground', hexToHsl(theme.cardForeground));
    root.style.setProperty('--popover', hexToHsl(theme.popover));
    root.style.setProperty('--popover-foreground', hexToHsl(theme.popoverForeground));
    root.style.setProperty('--primary', hexToHsl(theme.primary));
    root.style.setProperty('--primary-foreground', hexToHsl(theme.primaryForeground));
    root.style.setProperty('--secondary', hexToHsl(theme.secondary));
    root.style.setProperty('--secondary-foreground', hexToHsl(theme.secondaryForeground));
    root.style.setProperty('--muted', hexToHsl(theme.muted));
    root.style.setProperty('--muted-foreground', hexToHsl(theme.mutedForeground));
    root.style.setProperty('--accent', hexToHsl(theme.accent));
    root.style.setProperty('--accent-foreground', hexToHsl(theme.accentForeground));
    root.style.setProperty('--border', hexToHsl(theme.border));
    root.style.setProperty('--input', hexToHsl(theme.input));
    root.style.setProperty('--ring', hexToHsl(theme.ring));
    
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