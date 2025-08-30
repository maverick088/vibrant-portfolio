import { useState } from 'react';
import { Palette } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="fixed bottom-8 left-8 z-50">
      {/* Theme Options */}
      {isOpen && (
        <div className="absolute bottom-20 left-0 bg-card rounded-2xl shadow-2xl p-4 space-y-2 animate-fade-in">
          {themes.map((t) => (
            <button
              key={t.name}
              onClick={() => {
                setTheme(t);
                setIsOpen(false);
              }}
              className={`w-48 px-4 py-3 rounded-xl text-left hover:bg-secondary transition-colors flex items-center gap-3 ${
                theme.name === t.name ? 'bg-secondary' : ''
              }`}
              data-testid={`theme-${t.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div 
                className="w-6 h-6 rounded-full border-2 border-foreground/20"
                style={{ backgroundColor: t.primary }}
              />
              <span className="font-medium">{t.name}</span>
            </button>
          ))}
        </div>
      )}
      
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
        aria-label="Change theme"
        data-testid="theme-switcher"
      >
        <Palette className="w-6 h-6" />
      </button>
    </div>
  );
}