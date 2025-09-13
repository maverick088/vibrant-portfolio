import { useState, useEffect, useRef, useCallback } from 'react';
import { ExternalLink } from 'lucide-react';

interface Experience {
  company: string;
  role: string;
  period: string;
  rating: number;
  highlights: string[];
  index: number;
  imageUrl?: string;
}

interface ExperienceCarouselProps {
  experiences: Experience[];
}

export default function ExperienceCarousel({ experiences }: ExperienceCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  const colors = ['card-coral', 'card-blue', 'card-green', 'card-purple', 'card-yellow', 'card-mint'];
  
  const scrollToIndex = useCallback((index: number) => {
    const item = itemRefs.current[index];
    if (item && scrollContainerRef.current) {
      item.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, []);

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % experiences.length;
    scrollToIndex(nextIndex);
  };
  
  const prevSlide = () => {
    const prevIndex = (currentIndex - 1 + experiences.length) % experiences.length;
    scrollToIndex(prevIndex);
  };

  // Setup intersection observer to detect active slide
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let activeIndex = 0;
        
        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            const index = itemRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              activeIndex = index;
            }
          }
        });
        
        if (maxRatio > 0.5) { // Only update if slide is more than 50% visible
          setCurrentIndex(activeIndex);
        }
      },
      {
        root: scrollContainerRef.current,
        rootMargin: '0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    itemRefs.current.forEach((item) => {
      if (item && observerRef.current) {
        observerRef.current.observe(item);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [experiences.length]);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, nextSlide]);
  
  return (
    <div className="relative max-w-6xl mx-auto">
      {/* CSS Scroll-Snap Carousel with guaranteed centering and 20% peeks */}
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex gap-[4%]">
          {experiences.map((exp, index) => {
            const isActive = index === currentIndex;
            const isAdjacent = Math.abs(index - currentIndex) === 1 || 
                              (currentIndex === 0 && index === experiences.length - 1) ||
                              (currentIndex === experiences.length - 1 && index === 0);
            
            return (
              <div 
                key={index}
                ref={(el) => { itemRefs.current[index] = el; }}
                className={`flex-none w-[52%] snap-center transition-all duration-500 ease-out ${
                  isActive 
                    ? 'scale-100 opacity-100 z-10' 
                    : isAdjacent 
                    ? 'scale-95 opacity-80' 
                    : 'scale-90 opacity-50'
                }`}
                data-testid={`experience-card-${index}`}
              >
                <div className={`${colors[index % colors.length]} rounded-3xl h-[420px] relative overflow-hidden shadow-lg`}>
                  {/* Image URL in top right corner if available */}
                  {exp.imageUrl && (
                    <div className="absolute top-4 right-4 z-20">
                      <a
                        href={exp.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors"
                        data-testid={`image-link-${index}`}
                      >
                        <ExternalLink className="w-4 h-4 text-card-foreground" />
                      </a>
                    </div>
                  )}
                  
                  <div className="p-6 h-full flex flex-col">
                    {/* Rating Badge */}
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-card/90 backdrop-blur-sm rounded-2xl mb-4 self-start">
                      <span className="text-2xl font-black text-card-foreground">{exp.rating}</span>
                    </div>
                    
                    {/* Company Info */}
                    <h3 className={`font-black mb-2 ${isActive ? 'text-2xl' : 'text-xl'}`}>{exp.company}</h3>
                    <p className={`font-semibold mb-1 opacity-90 ${isActive ? 'text-base' : 'text-sm'}`}>{exp.role}</p>
                    <p className={`opacity-70 mb-6 ${isActive ? 'text-sm' : 'text-xs'}`}>{exp.period}</p>
                    
                    {/* Highlights - Show more for active card */}
                    <div className="space-y-3 flex-1">
                      {exp.highlights.slice(0, isActive ? 3 : 2).map((highlight, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className={`mt-0.5 ${isActive ? 'text-lg' : 'text-sm'}`}>•</span>
                          <p className={`opacity-90 leading-relaxed ${
                            isActive ? 'text-sm' : 'text-xs'
                          } ${!isActive && highlight.length > 50 ? 'line-clamp-2' : ''}`}>
                            {highlight}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Company Label */}
                    <div className="mt-6 pt-4 border-t border-border/20">
                      <span className="text-xs font-black uppercase tracking-wider opacity-80">
                        {exp.company}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Touch Bubble Indicators */}
      <div className="flex justify-center gap-3 mt-8">
        {experiences.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`relative transition-all duration-300 ${
              index === currentIndex 
                ? 'w-12 h-12' 
                : 'w-8 h-8 hover:w-10 hover:h-10'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            data-testid={`swipe-indicator-${index}`}
          >
            <div className={`w-full h-full rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-primary shadow-lg scale-110'
                : 'bg-muted hover:bg-primary/50'
            }`} />
            
            {/* Touch ripple effect */}
            <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
              index === currentIndex
                ? 'bg-primary/20 animate-pulse'
                : 'bg-transparent'
            }`} />
          </button>
        ))}
      </div>
      
      {/* Progress indicator */}
      <div className="mt-6 text-center text-sm text-muted-foreground">
        {currentIndex + 1} / {experiences.length}
      </div>
    </div>
  );
}