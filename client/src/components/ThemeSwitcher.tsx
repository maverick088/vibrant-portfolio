import { useState, useEffect, useRef } from 'react';
import { Palette } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, themes } = useTheme();
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        buttonRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard escape and prevent body scrolling
  useEffect(() => {
    if (isOpen) {
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';

      // Handle escape key
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
        }
      };

      document.addEventListener('keydown', handleEscape);

      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-8 left-8 z-50">
      {/* Theme Options */}
      {isOpen && (
        <div ref={popupRef} className="absolute bottom-20 left-0 bg-card text-card-foreground rounded-2xl shadow-2xl p-4 space-y-2 animate-fade-in">
          {themes.map((t) => (
            <button
              key={t.name}
              onClick={() => {
                setTheme(t);
                setIsOpen(false);
              }}
              className={`w-48 px-4 py-3 rounded-xl text-left hover:bg-secondary hover:text-secondary-foreground transition-colors flex items-center gap-3 ${
                theme.name === t.name ? 'bg-secondary text-secondary-foreground' : 'text-card-foreground'
              }`}
              data-testid={`theme-${t.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div 
                className="w-6 h-6 rounded-full border-2 border-border"
                style={{ backgroundColor: t.primary }}
              />
              <span className="font-medium">{t.name}</span>
            </button>
          ))}
        </div>
      )}
      
      {/* Theme Toggle Button */}
      <button
        ref={buttonRef}
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