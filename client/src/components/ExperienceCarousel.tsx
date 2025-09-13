import { useState, useEffect, useRef, useCallback } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

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

  // Touch/swipe gesture handling
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
    if (scrollContainerRef.current) {
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;
    const walkX = (x - startX) * 2;
    const walkY = Math.abs(y - startY);
    
    // Only scroll horizontally if horizontal movement is greater than vertical
    if (Math.abs(walkX) > walkY) {
      e.preventDefault();
      scrollContainerRef.current.scrollLeft = scrollLeft - walkX;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    
    setIsDragging(false);
    const x = e.changedTouches[0].clientX;
    const walk = x - startX;
    
    // Determine if swipe was significant enough to change slides
    if (Math.abs(walk) > 50) {
      if (walk > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    } else {
      // Snap back to current slide
      scrollToIndex(currentIndex);
    }
  };
  
  return (
    <div className="relative max-w-6xl mx-auto">
      {/* CSS Scroll-Snap Carousel with guaranteed centering and 20% peeks */}
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex gap-[4%] pr-[20%]"> {/* Add right padding to show partial next card */}
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
                <div className={`${colors[index % colors.length]} rounded-3xl h-[420px] relative overflow-hidden shadow-lg border-2 border-transparent animate-border-gradient`}>
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
                    <h3 className={`font-black mb-2 ${isActive ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>{exp.company}</h3>
                    <p className={`font-semibold mb-1 opacity-90 ${isActive ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}>{exp.role}</p>
                    <p className={`opacity-70 mb-6 ${isActive ? 'text-sm md:text-base' : 'text-xs md:text-sm'}`}>{exp.period}</p>
                    
                    {/* Highlights - Show more for active card */}
                    <div className="space-y-4 flex-1">
                      {exp.highlights.slice(0, isActive ? 3 : 2).map((highlight, i) => (
                        <div key={i} className="">
                          <p className={`opacity-90 leading-relaxed ${
                            isActive ? 'text-base md:text-lg' : 'text-sm md:text-base'
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
      
      {/* Desktop Navigation Buttons */}
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 right-4 justify-between pointer-events-none z-20">
        <button
          onClick={prevSlide}
          className="w-12 h-12 bg-card/90 backdrop-blur-sm hover:bg-card text-card-foreground rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 pointer-events-auto"
          data-testid="prev-button"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 bg-card/90 backdrop-blur-sm hover:bg-card text-card-foreground rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 pointer-events-auto"
          data-testid="next-button"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      
      {/* Subtle Progress Indicator */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-2">
          {experiences.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-primary' 
                  : 'w-2 bg-muted'
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2 opacity-60">
          Swipe or use arrows • {currentIndex + 1} of {experiences.length}
        </p>
      </div>
    </div>
  );
}