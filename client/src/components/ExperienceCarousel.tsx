import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Experience {
  company: string;
  role: string;
  period: string;
  rating: number;
  highlights: string[];
  index: number;
}

interface ExperienceCarouselProps {
  experiences: Experience[];
}

export default function ExperienceCarousel({ experiences }: ExperienceCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const colors = ['card-coral', 'card-blue', 'card-green', 'card-purple', 'card-yellow', 'card-mint'];
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % experiences.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + experiences.length) % experiences.length);
  };
  
  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="overflow-hidden rounded-3xl">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="w-full flex-shrink-0"
              data-testid={`carousel-slide-${index}`}
            >
              <div className={`${colors[index % colors.length]} p-12 md:p-16 rounded-3xl`}>
                <div className="max-w-3xl mx-auto">
                  {/* Rating Badge */}
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/90 rounded-2xl mb-8">
                    <span className="text-3xl font-black">{exp.rating}</span>
                  </div>
                  
                  {/* Company Info */}
                  <h2 className="text-4xl md:text-5xl font-black mb-4">{exp.company}</h2>
                  <p className="text-xl font-semibold mb-2 opacity-90">{exp.role}</p>
                  <p className="text-lg opacity-70 mb-8">{exp.period}</p>
                  
                  {/* Highlights */}
                  <div className="space-y-4">
                    {exp.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-2xl mt-1">•</span>
                        <p className="text-lg opacity-90">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
        aria-label="Previous experience"
        data-testid="carousel-prev"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
        aria-label="Next experience"
        data-testid="carousel-next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      
      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {experiences.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8 bg-foreground' 
                : 'bg-foreground/30 hover:bg-foreground/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            data-testid={`carousel-dot-${index}`}
          />
        ))}
      </div>
    </div>
  );
}